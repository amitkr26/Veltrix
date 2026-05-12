"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoCreateSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input as CustomInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/features/upload/components/file-upload";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { 
  Loader2, 
  Send, 
  ShieldAlert, 
  Zap, 
  Wand2,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreatePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(videoCreateSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setUploadError(null);
    setIsUploading(true);
    
    try {
      console.log("[Platform] Finalized payload:", data);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      setUploadError(error.message || "Failed to establish production link. Media rejected.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      <Navbar />

      <div className="container mx-auto max-w-5xl pt-24 px-6 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-20"
        >
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Ingestion Protocol</span>
                  <div className="w-12 h-[1px] bg-primary/20" />
               </div>
               <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.9] uppercase">
                 Studio<br/><span className="text-muted-foreground/30">Command</span>
               </h1>
               <p className="reading-pane text-base">
                 Synchronizing your technical media and cinematic narratives with the Veltrix global signal network.
               </p>
            </div>
            <div className="w-full md:w-80">
                <div className="p-6 rounded-3xl bg-card border border-border/40 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Network Active</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase leading-tight">Multi-region signal nodes are synchronized and ready.</p>
                </div>
            </div>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="content-grid gap-16">
            <div className="col-main space-y-12">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Cinematic Title</Label>
                            <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-primary gap-2 flex items-center tactile-press">
                                <Wand2 className="w-3.5 h-3.5" /> Optimize
                            </button>
                        </div>
                        <CustomInput 
                            {...register("title")}
                            placeholder="narrative_identifier_01" 
                            className={cn(
                                "h-16 bg-card border-border rounded-2xl px-8 text-lg font-bold tracking-tight uppercase focus-visible:ring-primary/20 transition-all placeholder:opacity-20",
                                errors.title && "border-destructive/30"
                            )}
                            disabled={isUploading}
                        />
                        {errors.title && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{errors.title.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Controller 
                            name="videoUrl"
                            control={control}
                            render={({ field }) => (
                                <FileUpload 
                                    type="video" 
                                    label="Source Signal (MP4)" 
                                    onFileSelect={(file) => field.onChange("https://storage.veltrix.studio/" + file.name)}
                                    error={errors.videoUrl?.message as string}
                                />
                            )}
                        />

                        <Controller 
                            name="thumbnailUrl"
                            control={control}
                            render={({ field }) => (
                                <FileUpload 
                                    type="image" 
                                    label="Poster Frame (JPG)" 
                                    onFileSelect={(file) => field.onChange("https://storage.veltrix.studio/" + file.name)}
                                    error={errors.thumbnailUrl?.message as string}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Engineering Log / Prompt</Label>
                        <textarea 
                            {...register("prompt")}
                            placeholder="Enter technical specifications used for this generation..." 
                            className={cn(
                                "w-full h-40 bg-card border border-border rounded-3xl p-8 text-sm font-medium focus:border-primary/50 outline-none transition-all resize-none placeholder:opacity-20",
                                errors.prompt && "border-destructive/30"
                            )}
                            disabled={isUploading}
                        />
                        {errors.prompt && <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">{errors.prompt.message as string}</p>}
                    </div>
                </div>

                {uploadError && (
                    <div className="p-6 rounded-3xl bg-destructive/5 border border-destructive/10 flex items-start gap-4">
                       <ShieldAlert className="w-5 h-5 text-destructive flex-shrink-0" />
                       <p className="text-[11px] font-bold text-destructive leading-relaxed uppercase tracking-widest">{uploadError}</p>
                    </div>
                )}

                <Button 
                    type="submit"
                    className="w-full h-16 rounded-3xl text-sm font-bold uppercase tracking-[0.2em] shadow-lg transition-all tactile-press"
                    disabled={isSubmitting || isUploading || !isValid}
                >
                    {isUploading ? (
                       <div className="flex items-center gap-4">
                           <Loader2 className="w-5 h-5 animate-spin" />
                           <span>Synchronizing...</span>
                       </div>
                    ) : (
                       <div className="flex items-center gap-4">
                           <span>Broadcast Signal</span>
                           <Send className="w-5 h-5" />
                       </div>
                    )}
                </Button>
            </div>

            <aside className="col-side space-y-12">
                <div className="p-8 rounded-3xl bg-card border border-border/40 space-y-8">
                    <div className="flex items-center gap-3">
                        <Hash className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-extrabold tracking-tight uppercase">Protocol</h3>
                    </div>
                    <ul className="space-y-6">
                        {[
                            "High-fidelity source (1080p+)",
                            "Precise technical metadata",
                            "Authentic creator signature",
                            "Valid ecosystem signal nodes"
                        ].map(item => (
                            <li key={item} className="flex items-start gap-4 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 group-hover:bg-primary transition-colors" />
                                <span className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center space-y-6 opacity-30 py-8 border-t border-border/20">
                    <Zap className="w-8 h-8 mx-auto" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] block">Studio Engine v0.1.2</span>
                </div>
            </aside>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
