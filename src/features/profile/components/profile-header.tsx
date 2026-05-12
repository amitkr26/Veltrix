"use client";

import { User, Settings2, Share2, BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  user: {
    username: string;
    avatar: string;
    bio?: string;
    isVerified?: boolean;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-16">
        {/* Avatar with status indicator */}
        <div className="relative">
            <Avatar className="w-40 h-40 md:w-56 md:h-56 border border-white/5 shadow-2xl transition-all duration-700 hover:scale-[1.02] p-1.5 bg-card">
                <AvatarImage src={user.avatar} className="rounded-full" />
                <AvatarFallback className="text-4xl bg-black text-white"><User className="w-16 h-16" /></AvatarFallback>
            </Avatar>
        </div>

        {/* Identity & Actions */}
        <div className="flex-1 text-center md:text-left space-y-12">
            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="w-8 h-[1px] bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Identity Node</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                        {user.username}
                        {user.isVerified && (
                          <BadgeCheck className="w-10 h-10 text-white fill-white/10 ml-4 inline-block align-top" />
                        )}
                    </h1>
                </div>
                
                <p className="text-xl text-muted-foreground/60 font-medium max-w-2xl leading-relaxed tracking-tight text-balance">
                    {user.bio}
                </p>
            </div>

            {/* Social Actions & Stats */}
            <div className="flex flex-col md:flex-row items-center gap-12 pt-4">
                <div className="flex items-center gap-3">
                    <Button className="rounded-full h-14 px-10 font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all tactile-press bg-white text-black hover:bg-white/90">
                        Edit Profile
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full h-14 w-14 border border-white/10 hover:bg-white hover:text-black transition-all tactile-press bg-card">
                        <Settings2 className="w-5 h-5" />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full h-14 w-14 border border-white/10 hover:bg-white hover:text-black transition-all tactile-press bg-card">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex items-center gap-12 border-l border-white/5 pl-12 h-14 hidden md:flex">
                    <StatItem label="Creations" value="12" />
                    <StatItem label="Signal Nodes" value="4.8k" />
                    <StatItem label="Reference" value="152" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start">
        <span className="text-2xl font-black tracking-tighter uppercase">{value}</span>
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
    </div>
  );
}
