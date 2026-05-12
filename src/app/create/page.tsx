"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoCreateSchema } from "@/lib/validations";
import { motion } from "framer-motion";
import { Zap, Send, Wand2, ShieldAlert, Loader2, Hash } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { FileUpload } from "@/features/upload/components/file-upload";
import { Input as CustomInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    <main className="min-h-screen bg-background relative pt-32 pb-48 px-8">
      <Navbar />

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-24"
        >
          <header className="asymmetric-grid items-end gap-16">
            <div className="col-editorial-main space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-[1px] bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Content Protocol</span>
               </div>
               <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                 Media<br/><span className="text-muted-foreground/20">Ingestion</span>
               </h1>
               <p className="text-muted-foreground/60 font-medium text-xl max-w-xl leading-relaxed tracking-tight">
                 Synchronizing your cinematic output with the Veltrix global signal network.
               </p>
            </div>
            <div className="col-editorial-side pb-4">
                <div className="p-6 rounded-[2rem] bg-card border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Storage Node Ready</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tight">Multi-region ingestion active via NYC Cluster.</p>
                </div>
            </div>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="asymmetric-grid gap-20">
            <div className="col-editorial-main space-y-16">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Cinematic Title</Label>
                            <button type="button" className="text-[9px] font-black uppercase tracking-widest text-primary gap-2 flex items-center tactile-press">
                                <Wand2 className="w-3 h-3" /> Optimize Signal
                            </button>
                        </div>
                        <CustomInput 
                            {...register("title")}
                            placeholder="NARRATIVE_IDENTIFIER_01" 
                            className={cn(
                                "h-16 bg-white/[0.03] border-white/5 rounded-2xl px-8 text-lg font-black tracking-tighter uppercase focus-visible:ring-primary/20 transition-all placeholder:opacity-20",
                                errors.title && "border-red-500/30"
                            )}
                            disabled={isUploading}
                        />
                        {errors.title && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.title.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                    <div className="space-y-6">
                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Engineering Log / Prompt</Label>
                        <textarea 
                            {...register("prompt")}
                            placeholder="Enter the technical parameters used for this generation..." 
                            className={cn(
                                "w-full h-48 bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 text-base font-medium focus:border-primary/50 outline-none transition-all resize-none placeholder:opacity-20",
                                errors.prompt && "border-red-500/30"
                            )}
                            disabled={isUploading}
                        />
                        {errors.prompt && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.prompt.message as string}</p>}
                    </div>
                </div>

                {uploadError && (
                    <div className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/10 flex items-start gap-4">
                       <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
                       <p className="text-[11px] font-bold text-red-500 leading-relaxed uppercase tracking-widest">{uploadError}</p>
                    </div>
                )}

                <Button 
                    type="submit"
                    className="w-full h-20 rounded-[2rem] text-xl font-black uppercase tracking-[0.3em] shadow-2xl transition-all tactile-press bg-white text-black hover:bg-white/90"
                    disabled={isSubmitting || isUploading || !isValid}
                >
                    {isUploading ? (
                       <div className="flex items-center gap-4">
                           <Loader2 className="w-6 h-6 animate-spin" />
                           <span>Synchronizing Signal...</span>
                       </div>
                    ) : (
                       <div className="flex items-center gap-4">
                           <span>Broadcast Signal</span>
                           <Send className="w-6 h-6" />
                       </div>
                    )}
                </Button>
            </div>

            <aside className="col-editorial-side space-y-12">
                <div className="p-10 rounded-[2rem] bg-card border border-white/5 space-y-8">
                    <div className="flex items-center gap-3">
                        <Hash className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-black uppercase tracking-tighter">Guidelines</h3>
                    </div>
                    <ul className="space-y-6">
                        {[
                            "High-fidelity source only",
                            "Strict technical metadata",
                            "Authentic creator signature",
                            "Safe for ecosystem signal"
                        ].map(item => (
                            <li key={item} className="flex items-center gap-4 group">
                                <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="opacity-20 text-center space-y-4">
                    <Zap className="w-10 h-10 mx-auto" />
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] block">Studio Engine 0.1</span>
                </div>
            </aside>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
