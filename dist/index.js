"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const urlRouter_1 = require("./src/routers/urlRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3003;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/api", urlRouter_1.urlRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
