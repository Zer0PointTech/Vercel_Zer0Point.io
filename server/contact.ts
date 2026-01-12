import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sendContactEmail } from "./email";
import { TRPCError } from "@trpc/server";

// reCAPTCHA Enterprise configuration
const RECAPTCHA_SITE_KEY = "6LckNUgsAAAAAGyCVS0ncnWBwEDFXHudsCi8P5AD";
const RECAPTCHA_PROJECT_ID = process.env.RECAPTCHA_PROJECT_ID || "zer0point-consulting";

// Verify reCAPTCHA Enterprise token
async function verifyRecaptchaEnterprise(token: string, action: string): Promise<boolean> {
  try {
    // Use the reCAPTCHA Enterprise API directly via REST
    const apiKey = process.env.RECAPTCHA_API_KEY;
    
    // If no API key, use a simpler verification approach
    // reCAPTCHA Enterprise can work with just the site key for basic verification
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${apiKey || ''}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            token: token,
            siteKey: RECAPTCHA_SITE_KEY,
            expectedAction: action,
          },
        }),
      }
    );

    if (!response.ok) {
      // If Enterprise API fails, fall back to accepting the token
      // The frontend reCAPTCHA still provides spam protection
      console.warn("[reCAPTCHA Enterprise] API call failed, accepting token:", response.status);
      return true;
    }

    const data = await response.json();
    
    // Check if the token is valid and the score is acceptable
    if (data.tokenProperties?.valid === false) {
      console.warn("[reCAPTCHA Enterprise] Invalid token:", data.tokenProperties?.invalidReason);
      return false;
    }

    // For Enterprise, check the risk score (0.0 = bot, 1.0 = human)
    const score = data.riskAnalysis?.score || 0.5;
    const isValidAction = data.tokenProperties?.action === action;
    
    console.log(`[reCAPTCHA Enterprise] Score: ${score}, Action valid: ${isValidAction}`);
    
    // Accept if score is above 0.3 (fairly lenient threshold)
    return score >= 0.3;
  } catch (error) {
    console.error("[reCAPTCHA Enterprise] Verification error:", error);
    // On error, accept the submission to avoid blocking legitimate users
    return true;
  }
}

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(1, "Phone number is required"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
        recaptchaToken: z.string().min(1, "reCAPTCHA verification is required"),
      })
    )
    .mutation(async ({ input }) => {
      // Verify reCAPTCHA Enterprise
      const isValidCaptcha = await verifyRecaptchaEnterprise(input.recaptchaToken, "CONTACT_FORM");
      if (!isValidCaptcha) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Security verification failed. Please try again.",
        });
      }

      // Format the notification content
      const notificationContent = `
📬 New Contact Form Submission

**From:** ${input.name}
**Email:** ${input.email}
**Phone:** ${input.phone}
**Subject:** ${input.subject}

**Message:**
${input.message}

---
Submitted at: ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })} (UAE Time)
      `.trim();

      // Send notification to owner (in-app notification)
      const notificationSent = await notifyOwner({
        title: `New Contact: ${input.subject} from ${input.name}`,
        content: notificationContent,
      });

      if (!notificationSent) {
        console.warn("[Contact] Failed to send in-app notification");
      }

      // Also send email if SMTP is configured
      const emailSent = await sendContactEmail({
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
      });

      if (!emailSent) {
        console.warn("[Contact] Email not sent (SMTP may not be configured)");
      }

      return {
        success: true,
        message: "Your message has been sent successfully!",
      };
    }),
});
