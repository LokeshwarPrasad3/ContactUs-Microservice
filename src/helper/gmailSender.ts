import nodemailer from "nodemailer";
const OWNER_GMAIL = process.env.OWNER_GMAIL as string;

/**
 * Gmail-based email sender
 * @param userEmail - The recipient's email address or array of addresses
 * @param subject - Email subject
 * @param htmlContent - Final HTML string (already compiled/template-injected)
 */

export const gmailSender = async (
  userEmail: string | string[],
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: unknown }> => {
  try {
    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: OWNER_GMAIL,
        pass: process.env.GMAIL_PASSKEY,
      },
    });

    // Email options
    const mailOptions = {
      from: OWNER_GMAIL,
      to: Array.isArray(userEmail) ? userEmail.join(",") : userEmail,
      subject: `${subject} 🚀`,
      bcc: process.env.ADMIN_GMAIL,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("✅ Gmail sent to:", userEmail);
    return { success: true };
  } catch (err) {
    console.error("❌ Gmail sending failed:", err);
    return { success: false, error: err };
  }
};
