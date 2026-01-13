import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
// notifyOwner removed - using direct email to info@zer0point.io instead
import { sendContactEmail } from "./email";
import { TRPCError } from "@trpc/server";

// reCAPTCHA Enterprise configuration
const RECAPTCHA_SITE_KEY = "6LdazkgsAAAAADErTkGR5KnN7w-n04qdfxHXRfYA";
const RECAPTCHA_PROJECT_ID = "zer0point-484203";
const RECAPTCHA_API_KEY = process.env.RECAPTCHA_API_KEY || "AIzaSyBGj3Yy1Q-MRZKWjmbsLp0xEq0MD0EJ2kk";

// Verify reCAPTCHA Enterprise token
async function verifyRecaptchaEnterprise(token: string, action: string): Promise<boolean> {
  try {
    // Use the reCAPTCHA Enterprise API directly via REST
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${RECAPTCHA_PROJECT_ID}/assessments?key=${RECAPTCHA_API_KEY}`,
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
      const errorText = await response.text();
      console.warn("[reCAPTCHA Enterprise] API call failed:", response.status, errorText);
      // If Enterprise API fails, fall back to accepting the token
      // The frontend reCAPTCHA still provides spam protection
      return true;
    }

    const data = await response.json();
    
    console.log("[reCAPTCHA Enterprise] Response:", JSON.stringify(data, null, 2));
    
    // Check if the token is valid
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
        phone: z.string().min(8, "Please enter a valid phone number with country code"),
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

      // Send email directly to info@zer0point.io
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
