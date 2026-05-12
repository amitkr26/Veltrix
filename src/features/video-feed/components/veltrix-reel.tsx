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
      className="relative w-full aspect-[9/16] md:max-w-[400px] mx-auto rounded-[2.5rem] overflow-hidden bg-black shadow-2xl group transition-all duration-700"
    >
      {/* Interaction Surface */}
      <div className="absolute inset-0 z-10" onClick={handleInteraction} />

      {/* Media Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={mediaError ? "/fallback-poster.jpg" : video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 400px) 100vw, 400px"
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
        
        {mediaError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 p-8 text-center space-y-4">
             <AlertCircle className="w-10 h-10 text-muted-foreground/50" />
             <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Media Sector Unreachable</p>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Engagement Feedback */}
      <AnimatePresence>
        {showHeartOverlay && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <Heart className="w-32 h-32 text-white fill-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Live Now</span>
         </div>
         <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-auto">
            {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
         </div>
      </div>

      {/* Engagement Sidebar (Psychologically Positioned) */}
      <div className="absolute right-4 bottom-24 z-20 flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-1 group">
            <Avatar className="w-12 h-12 border-2 border-white tap-active cursor-pointer">
                <AvatarImage src={creator.avatar} />
                <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Plus className="w-3 h-3" />
            </div>
        </div>

        <EngagementButton
          icon={<Heart className={cn("w-7 h-7 transition-all", isLiked ? "text-red-500 fill-red-500 scale-110" : "text-white")} />}
          count={formatCount(video.likesCount || 0)}
          onClick={(e) => { e.stopPropagation(); handleLike(); }}
        />
        <EngagementButton
          icon={<MessageCircle className="w-7 h-7 text-white" />}
          count={formatCount(video.commentsCount || 0)}
          onClick={(e) => { e.stopPropagation(); setIsCommentsOpen(true); }}
        />
        <EngagementButton
          icon={<Repeat2 className="w-7 h-7 text-white" />}
          count="124"
          onClick={(e) => { e.stopPropagation(); }}
        />
        <EngagementButton
          icon={<Share2 className="w-7 h-7 text-white" />}
          onClick={(e) => { e.stopPropagation(); }}
        />
        <button className="tap-active p-2">
            <MoreVertical className="w-6 h-6 text-white/50" />
        </button>
      </div>

      {/* Bottom Identity Panel */}
      <div className="absolute bottom-8 left-6 right-20 z-20 space-y-4 pointer-events-none">
        <div className="space-y-1">
            <div className="flex items-center gap-2">
                <span className="text-base font-black text-white tracking-tight leading-none">
                    {creator.username}
                </span>
                {creator.isVerified && (
                    <BadgeCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                )}
            </div>
            <p className="text-white/90 text-sm font-medium leading-relaxed tracking-tight line-clamp-2">
                {video.title}
            </p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2">
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Original Audio</span>
           </div>
           <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                 <div key={i} className="w-5 h-5 rounded-full border border-black bg-white/20" />
              ))}
           </div>
        </div>
      </div>

      {/* Side Sheets (Comments) */}
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-40"
          >
            <div className="absolute top-6 left-6 z-50">
               <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full glass"
                onClick={() => setIsCommentsOpen(false)}
               >
                 <X className="w-5 h-5 text-white" />
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
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 tap-active pointer-events-auto">
      <div className="w-14 h-14 rounded-full glass flex items-center justify-center border-white/10 shadow-xl">
        {icon}
      </div>
      {count && (
        <span className="text-xs font-black text-white drop-shadow-lg tracking-tight">
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
