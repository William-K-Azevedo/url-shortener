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
const urlService_1 = __importDefault(require("../../src/services/urlService"));
const singleton_1 = require("../../singleton");
const base = process.env.BASE;
describe("findOneUrl", () => {
    it("should return a Url from the database, if found", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUrl = {
            urlId: "abc123",
            origUrl: "http://example.com",
            shortUrl: `${base}/api/abc123`,
            clicks: 0,
            date: new Date(),
        };
        singleton_1.prismaMock.url.create.mockResolvedValue(mockUrl);
        // await expect(
        //   urlService.addUrl(
        //     mockUrl.origUrl,
        //     mockUrl.shortUrl,
        //     mockUrl.urlId,
        //     mockUrl.date
        //   )
        // ).resolves.toEqual(mockUrl);
        const result = yield urlService_1.default.addUrl(mockUrl.origUrl, mockUrl.shortUrl, mockUrl.urlId, mockUrl.date);
        expect(result).toStrictEqual(mockUrl);
    }));
});
