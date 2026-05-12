"use client";

import { AuthForm } from "@/features/auth/components/auth-form";
import { Navbar } from "@/components/layout/navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex overflow-hidden">
      <Navbar />
      
      {/* Cinematic Sidebar */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative flex-col justify-between p-24 overflow-hidden border-r border-white/5">
         <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px]" />
         </div>
         
         <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Signal Sync</span>
            <h2 className="text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              Deep<br/>
              <span className="text-muted-foreground/20">Studio</span>
            </h2>
         </div>

         <div className="relative z-10 space-y-8">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-sm font-medium tracking-tight">
              Reconnect with your cinematic laboratory and continue engineering the future of high-fidelity narratives.
            </p>
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">Operational Hub Live</span>
            </div>
         </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-background">
         {/* Subtle Background Glows for Mobile */}
         <div className="lg:hidden absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
         </div>
         
         <AuthForm type="login" />
      </div>
    </main>
  );
}
