"use client";

import { AuthForm } from "@/features/auth/components/auth-form";
import { Navbar } from "@/components/layout/navbar";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background flex overflow-hidden">
      <Navbar />
      
      {/* Cinematic Sidebar */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative flex-col justify-between p-24 overflow-hidden border-r border-white/5">
         <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[160px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px]" />
         </div>
         
         <div className="relative z-10 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">System 0.1</span>
            <h2 className="text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              Pure<br/>
              <span className="text-muted-foreground/20">Motion</span>
            </h2>
         </div>

         <div className="relative z-10 space-y-8">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-sm font-medium tracking-tight">
              Join the elite circle of technical creators engineering the next generation of visual narratives.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-white/10" />
                  ))}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">8.2k Signal Nodes Active</span>
            </div>
         </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-background">
         {/* Subtle Background Glows for Mobile */}
         <div className="lg:hidden absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
         </div>
         
         <AuthForm type="signup" />
      </div>
    </main>
  );
}
