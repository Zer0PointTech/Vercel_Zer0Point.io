import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { TRPCError } from "@trpc/server";

// reCAPTCHA secret key - stored securely on server
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || "6LeENEgsAAAAAOyiR58P5Pl_MmFAWsRbw_EfJXOm";

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("[reCAPTCHA] Verification error:", error);
    return false;
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
      // Verify reCAPTCHA first
      const isValidCaptcha = await verifyRecaptcha(input.recaptchaToken);
      if (!isValidCaptcha) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "reCAPTCHA verification failed. Please try again.",
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

      // Send notification to owner
      const notificationSent = await notifyOwner({
        title: `New Contact: ${input.subject} from ${input.name}`,
        content: notificationContent,
      });

      if (!notificationSent) {
        console.warn("[Contact] Failed to send notification, but form was valid");
      }

      return {
        success: true,
        message: "Your message has been sent successfully!",
      };
    }),
});
