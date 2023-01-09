const request = require("supertest");
import { response } from "express";
import app from "../../index";
import UrlService from "../../src/services/urlService";

const base = process.env.BASE;

describe("addNewShortUrl", () => {
  it("should return the original URL if it already exists in the database", async () => {
    // Mock the findOneUrl function to return a predefined URL
    const mockUrl = {
      urlId: "abc123",
      origUrl: "http://example.com",
      shortUrl: `${base}/api/abc123`,
      clicks: 0,
      date: new Date(),
    };
    jest.spyOn(UrlService, "findOneUrl").mockResolvedValue(mockUrl);

    const response = await request(app)
      .post("/api/short")
      .send({ origUrl: "http://example.com" });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...mockUrl,
      date: mockUrl.date.toISOString(),
    });

    // Restore the original implementation of the findOneUrl function
    (UrlService.findOneUrl as jest.Mock).mockRestore();
  });

  it("should add a new URL and return the short URL if the original URL does not exist in the database", async () => {
    // Mock the findOneUrl function to return undefined
    jest.spyOn(UrlService, "findOneUrl").mockResolvedValue(undefined);
    // Mock the addUrl function to return a predefined URL
    const mockUrl = {
      urlId: "abc123",
      origUrl: "http://new.com",
      shortUrl: `${base}/api/abc123`,
      clicks: 0,
      date: new Date(),
    };
    jest.spyOn(UrlService, "addUrl").mockResolvedValue(mockUrl);

    const response = await request(app)
      .post("/api/short")
      .send({ origUrl: "http://new.com" });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...mockUrl,
      date: mockUrl.date.toISOString(),
    });

    // Restore the original implementation of the findOneUrl and addUrl functions
    (UrlService.findOneUrl as jest.Mock).mockRestore();
    (UrlService.addUrl as jest.Mock).mockRestore();
  });

  it("should return a 400 status if the original URL is invalid", async () => {
    const response = await request(app)
      .post("/api/short")
      .send({ origUrl: "invalid" });
    expect(response.status).toEqual(400);
    expect(response.text).toEqual("Invalid url provided");
  });

  it("should return a 500 status and log the error if an error is thrown", async () => {
    try {
      // Mock the findOneUrl function to throw an error
      jest
        .spyOn(UrlService, "findOneUrl")
        .mockRejectedValue(new Error("Mock error"));
      const spy = jest.spyOn(console, "log");

      const response = await request(app)
        .post("/api/short")
        .send({ origUrl: "http://error.com" });
      expect(response.status).toEqual(500);
      expect(response.text).toEqual("Server Error");
      expect(spy).toHaveBeenCalled();
    } finally {
      // Restore the original implementation of the findOneUrl function
      (UrlService.findOneUrl as jest.Mock).mockRestore();
    }
  });
});

describe("redirectToUrl", () => {
  it("should redirect to the original URL if it already exists in the database", async () => {
    const mockUrl = {
      urlId: "abc123",
      origUrl: "http://example.com",
      shortUrl: `${base}/api/abc123`,
      clicks: 0,
      date: new Date(),
    };
    jest.spyOn(UrlService, "findOneUrl").mockResolvedValue(mockUrl);

    const response = await request(app).get(`/api/${mockUrl.urlId}`);
    expect(response.status).toEqual(302);
    expect(response.header.location).toEqual(mockUrl.origUrl);

    (UrlService.findOneUrl as jest.Mock).mockRestore();
  });

  it("should return 400 status if the URL dont exists in the database", async () => {
    try {
      jest.spyOn(UrlService, "findOneUrl").mockResolvedValue(undefined);

      const response = await request(app).get(`/api/abc123`);

      expect(response.status).toEqual(400);
      expect(response.text).toEqual("Url not found");
    } finally {
      (UrlService.findOneUrl as jest.Mock).mockRestore();
    }
  });

  it("should update the click count for the short URL if the short URL is found", async () => {
    // Mock the findOneUrl function to return a predefined URL
    const mockUrl = {
      urlId: "abc123",
      origUrl: "http://example.com",
      shortUrl: `${base}/api/abc123`,
      clicks: 0,
      date: new Date(),
    };
    jest.spyOn(UrlService, "findOneUrl").mockResolvedValue(mockUrl);
    // Mock the updateUrlClicks function to return the updated URL
    const updatedUrl = {
      ...mockUrl,
      clicks: 1,
    };
    jest.spyOn(UrlService, "updateUrlClicks").mockResolvedValue(updatedUrl);

    const response = await request(app).get("/api/abc123");
    expect(response.status).toEqual(302);
    expect(UrlService.updateUrlClicks).toHaveBeenCalledWith("abc123");

    // Restore the original implementation of the findOneUrl and updateUrlClicks functions
    (UrlService.findOneUrl as jest.Mock).mockRestore();
    (UrlService.updateUrlClicks as jest.Mock).mockRestore();
  });

  it("should return 500 status if an error is thrown", async () => {
    try {
      jest
        .spyOn(UrlService, "findOneUrl")
        .mockRejectedValue(new Error("Mock error"));

      const response = await request(app).get("/api/abc123");

      expect(response.status).toEqual(500);
      expect(response.text).toEqual("Server error");
    } finally {
      (UrlService.findOneUrl as jest.Mock).mockRestore();
    }
  });
});
