import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
const app = express();
import userRoutes from "./routes/user.routes";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes)

export default app;
