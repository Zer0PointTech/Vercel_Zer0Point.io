import nodemailer from 'nodemailer';

// Email configuration from environment variables
// Use smtp.gmail.com for App Password authentication
// Use smtp-relay.gmail.com only for IP-allowlisted SMTP relay
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@zer0point.io';
// Hardcode the recipient email to ensure delivery to the correct address
const EMAIL_TO = 'info@zer0point.io';
// BCC Naji to ensure he receives emails (workaround for Gmail sender filtering)
const EMAIL_BCC = 'najimasri@zer0point.io';

// Create transporter only if credentials are configured
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return transporter;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  const transport = getTransporter();
  
  // Debug logging
  console.log('[Email] EMAIL_TO configured as:', EMAIL_TO);
  
  if (!transport) {
    console.warn('[Email] SMTP not configured, skipping email send');
    return false;
  }

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
        .footer { margin-top: 20px; font-size: 12px; color: #64748b; text-align: center; }
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
            <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="footer">
            Submitted at: ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (UAE Time)
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission
===========================

From: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}

Message:
${data.message}

---
Submitted at: ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (UAE Time)
  `.trim();

  try {
    await transport.sendMail({
      from: `"Zer0Point Website" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      bcc: EMAIL_BCC,
      replyTo: data.email,
      subject: `New Contact: ${data.subject} from ${data.name}`,
      text: textContent,
      html: htmlContent,
    });
    
    console.log('[Email] Contact form email sent successfully');
    return true;
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return false;
  }
}
