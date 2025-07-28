import dotenv from "dotenv";
import express, { Request, Response } from "express";
const app = express();

dotenv.config();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    response: "Welcome to HOME !!",
  });
});

export default app;
