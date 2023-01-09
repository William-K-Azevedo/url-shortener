"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const index_1 = __importDefault(require("../../index"));
const urlService_1 = __importDefault(require("../../src/services/urlService"));
const base = process.env.BASE;
describe("addNewShortUrl", () => {
    it("should return the original URL if it already exists in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the findOneUrl function to return a predefined URL
        const mockUrl = {
            urlId: "abc123",
            origUrl: "http://example.com",
            shortUrl: `${base}/api/abc123`,
            clicks: 0,
            date: new Date(),
        };
        jest.spyOn(urlService_1.default, "findOneUrl").mockResolvedValue(mockUrl);
        const response = yield request(index_1.default)
            .post("/api/short")
            .send({ origUrl: "http://example.com" });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(Object.assign(Object.assign({}, mockUrl), { date: mockUrl.date.toISOString() }));
        // Restore the original implementation of the findOneUrl function
        urlService_1.default.findOneUrl.mockRestore();
    }));
    it("should add a new URL and return the short URL if the original URL does not exist in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the findOneUrl function to return undefined
        jest.spyOn(urlService_1.default, "findOneUrl").mockResolvedValue(undefined);
        // Mock the addUrl function to return a predefined URL
        const mockUrl = {
            urlId: "abc123",
            origUrl: "http://new.com",
            shortUrl: `${base}/api/abc123`,
            clicks: 0,
            date: new Date(),
        };
        jest.spyOn(urlService_1.default, "addUrl").mockResolvedValue(mockUrl);
        const response = yield request(index_1.default)
            .post("/api/short")
            .send({ origUrl: "http://new.com" });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(Object.assign(Object.assign({}, mockUrl), { date: mockUrl.date.toISOString() }));
        // Restore the original implementation of the findOneUrl and addUrl functions
        urlService_1.default.findOneUrl.mockRestore();
        urlService_1.default.addUrl.mockRestore();
    }));
    it("should return a 400 status if the original URL is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(index_1.default)
            .post("/api/short")
            .send({ origUrl: "invalid" });
        expect(response.status).toEqual(400);
        expect(response.text).toEqual("Invalid url provided");
    }));
    it("should return a 500 status and log the error if an error is thrown", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Mock the findOneUrl function to throw an error
            jest
                .spyOn(urlService_1.default, "findOneUrl")
                .mockRejectedValue(new Error("Mock error"));
            const spy = jest.spyOn(console, "log");
            const response = yield request(index_1.default)
                .post("/api/short")
                .send({ origUrl: "http://error.com" });
            expect(response.status).toEqual(500);
            expect(response.text).toEqual("Server Error");
            expect(spy).toHaveBeenCalled();
        }
        finally {
            // Restore the original implementation of the findOneUrl function
            urlService_1.default.findOneUrl.mockRestore();
        }
    }));
});
describe("redirectToUrl", () => {
    it("should redirect to the original URL if it already exists in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUrl = {
            urlId: "abc123",
            origUrl: "http://example.com",
            shortUrl: `${base}/api/abc123`,
            clicks: 0,
            date: new Date(),
        };
        jest.spyOn(urlService_1.default, "findOneUrl").mockResolvedValue(mockUrl);
        const response = yield request(index_1.default).get(`/api/${mockUrl.urlId}`);
        expect(response.status).toEqual(302);
        expect(response.header.location).toEqual(mockUrl.origUrl);
        urlService_1.default.findOneUrl.mockRestore();
    }));
    it("should return 400 status if the URL dont exists in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            jest.spyOn(urlService_1.default, "findOneUrl").mockResolvedValue(undefined);
            const response = yield request(index_1.default).get(`/api/abc123`);
            expect(response.status).toEqual(400);
            expect(response.text).toEqual("Url not found");
        }
        finally {
            urlService_1.default.findOneUrl.mockRestore();
        }
    }));
    it("should update the click count for the short URL if the short URL is found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the findOneUrl function to return a predefined URL
        const mockUrl = {
            urlId: "abc123",
            origUrl: "http://example.com",
            shortUrl: `${base}/api/abc123`,
            clicks: 0,
            date: new Date(),
        };
        jest.spyOn(urlService_1.default, "findOneUrl").mockResolvedValue(mockUrl);
        // Mock the updateUrlClicks function to return the updated URL
        const updatedUrl = Object.assign(Object.assign({}, mockUrl), { clicks: 1 });
        jest.spyOn(urlService_1.default, "updateUrlClicks").mockResolvedValue(updatedUrl);
        const response = yield request(index_1.default).get("/api/abc123");
        expect(response.status).toEqual(302);
        expect(urlService_1.default.updateUrlClicks).toHaveBeenCalledWith("abc123");
        // Restore the original implementation of the findOneUrl and updateUrlClicks functions
        urlService_1.default.findOneUrl.mockRestore();
        urlService_1.default.updateUrlClicks.mockRestore();
    }));
    it("should return 500 status if an error is thrown", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            jest
                .spyOn(urlService_1.default, "findOneUrl")
                .mockRejectedValue(new Error("Mock error"));
            const response = yield request(index_1.default).get("/api/abc123");
            expect(response.status).toEqual(500);
            expect(response.text).toEqual("Server error");
        }
        finally {
            urlService_1.default.findOneUrl.mockRestore();
        }
    }));
});
