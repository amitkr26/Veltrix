"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, User, BadgeCheck, Volume2, VolumeX, MoreVertical, X, Repeat2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Video } from "@/types/domain";
import { useIntersection } from "@/hooks/use-intersection";
import { CommentSheet } from "./comment-sheet";

interface VeltrixReelProps {
  video: Video;
  priority?: boolean;
}

export function VeltrixReel({ video, priority = false }: VeltrixReelProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const lastTapRef = useRef<number>(0);
  
  const creator = typeof video.creator !== "string" ? video.creator : { username: "Creator", avatar: "", isVerified: false };
  
  const [mediaError, setMediaError] = useState(false);

  const { elementRef, isIntersecting } = useIntersection({ threshold: 0.7 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isIntersecting) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isIntersecting]);

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev);
    if (navigator.vibrate) navigator.vibrate(12);
  }, []);

  const handleDoubleTap = () => {
    setIsLiked(true);
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 800);
    if (navigator.vibrate) navigator.vibrate([20, 10, 20]);
  };

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      handleDoubleTap();
    } else {
      setIsMuted(prev => !prev);
    }
    lastTapRef.current = now;
  };

  return (
    <div
      ref={elementRef as any}
      className="relative w-full aspect-[9/16] md:max-w-[420px] mx-auto rounded-3xl overflow-hidden bg-black shadow-xl group transition-all duration-500 snappy-hover border border-white/5 obsidian-glow"
    >
      {/* Interaction Surface */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleInteraction} />

      {/* Media Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={mediaError ? "/fallback-poster.jpg" : video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 420px) 100vw, 420px"
          priority={priority}
          onError={() => setMediaError(true)}
          className={cn(
            "object-cover transition-all duration-700",
            isIntersecting && !mediaError ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
        />
        {isIntersecting && !mediaError && (
          <video
            ref={videoRef}
            src={video.video}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onError={() => setMediaError(true)}
          />
        )}
      </div>

      {/* Refined Overlays - Tighter gradients for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Engagement Feedback */}
      <AnimatePresence>
        {showHeartOverlay && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Practical Status Bar - Standardized Node nomenclature */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white drop-shadow-md">Live</span>
         </div>
         <div className="backdrop-blur-xl bg-black/40 px-3 py-2 rounded-full flex items-center gap-2 pointer-events-auto tactile-press border border-white/10 shadow-lg">
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
         </div>
      </div>

      {/* Ergonomic Engagement Rail */}
      <div className="absolute right-4 bottom-24 z-20 flex flex-col gap-6 items-center">
        <div className="relative group cursor-pointer tactile-press mb-2">
            <Avatar className="w-12 h-12 border-2 border-white/20 p-0.5 bg-black shadow-2xl">
                <AvatarImage src={creator.avatar} className="rounded-full" />
                <AvatarFallback className="bg-muted text-white text-xs">{creator.username[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-black rounded-full p-0.5 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                <Plus className="w-2.5 h-2.5 stroke-[4]" />
            </div>
        </div>

        <EngagementButton
          icon={<Heart className={cn("w-6 h-6 transition-all duration-300", isLiked ? "text-red-500 fill-red-500 scale-110" : "text-white drop-shadow-md")} />}
          count={formatCount(video.likesCount || 0)}
          onClick={(e) => { e.stopPropagation(); handleLike(); }}
        />
        <EngagementButton
          icon={<MessageCircle className="w-6 h-6 text-white drop-shadow-md" />}
          count={formatCount(video.commentsCount || 0)}
          onClick={(e) => { e.stopPropagation(); setIsCommentsOpen(true); }}
        />
        <EngagementButton
          icon={<Share2 className="w-6 h-6 text-white drop-shadow-md" />}
          onClick={(e) => { e.stopPropagation(); }}
        />
      </div>

      {/* High-Contrast Identity Pane */}
      <div className="absolute bottom-8 left-6 right-20 z-20 space-y-3 pointer-events-none">
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight drop-shadow-lg">
                    @{creator.username.toLowerCase()}
                </span>
                {creator.isVerified && (
                    <BadgeCheck className="w-4 h-4 text-white fill-white/20" />
                )}
            </div>
            <p className="text-white/95 text-[13px] font-medium leading-relaxed tracking-tight line-clamp-2 drop-shadow-lg">
                {video.title}
            </p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="backdrop-blur-xl bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg">
             <div className="w-1 h-1 rounded-full bg-white/80 animate-pulse" />
             <span className="text-[9px] font-bold text-white uppercase tracking-widest">Ecosystem Signal</span>
           </div>
        </div>
      </div>

      {/* Refined Side Sheets */}
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute inset-0 z-40 bg-card/95 backdrop-blur-xl"
          >
            <div className="absolute top-6 right-6 z-50">
               <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/5 hover:bg-white/10"
                onClick={() => setIsCommentsOpen(false)}
               >
                 <X className="w-5 h-5" />
               </Button>
            </div>
            <CommentSheet videoId={video.$id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
}

function EngagementButton({ icon, count, onClick }: { icon: React.ReactNode; count?: string; onClick?: (e: React.MouseEvent) => void; }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 tactile-press pointer-events-auto group">
      <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
      </div>
      {count && (
        <span className="text-[10px] font-bold text-white/90 tracking-tighter drop-shadow-sm">
          {count}
        </span>
      )}
    </button>
  );
}

function formatCount(count: number): string {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count.toString();
}
