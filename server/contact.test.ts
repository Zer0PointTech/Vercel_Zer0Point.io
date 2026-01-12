import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock fetch for reCAPTCHA verification
const mockFetch = vi.fn();
global.fetch = mockFetch;

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

  it("rejects submission when reCAPTCHA verification fails", async () => {
    // Mock reCAPTCHA failure
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false }),
    });

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        phone: "+971501234567",
        subject: "Tech",
        message: "Test message",
        recaptchaToken: "invalid-token",
      })
    ).rejects.toThrow("reCAPTCHA verification failed");
  });

  it("accepts submission when reCAPTCHA verification passes", async () => {
    // Mock reCAPTCHA success
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      phone: "+971501234567",
      subject: "Tech",
      message: "Test message",
      recaptchaToken: "valid-token",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Your message has been sent successfully!");
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Test missing name
    await expect(
      caller.contact.submit({
        name: "",
        email: "john@example.com",
        phone: "+971501234567",
        subject: "Tech",
        message: "Test message",
        recaptchaToken: "token",
      })
    ).rejects.toThrow();

    // Test invalid email
    await expect(
      caller.contact.submit({
        name: "John",
        email: "invalid-email",
        phone: "+971501234567",
        subject: "Tech",
        message: "Test message",
        recaptchaToken: "token",
      })
    ).rejects.toThrow();
  });
});
