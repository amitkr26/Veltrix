"use client";

import { AuthForm } from "@/features/auth/components/auth-form";
import { Navbar } from "@/components/layout/navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-6">
      <Navbar />
      
      {/* Background Glows (Restrained) */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <AuthForm type="login" />
    </main>
  );
}
