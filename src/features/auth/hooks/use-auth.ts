"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth-service";
import { useAuthStore } from "@/store/use-auth-store";
import { AuthType } from "@/types/domain";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleAuth = async (type: AuthType, data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      let user;
      if (type === "signup") {
        user = await AuthService.register(data.email, data.password, data.username);
      } else {
        try {
            await AuthService.login(data.email, data.password);
        } catch (err: any) {
            // Handle "session already active" error by attempting to recover
            if (err.code === 401 && err.type === "general_access_forbidden") {
                await AuthService.logout();
                await AuthService.login(data.email, data.password);
            } else {
                throw err;
            }
        }
        user = await AuthService.getCurrentUser();
      }

      if (user) {
        setUser(user);
        // Sync to cookie for middleware visibility
        document.cookie = `auth-storage=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      useAuthStore.getState().logout();
      // Clear cookie
      document.cookie = "auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAuth, logout, isLoading, error };
}
