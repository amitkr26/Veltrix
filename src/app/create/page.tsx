"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoCreateSchema } from "@/lib/validations";
import { motion } from "framer-motion";
import { Zap, Send, Sparkles, Wand2, ShieldAlert, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { FileUpload } from "@/features/upload/components/file-upload";
import { Input as CustomInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CreatePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(videoCreateSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setUploadError(null);
    setIsUploading(true);
    
    try {
      // Production Implementation: VideoService.createVideo(data)
      console.log("[Platform] Finalized payload:", data);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate resilient upload
    } catch (error: any) {
      setUploadError(error.message || "Failed to establish production link. Media rejected.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative pt-24 pb-32 md:pb-12 px-6">
      <Navbar />

      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <header className="flex flex-col gap-2">
             <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                    <Zap className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-4xl font-black tracking-tight">Upload Studio</h1>
             </div>
             <p className="text-muted-foreground text-lg">
                Secure content ingestion for the Veltrix ecosystem.
             </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="glass border-white/10 shadow-2xl overflow-hidden">
                <CardHeader>
                    <CardTitle>Content Metadata</CardTitle>
                    <CardDescription>Fill in required specifications for production deployment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-10 pb-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Video Title</label>
                                <Button type="button" variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest text-primary gap-1.5 h-6 px-3 rounded-full bg-primary/5 hover:bg-primary/10">
                                    <Wand2 className="w-3 h-3" /> AI Assistant
                                </Button>
                            </div>
                            <CustomInput 
                                {...register("title")}
                                placeholder="Cinematic Narrative #01" 
                                className={cn(
                                    "h-14 bg-white/5 border-white/10 rounded-xl font-medium",
                                    errors.title && "border-red-500/30"
                                )}
                                disabled={isUploading}
                            />
                            {errors.title && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.title.message as string}</p>}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Controller 
                                name="videoUrl"
                                control={control}
                                render={({ field }) => (
                                    <FileUpload 
                                        type="video" 
                                        label="Source Media (Video)" 
                                        onFileSelect={(file) => field.onChange("https://simulated-storage.veltrix.com/" + file.name)}
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
                                        label="Poster Frame (Image)" 
                                        onFileSelect={(file) => field.onChange("https://simulated-storage.veltrix.com/" + file.name)}
                                        error={errors.thumbnailUrl?.message as string}
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Generation Prompt</label>
                            <textarea 
                                {...register("prompt")}
                                placeholder="Technical specifications used for media generation..." 
                                className={cn(
                                    "w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-medium focus:border-primary/50 outline-none transition-all resize-none",
                                    errors.prompt && "border-red-500/30"
                                )}
                                disabled={isUploading}
                            />
                            {errors.prompt && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{errors.prompt.message as string}</p>}
                        </div>
                    </div>

                    {uploadError && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                           <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0" />
                           <p className="text-[11px] font-bold text-red-500 leading-tight uppercase tracking-widest">{uploadError}</p>
                        </div>
                    )}

                    <Button 
                        type="submit"
                        className="w-full h-16 rounded-2xl text-xl font-bold gap-3 shadow-xl shadow-primary/20"
                        disabled={isSubmitting || isUploading || !isValid}
                    >
                        {isUploading ? (
                           <div className="flex items-center gap-3">
                               <Loader2 className="w-6 h-6 animate-spin" />
                               <span>Deploying to Veltrix...</span>
                           </div>
                        ) : (
                           <>
                               <span>Initiate Content Transfer</span>
                               <Send className="w-6 h-6" />
                           </>
                        )}
                    </Button>
                </CardContent>
                <footer className="flex justify-between items-center px-8 pb-8 border-t border-border/40 pt-8">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-primary" /> Multi-Region Ingestion</span>
                        <span className="text-green-500/80">Security Cleared</span>
                    </div>
                </footer>
            </Card>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
