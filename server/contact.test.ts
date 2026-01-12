import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the email module
vi.mock("./email", () => ({
  sendContactEmail: vi.fn().mockResolvedValue(true),
}));

// Mock fetch for reCAPTCHA verification
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({
    tokenProperties: { valid: true, action: "CONTACT_FORM" },
    riskAnalysis: { score: 0.9 },
  }),
});

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "+971501234567",
      subject: "Business Development",
      message: "I would like to discuss a partnership opportunity.",
      recaptchaToken: "valid-token",
    });

    expect(result).toEqual({
      success: true,
      message: "Your message has been sent successfully!",
    });
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        email: "john@example.com",
        phone: "+971501234567",
        subject: "Business Development",
        message: "Test message",
        recaptchaToken: "valid-token",
      })
    ).rejects.toThrow();
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        phone: "+971501234567",
        subject: "Business Development",
        message: "Test message",
        recaptchaToken: "valid-token",
      })
    ).rejects.toThrow();
  });

  it("requires recaptcha token", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        phone: "+971501234567",
        subject: "Business Development",
        message: "Test message",
        recaptchaToken: "",
      })
    ).rejects.toThrow();
  });
});
