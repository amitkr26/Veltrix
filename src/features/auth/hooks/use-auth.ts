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
        await AuthService.login(data.email, data.password);
        user = await AuthService.getCurrentUser();
      }

      if (user) {
        // Strict cookie sync for Middleware visibility
        // We use a high-reliability identifier for the session existence
        document.cookie = `veltrix_session=active; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        
        setUser(user);
        
        // Wait for state to settle before routing
        router.refresh();
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      throw err; // Re-throw to allow AuthForm to handle UI state
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      useAuthStore.getState().logout();
      // Clear session cookie
      document.cookie = "veltrix_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      
      router.refresh();
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAuth, logout, isLoading, error };
}
