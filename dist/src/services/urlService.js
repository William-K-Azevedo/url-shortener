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
const client_1 = __importDefault(require("../../prisma/client"));
class UrlService {
    findOneUrlByOrigUrl(origUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client_1.default.url.findUnique({
                    where: {
                        origUrl,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findOneUrlByUrlId(urlId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client_1.default.url.findUnique({
                    where: {
                        urlId,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addUrl(origUrl, shortUrl, urlId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client_1.default.url.create({
                    data: {
                        origUrl,
                        shortUrl,
                        urlId,
                        date,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    updateUrlClicks(urlId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client_1.default.url.update({
                    where: {
                        urlId,
                    },
                    data: {
                        clicks: {
                            increment: 1,
                        },
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new UrlService();
