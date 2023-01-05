"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// dotenv.config();
// const app = express();
// const PORT = 3003;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // app.use(urlRouter);
// app.get("/", (req, res) => {
//   res.send(`<h1>Hello!</h1>`);
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const app = (0, express_1.default)();
const port = 3000;
app.get("/", (req, res) => {
    res.send(`<h1>Hello!</h1>`);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
