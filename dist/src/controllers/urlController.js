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
const nanoid_1 = require("nanoid");
const urlService_1 = __importDefault(require("../services/urlService"));
const urlValidation_1 = require("../utils/urlValidation");
class UrlShortener {
    addNewShortUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { origUrl } = req.body;
            const base = process.env.BASE;
            const urlId = (0, nanoid_1.nanoid)();
            if ((0, urlValidation_1.isValidURL)(origUrl)) {
                try {
                    let url = yield urlService_1.default.findOneUrlByOrigUrl(origUrl);
                    if (url) {
                        return res.json(url.shortUrl);
                    }
                    else {
                        const shortUrl = `${base}/api/${urlId}`;
                        const date = new Date();
                        url = yield urlService_1.default.addUrl(origUrl, shortUrl, urlId, date);
                        return res.json(url === null || url === void 0 ? void 0 : url.shortUrl);
                    }
                }
                catch (error) {
                    console.log(error);
                    return res.status(500).send("Server Error");
                }
            }
            else {
                return res.status(400).send("Invalid url provided");
            }
        });
    }
    redirectToUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { urlId } = req.params;
                const url = yield urlService_1.default.findOneUrlByUrlId(urlId);
                if (url) {
                    yield urlService_1.default.updateUrlClicks(urlId);
                    return res.redirect(url.origUrl);
                }
                else {
                    console.log(urlId);
                    return res.status(400).send("Url not found");
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).send("Server error");
            }
        });
    }
}
exports.default = new UrlShortener();
