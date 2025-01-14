import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes";
import taskRoutes from "./routes/TaskRoutes";
import { createClient } from "redis";

dotenv.config();

const app = express();
export const redisClient = createClient();

redisClient.on("connect", () => {
  console.log("Connected to Redis for caching");
});

(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Redis connection error:", error);
  }
})();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
