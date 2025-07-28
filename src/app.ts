import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes";

// Enable trust proxy to get correct client IP when behind a proxy
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);

export default app;
