"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h1 className="text-4xl font-black tracking-tight mb-2">Something went wrong</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        We encountered an unexpected error while processing your request. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button 
            onClick={() => reset()}
            size="lg"
            className="rounded-full font-bold h-14 px-8 gap-2"
        >
            <RefreshCcw className="w-5 h-5" /> Try Again
        </Button>
        <Button 
            variant="outline" 
            size="lg"
            className="rounded-full font-bold h-14 px-8 bg-white/5"
            onClick={() => window.location.href = "/"}
        >
            Return Home
        </Button>
      </div>
    </div>
  );
}
