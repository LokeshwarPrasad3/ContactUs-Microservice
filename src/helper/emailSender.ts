import { resend } from "../services/resend";

/**
 * Universal email sender with Resend
 * @param userEmail - The recipient's email address
 * @param subject - Email subject
 * @param htmlContent - Final HTML string (already compiled/template-injected)
 */

export const emailSender = async (
  userEmail: string,
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: unknown }> => {
  try {
    const { error } = await resend.emails.send({
      from: "ZestyNow <onboarding@resend.dev>",
      to: [userEmail],
      subject,
      html: htmlContent, // Use correct field: `html`
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      return { success: false, error };
    }

    console.log("✅ Email sent to:", userEmail);
    return { success: true };
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return { success: false, error: err };
  }
};
