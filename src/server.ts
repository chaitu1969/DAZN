import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import movieRouter from "./routes/movieRouter";

dotenv.config();

const PORT = process.env.PORT;
export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", movieRouter);

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
