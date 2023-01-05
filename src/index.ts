import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3003;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
