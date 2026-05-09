import { describe, it, expect, vi } from "vitest";

const { mockCreate, mockUse } = vi.hoisted(() => ({
  mockCreate: vi.fn(),
  mockUse: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: mockCreate.mockImplementation(() => ({
      interceptors: { response: { use: mockUse } },
      get: vi.fn(),
    })),
  },
}));

// Import to trigger axios.create() side effect
import "@/services/api";

describe("api.js", () => {
  it("creates axios instance with baseURL from env", () => {
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: expect.any(String),
        headers: { Accept: "application/json" },
      })
    );
  });

  it("passes through successful responses", async () => {
    const successHandler = mockUse.mock.calls[0][0];
    const response = { data: "ok" };
    expect(successHandler(response)).toBe(response);
  });

  it("normalizes network error", async () => {
    const errorHandler = mockUse.mock.calls[0][1];
    const err = { request: {}, message: "Network Error" };
    try {
      await errorHandler(err);
    } catch (e) {
      expect(e.message).toBe("Connection failed. Please try again.");
    }
  });

  it("normalizes server error with data.error", async () => {
    const errorHandler = mockUse.mock.calls[0][1];
    const err = { response: { status: 500, data: { error: "Boom" } } };
    try {
      await errorHandler(err);
    } catch (e) {
      expect(e.message).toBe("Boom");
      expect(e.status).toBe(500);
    }
  });
});
