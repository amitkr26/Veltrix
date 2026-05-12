"use client";

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoActionsProps {
  likes?: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  className?: string;
}

export function VideoActions({ 
  likes = 0, 
  comments = 0, 
  onLike, 
  onComment, 
  onShare,
  className 
}: VideoActionsProps) {
  return (
    <div className={cn("flex flex-col gap-5 items-center", className)}>
      <ActionButton
        icon={<Heart className="w-6 h-6" />}
        label={formatCount(likes)}
        onClick={onLike}
        hoverClass="group-hover:text-red-500 group-hover:fill-red-500"
        bgClass="hover:bg-red-500/10"
      />
      <ActionButton
        icon={<MessageCircle className="w-6 h-6" />}
        label={formatCount(comments)}
        onClick={onComment}
        hoverClass="group-hover:text-blue-500"
        bgClass="hover:bg-blue-500/10"
      />
      <ActionButton
        icon={<Share2 className="w-6 h-6" />}
        onClick={onShare}
        hoverClass="group-hover:text-indigo-500"
        bgClass="hover:bg-indigo-500/10"
      />
    </div>
  );
}

function ActionButton({ 
  icon, 
  label, 
  onClick, 
  hoverClass,
  bgClass 
}: { 
  icon: React.ReactNode; 
  label?: string; 
  onClick?: () => void;
  hoverClass?: string;
  bgClass?: string;
}) {
  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className="flex flex-col items-center gap-1 group/btn"
    >
      <div className={cn(
        "w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-all duration-300",
        bgClass
      )}>
        <div className={cn("text-white transition-colors duration-300", hoverClass)}>
          {icon}
        </div>
      </div>
      {label && (
        <span className="text-[10px] font-bold text-white/90 tracking-wide drop-shadow-md">
          {label}
        </span>
      )}
    </button>
  );
}

function formatCount(count: number): string {
  if (count >= 1000) return (count / 1000).toFixed(1) + "k";
  return count.toString();
}
