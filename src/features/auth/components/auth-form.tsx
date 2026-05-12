"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  type: "login" | "signup";
}

type AuthFormData = z.infer<typeof loginSchema> & { username?: string };

export function AuthForm({ type }: AuthFormProps) {
  const { handleAuth, isLoading: isAuthLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const schema = type === "login" ? loginSchema : signupSchema;
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: any) => {
    if (isLocked) return;
    setServerError(null);
    
    try {
      await handleAuth(type, data);
    } catch (error: any) {
      setServerError(error.message || "Authentication failed. Please check your credentials.");
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-12 p-8 md:p-12">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-card border border-border shadow-sm">
              <ShieldCheck className="w-6 h-6 text-primary" />
           </div>
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Protocol Secure</span>
        </div>
        <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-[0.9]">
              {type === "login" ? "Authorize" : "Initialize"}<br/>
              <span className="text-muted-foreground/30">{type === "login" ? "Session" : "Identity"}</span>
            </h1>
            <p className="reading-pane text-sm">
              {type === "login" 
                ? "Reconnect with the Veltrix network and synchronize your creator node." 
                : "Establish your unique identifier within the cinematic ecosystem."}
            </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {type === "signup" && (
            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Creator Handle</Label>
              <Input 
                {...register("username")}
                placeholder="handle_name" 
                className={cn(
                    "h-14 bg-card border-border rounded-2xl px-6 focus-visible:ring-primary/20 transition-all placeholder:opacity-30",
                    errors.username && touchedFields.username && "border-destructive/50"
                )}
                disabled={isSubmitting || isLocked}
              />
              {errors.username && touchedFields.username && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{errors.username.message as string}</p>}
            </div>
          )}
          
          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Electronic Mail</Label>
            <Input 
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="name@veltrix.studio" 
              className={cn(
                "h-14 bg-card border-border rounded-2xl px-6 focus-visible:ring-primary/20 transition-all placeholder:opacity-30",
                errors.email && touchedFields.email && "border-destructive/50"
              )}
              disabled={isSubmitting || isLocked}
            />
            {errors.email && touchedFields.email && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{errors.email.message as string}</p>}
          </div>
          
          <div className="space-y-3">
            <Label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Security Phrase</Label>
            <Input 
              {...register("password")}
              type="password"
              autoComplete={type === "login" ? "current-password" : "new-password"}
              placeholder="••••••••" 
              className={cn(
                "h-14 bg-card border-border rounded-2xl px-6 focus-visible:ring-primary/20 transition-all placeholder:opacity-30",
                errors.password && touchedFields.password && "border-destructive/50"
              )}
              disabled={isSubmitting || isLocked}
            />
            {errors.password && touchedFields.password && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{errors.password.message as string}</p>}
          </div>
        </div>

        {serverError && (
          <div className="p-5 rounded-2xl bg-destructive/5 border border-destructive/10 flex items-start gap-4 animate-in fade-in slide-in-from-top-1">
             <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
             <p className="text-[11px] font-bold text-destructive leading-relaxed uppercase tracking-widest">{serverError}</p>
          </div>
        )}

        <div className="space-y-6 pt-4">
          <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg transition-all tactile-press"
            disabled={isSubmitting || isLocked}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              type === "login" ? "Authorize Entry" : "Initialize Identity"
            )}
          </Button>

          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] text-center">
            {type === "login" ? "New to the network?" : "Existing identity?"}
            <Link 
              href={type === "login" ? "/signup" : "/login"} 
              className="ml-3 text-foreground hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              {type === "login" ? "Establish Now" : "Authorize Now"}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
