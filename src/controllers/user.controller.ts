import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import userModel from "../models/user.model";
import fs from "fs";
import handlebars from "handlebars";
import { emailSender } from "../helper/emailSender";
import path from "path";

export const sendMessageToAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, "Name, email, and message are required");
  }

  const createUserMessage = await userModel.create({
    name,
    email,
    message,
  });

  if (!createUserMessage) {
    throw new ApiError(500, "Failed to send message");
  }
  const emailSubject = "Thanks for reaching out – We've received your message!";

  const templatePath = path.resolve(__dirname, "../../public/templates/FormSubmission.hbs");
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(source);
  const htmlContent = template({ name, email, message });

  const { success } = await emailSender(email, emailSubject, htmlContent);
  if (!success) {
    throw new ApiError(500, "Failed to send message");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createUserMessage, "Message sent successfully !"));
});

export const getAllMessagesOfUsers = asyncHandler(async (req: Request, res: Response) => {
  const messages = await userModel.find();
  if (!messages) {
    throw new ApiError(500, "Failed to get messages");
  }
  return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully !"));
});
