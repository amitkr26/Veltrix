"use client";

import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth-service";
import { useAuthStore } from "@/store/use-auth-store";
import { Loader2 } from "lucide-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          // Ensure cookie is in sync if user found via SDK (recovery)
          if (!document.cookie.includes("veltrix_session")) {
             document.cookie = `veltrix_session=active; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          }
          setUser(user);
        } else {
          // If SDK says no user, but cookie or store exists, clear them (cleanup)
          document.cookie = "veltrix_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setIsHydrated(true);
      }
    };

    initAuth();
  }, [setUser, logout]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-6">
           <Loader2 className="w-10 h-10 text-primary animate-spin" />
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground animate-pulse">Initializing Veltrix Core...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
