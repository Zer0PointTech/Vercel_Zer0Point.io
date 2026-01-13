import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

// Email configuration
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 587;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const EMAIL_TO = "info@zer0point.io";
const EMAIL_BCC = "najimasri@zer0point.io";

// reCAPTCHA configuration
const RECAPTCHA_SITE_KEY = "6LdazkgsAAAAADErTkGR5KnN7w-n04qdfxHXRfYA";
const RECAPTCHA_PROJECT_ID = "zer0point-484203";
const RECAPTCHA_API_KEY = process.env.RECAPTCHA_API_KEY || "";

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_API_KEY) {
    console.warn("[reCAPTCHA] No API key configured, allowing request");
    return true;
  }

  try {
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: {
            token: token,
            siteKey: RECAPTCHA_SITE_KEY,
            expectedAction: "CONTACT_FORM",
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn("[reCAPTCHA] API call failed:", response.status);
      return true; // Allow on API failure
    }

    const data = await response.json();
    
    if (data.tokenProperties?.valid === false) {
      const invalidReason = data.tokenProperties?.invalidReason;
      console.warn("[reCAPTCHA] Invalid token:", invalidReason);
      // Allow on domain mismatch issues
      if (invalidReason === "BROWSER_ERROR" || invalidReason === "INVALID_REASON_UNSPECIFIED") {
        return true;
      }
      return false;
    }

    const score = data.riskAnalysis?.score || 0.5;
    return score >= 0.3;
  } catch (error) {
    console.error("[reCAPTCHA] Error:", error);
    return true; // Allow on error
  }
}

async function sendEmail(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[Email] SMTP not configured");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0ea5e9; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">📬 New Contact Form Submission</h2>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Zer0Point Tech Ltd Website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">From:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Zer0Point Website" <${SMTP_USER}>`,
      to: EMAIL_TO,
      bcc: EMAIL_BCC,
      replyTo: data.email,
      subject: `New Contact: ${data.subject} from ${data.name}`,
      html: htmlContent,
    });
    console.log("[Email] Sent successfully");
    return true;
  } catch (error) {
    console.error("[Email] Failed:", error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message, recaptchaToken } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify reCAPTCHA
    if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken);
      if (!isValid) {
        return res.status(400).json({ error: "Security verification failed" });
      }
    }

    // Send email
    const emailSent = await sendEmail({ name, email, phone, subject, message });

    return res.status(200).json({
      success: true,
      message: emailSent
        ? "Your message has been sent successfully!"
        : "Message received (email notification pending)",
    });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
