"use client";

import { motion } from "framer-motion";
import { User, Settings2, Share2, BadgeCheck, Edit3 } from "lucide-react";
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
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Avatar with status indicator */}
        <div className="relative">
            <Avatar className="w-32 h-32 md:w-44 md:h-44 border-[6px] border-background shadow-2xl tap-active ring-1 ring-border/50">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-4xl"><User /></AvatarFallback>
            </Avatar>
        </div>

        {/* Identity & Actions */}
        <div className="flex-1 text-center md:text-left space-y-8">
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <h1 className="text-5xl font-black tracking-tighter flex items-center gap-2.5">
                      {user.username}
                      {user.isVerified && (
                        <BadgeCheck className="w-9 h-9 text-blue-500 fill-blue-500/10 drop-shadow-sm" />
                      )}
                    </h1>
                    
                    <div className="flex items-center gap-2">
                        <Button className="rounded-full h-11 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95">
                            Edit Profile
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full h-11 w-11 glass tap-active">
                            <Settings2 className="w-5 h-5" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-full h-11 w-11 glass tap-active">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                
                <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed text-balance">
                    {user.bio}
                </p>
            </div>

            {/* Social Graph Data */}
            <div className="flex items-center justify-center md:justify-start gap-12">
                <StatItem label="Creations" value="12" />
                <StatItem label="Collective" value="4.8k" />
                <StatItem label="Reference" value="152" />
            </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center md:items-start">
        <span className="text-2xl font-black tracking-tighter">{value}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground mt-1">
          {label}
        </span>
    </div>
  );
}
