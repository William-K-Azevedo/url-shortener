import urlService from "../../src/services/urlService";
import { prismaMock } from "../../singleton";

const base = process.env.BASE;

describe("findOneUrl", () => {
  it("should return a Url from the database, if found", async () => {
    const mockUrl = {
      urlId: "abc123",
      origUrl: "http://example.com",
      shortUrl: `${base}/api/abc123`,
      clicks: 0,
      date: new Date(),
    };

    prismaMock.url.create.mockResolvedValue(mockUrl);

    // await expect(
    //   urlService.addUrl(
    //     mockUrl.origUrl,
    //     mockUrl.shortUrl,
    //     mockUrl.urlId,
    //     mockUrl.date
    //   )
    // ).resolves.toEqual(mockUrl);

    const result = await urlService.addUrl(
      mockUrl.origUrl,
      mockUrl.shortUrl,
      mockUrl.urlId,
      mockUrl.date
    );

    expect(result).toStrictEqual(mockUrl);
  });
});
