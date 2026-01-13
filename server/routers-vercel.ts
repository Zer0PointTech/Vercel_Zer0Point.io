import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { sendContactEmail } from "./email";

// Simple tRPC setup for Vercel serverless
const t = initTRPC.create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// reCAPTCHA Enterprise configuration
const RECAPTCHA_SITE_KEY = "6LdazkgsAAAAADErTkGR5KnN7w-n04qdfxHXRfYA";
const RECAPTCHA_PROJECT_ID = "zer0point-484203";
const RECAPTCHA_API_KEY = process.env.RECAPTCHA_API_KEY || "AIzaSyBGj3Yy1Q-MRZKWjmbsLp0xEq0MD0EJ2kk";

// Verify reCAPTCHA Enterprise token
async function verifyRecaptchaEnterprise(token: string, action: string): Promise<boolean> {
  try {
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
      console.warn("[reCAPTCHA Enterprise] API call failed:", response.status);
      return true; // Allow on API failure
    }

    const data = await response.json();
    console.log("[reCAPTCHA Enterprise] Response:", JSON.stringify(data, null, 2));
    
    if (data.tokenProperties?.valid === false) {
      const invalidReason = data.tokenProperties?.invalidReason;
      console.warn("[reCAPTCHA Enterprise] Invalid token:", invalidReason);
      
      // Allow on domain mismatch issues
      if (invalidReason === "BROWSER_ERROR" || invalidReason === "INVALID_REASON_UNSPECIFIED" || invalidReason === "UNKNOWN_INVALID_REASON") {
        return true;
      }
      return false;
    }

    const score = data.riskAnalysis?.score || 0.5;
    return score >= 0.3;
  } catch (error) {
    console.error("[reCAPTCHA Enterprise] Verification error:", error);
    return true; // Allow on error
  }
}

export const appRouter = router({
  system: router({
    health: publicProcedure.query(() => ({ status: "ok" })),
  }),
  contact: router({
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
        // Verify reCAPTCHA
        const isValidCaptcha = await verifyRecaptchaEnterprise(input.recaptchaToken, "CONTACT_FORM");
        if (!isValidCaptcha) {
          throw new Error("Security verification failed. Please try again.");
        }

        // Send email
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
  }),
});

export type AppRouter = typeof appRouter;
