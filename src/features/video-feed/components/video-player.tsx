"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  isPlaying: boolean;
  className?: string;
}

export function VideoPlayer({ src, isPlaying, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Auto-play might be blocked by browser
          console.warn("Autoplay blocked");
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={cn("w-full h-full object-cover", className)}
      loop
      muted
      playsInline
    />
  );
}
