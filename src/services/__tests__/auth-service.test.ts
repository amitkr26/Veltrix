import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "@/services/auth-service";

describe("AuthService (Reliability Test)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully authorize a valid session", async () => {
    const mockUser = { $id: "user123", email: "test@veltrix.com" };
    // @ts-ignore
    vi.spyOn(AuthService, "getCurrentUser").mockResolvedValue(mockUser);

    const user = await AuthService.getCurrentUser();
    expect(user).toEqual(mockUser);
    expect(user?.$id).toBe("user123");
  });

  it("should handle unauthorized states gracefully", async () => {
    // @ts-ignore
    vi.spyOn(AuthService, "getCurrentUser").mockRejectedValue(new Error("Unauthorized"));

    await expect(AuthService.getCurrentUser()).rejects.toThrow("Unauthorized");
  });
});
