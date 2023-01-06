"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRouter = void 0;
const express_1 = require("express");
const urlController_1 = __importDefault(require("../controllers/urlController"));
exports.urlRouter = (0, express_1.Router)();
exports.urlRouter.get("/short", urlController_1.default.addNewShortUrl);
exports.urlRouter.get("/:urlId", urlController_1.default.redirectToUrl);
