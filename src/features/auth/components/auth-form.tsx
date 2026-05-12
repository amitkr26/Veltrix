"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
      // Lock form temporarily on repeated failures (Simulation)
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 3000);
    }
  };

  return (
    <Card className="w-full max-w-md glass border-white/10 shadow-2xl overflow-hidden">
      <CardHeader className="space-y-2 pb-8 pt-10">
        <div className="flex items-center gap-2 mb-2">
           <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Secure Access</span>
        </div>
        <CardTitle className="text-4xl font-black tracking-tighter">
          {type === "login" ? "Welcome Back" : "Initialize Identity"}
        </CardTitle>
        <CardDescription className="text-muted-foreground font-medium">
          {type === "login" 
            ? "Reconnect with the Veltrix ecosystem." 
            : "Establish your creator credentials."}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {type === "signup" && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Username</Label>
              <Input 
                {...register("username")}
                placeholder="maker_name" 
                className={cn(
                    "h-12 bg-white/5 border-white/10 rounded-xl",
                    errors.username && touchedFields.username && "border-red-500/50 focus-visible:ring-red-500/20"
                )}
                disabled={isSubmitting || isLocked}
              />
              {errors.username && touchedFields.username && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.username.message as string}</p>}
            </div>
          )}
          
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
            <Input 
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="name@ecosystem.com" 
              className={cn(
                "h-12 bg-white/5 border-white/10 rounded-xl",
                errors.email && touchedFields.email && "border-red-500/50 focus-visible:ring-red-500/20"
              )}
              disabled={isSubmitting || isLocked}
            />
            {errors.email && touchedFields.email && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.email.message as string}</p>}
          </div>
          
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Security Key</Label>
            <Input 
              {...register("password")}
              type="password"
              autoComplete={type === "login" ? "current-password" : "new-password"}
              placeholder="••••••••" 
              className={cn(
                "h-12 bg-white/5 border-white/10 rounded-xl",
                errors.password && touchedFields.password && "border-red-500/50 focus-visible:ring-red-500/20"
              )}
              disabled={isSubmitting || isLocked}
            />
            {errors.password && touchedFields.password && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.password.message as string}</p>}
          </div>

          {serverError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-1">
               <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
               <p className="text-[11px] font-bold text-red-500 leading-tight uppercase tracking-widest">{serverError}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-14 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
            disabled={isSubmitting || isLocked}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              type === "login" ? "Authorize Session" : "Create Identity"
            )}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4 pb-10 pt-4">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          {type === "login" ? "New to the ecosystem?" : "Already have credentials?"}
          <Link 
            href={type === "login" ? "/signup" : "/login"} 
            className="ml-2 text-primary hover:underline"
          >
            {type === "login" ? "Establish Identity" : "Authorize Now"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
