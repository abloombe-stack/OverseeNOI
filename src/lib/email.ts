import { Resend } from "resend";
import nodemailer from "nodemailer";

const resendKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || "no-reply@oversee-noi.com";

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    // Prefer Resend if key present
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({ from, to, subject, html });
      return;
    }
    
    // Fallback to SMTP if configured
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (host && user && pass) {
      const transporter = nodemailer.createTransporter({
        host,
        port: Number(process.env.SMTP_PORT || 587),
        auth: { user, pass }
      });
      await transporter.sendMail({ from, to, subject, html });
      return;
    }
    
    // Final fallback: log to server console so preview still "works"
    console.log("[EMAIL:DEV]", { to, subject, html });
  } catch (error) {
    console.error("Email send failed:", error);
    console.log("[EMAIL:FALLBACK]", { to, subject, html });
  }
}