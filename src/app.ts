import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes";
import { ApiResponse } from "./utils/ApiResponse";

// Enable trust proxy to get correct client IP when behind a proxy
app.set("trust proxy", true);

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN_URL as string, process.env.CORS_ORIGIN_URL + "/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, null, "👋 Welcome to the Contact Us Microservice !"));
});

app.use("/api/user", userRoutes);

export default app;
