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
        setUser(user);
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
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleAuth, logout, isLoading, error };
}
