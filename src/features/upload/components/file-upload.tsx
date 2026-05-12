"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, ACCEPTED_VIDEO_TYPES } from "@/lib/validations";

interface FileUploadProps {
  type: "video" | "image";
  label: string;
  onFileSelect: (file: File) => void;
  error?: string;
}

export function FileUpload({ type, label, onFileSelect, error }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (selectedFile: File) => {
    setLocalError(null);
    
    // Size Validation
    if (selectedFile.size > MAX_FILE_SIZE) {
      setLocalError(`File too large. Max size is 50MB.`);
      return false;
    }

    // MIME Validation
    const acceptedTypes = type === "video" ? ACCEPTED_VIDEO_TYPES : ACCEPTED_IMAGE_TYPES;
    if (!acceptedTypes.includes(selectedFile.type)) {
      setLocalError(`Invalid file type. Please upload ${type === "video" ? "mp4/webm" : "jpeg/png/webp"}.`);
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setLocalError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayError = error || localError;

  return (
    <div className="space-y-2 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      <div 
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
        onDragLeave={() => setIsHovering(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsHovering(false);
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile && validateFile(droppedFile)) {
            setFile(droppedFile);
            onFileSelect(droppedFile);
          }
        }}
        className={cn(
          "relative h-44 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group overflow-hidden",
          file ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-primary/30 bg-white/[0.02]",
          isHovering && "border-primary bg-primary/10",
          displayError && "border-red-500/30 bg-red-500/5"
        )}
      >
        <input 
          ref={inputRef}
          type="file" 
          className="hidden" 
          accept={type === "video" ? "video/*" : "image/*"}
          onChange={handleChange}
        />

        {file ? (
          <div className="space-y-3 animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-black truncate max-w-[200px]">{file.name}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
              </p>
            </div>
            <button 
              onClick={clearFile}
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors"
            >
              Replace Media
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest">Select {type}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Drag and drop or click to browse
              </p>
            </div>
          </div>
        )}

        {/* Status Indicator Bar */}
        {file && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20">
             <div className="h-full bg-primary w-full animate-in slide-in-from-left duration-1000" />
          </div>
        )}
      </div>

      {displayError && (
        <div className="flex items-center gap-2 mt-2 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{displayError}</p>
        </div>
      )}
    </div>
  );
}
