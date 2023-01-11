import express from "express";
import dotenv from "dotenv";
import { urlRouter } from "./src/routers/urlRouter";
import { Request, Response } from "express";
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", urlRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
