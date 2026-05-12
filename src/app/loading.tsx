import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="bg-primary p-4 rounded-3xl relative animate-bounce">
            <Zap className="w-12 h-12 text-primary-foreground fill-current" />
        </div>
      </div>
      <p className="mt-8 text-muted-foreground font-bold tracking-widest uppercase text-xs animate-pulse">
        Initializing Fluxora
      </p>
    </div>
  );
}
