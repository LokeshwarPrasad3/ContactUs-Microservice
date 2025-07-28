import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import userModel from "../models/user.model";
import fs from "fs";
import handlebars from "handlebars";
import { emailSender } from "../helper/emailSender";
import path from "path";
import { getLocationFromIp } from "../helper/ipGeolocation";
import { gmailSender } from "../helper/gmailSender";

export const sendMessageToAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, "Name, email, and message are required");
  }

  // Get IP address from request with better fallback handling
  const ip =
    req.ip || (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "0.0.0.0";

  console.log("Client IP:", ip); // Add this for debugging

  // Get location data from IP
  const userLocation = await getLocationFromIp(ip);

  const createUserMessage = await userModel.create({
    name,
    email,
    message,
    userLocation,
  });

  if (!createUserMessage) {
    throw new ApiError(500, "Failed to send message");
  }

  const emailSubject = "Confirmation: We've received your message – Budgetter";
  const templatePath = path.resolve(__dirname, "../../public/templates/FormSubmission.hbs");
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(source);
  const htmlContent = template({ name, email, message });

  // Send by resend tool service
  // const { success } = await emailSender(email, emailSubject, htmlContent);

  // Send by google gmail service
  const { success } = await gmailSender(email, emailSubject, htmlContent);

  if (!success) {
    throw new ApiError(500, "Failed to send message");
  }

  return res.status(200).json(new ApiResponse(200, null, "Message sent successfully !"));
});

export const getAllMessagesOfUsers = asyncHandler(async (req: Request, res: Response) => {
  const messages = await userModel.find();
  if (!messages) {
    throw new ApiError(500, "Failed to get messages");
  }
  return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully !"));
});
