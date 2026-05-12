"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, User, BadgeCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video } from "@/types/domain";
import { VideoActions } from "./video-actions";
import { VideoPlayer } from "./video-player";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const creator = typeof video.creator !== "string" ? video.creator : { username: "Creator", avatar: "", isVerified: false };

  return (
    <div
      className="group relative flex flex-col gap-3 h-full"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
    >
      {/* Visual Shell */}
      <div 
        className={cn(
          "relative aspect-[9/16] w-full max-w-[320px] mx-auto rounded-[2.5rem] overflow-hidden",
          "bg-black/40 border border-white/10 shadow-2xl transition-all duration-700",
          "group-hover:scale-[1.03] group-hover:border-primary/30 group-hover:shadow-primary/10"
        )}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Cover Image */}
        <Image
          src={mediaError ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=320&auto=format&fit=crop" : video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          onError={() => setMediaError(true)}
          className={cn(
            "object-cover transition-opacity duration-700 ease-in-out",
            isPlaying ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
          priority={false}
        />

        {mediaError && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-muted-foreground/30" />
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Media Offline</p>
           </div>
        )}

        {/* Video Surface */}
        <AnimatePresence>
            {isPlaying && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                >
                    <VideoPlayer src={video.video} isPlaying={isPlaying} />
                </motion.div>
            )}
        </AnimatePresence>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

        {/* Play Indicator */}
        {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 transition-transform duration-500 group-hover:scale-110">
                    <Play className="w-8 h-8 fill-white text-white ml-1 opacity-80" />
                </div>
            </div>
        )}

        {/* Floating Actions */}
        <VideoActions 
          likes={video.likesCount || 0} 
          comments={video.commentsCount || 0} 
          className="absolute right-4 bottom-28 z-20"
        />

        {/* Meta Context */}
        <div className="absolute bottom-8 left-6 right-16 z-20 space-y-3">
            <div className="flex items-center gap-2.5">
                <Avatar className="w-9 h-9 border-2 border-white/20 shadow-lg">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-white/90 leading-none flex items-center gap-1">
                        @{creator.username}
                        {creator.isVerified && <BadgeCheck className="w-3 h-3 text-blue-400 fill-blue-400/20" />}
                    </span>
                    <span className="text-[10px] text-white/50 font-medium mt-1">
                        Creator
                    </span>
                </div>
            </div>
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 tracking-tight">
                {video.title}
            </h3>
        </div>
      </div>
    </div>
  );
}
