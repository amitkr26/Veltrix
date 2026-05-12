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
      <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
        {/* Grounded Avatar */}
        <div className="relative">
            <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-background shadow-xl ring-1 ring-border/40 transition-all duration-500 snappy-hover bg-card">
                <AvatarImage src={user.avatar} className="rounded-full" />
                <AvatarFallback className="text-3xl bg-muted text-muted-foreground"><User className="w-12 h-12" /></AvatarFallback>
            </Avatar>
        </div>

        {/* Identity & Practical Actions */}
        <div className="flex-1 text-center md:text-left space-y-8 pb-2">
            <div className="space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Identity Node</span>
                        <div className="w-8 h-[1px] bg-primary/20" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-[0.9]">
                        {user.username}
                        {user.isVerified && (
                          <BadgeCheck className="w-8 h-8 text-primary fill-primary/10 ml-3 inline-block align-middle" />
                        )}
                    </h1>
                </div>
                
                <p className="reading-pane text-base mx-auto md:mx-0">
                    {user.bio}
                </p>
            </div>

            {/* Social Actions & Stats - Ergonomic Layout */}
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-3">
                    <Button className="rounded-full h-12 px-10 font-bold text-[11px] uppercase tracking-[0.15em] shadow-lg tactile-press">
                        Edit Identity
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 border border-border/60 tactile-press bg-card/40 backdrop-blur-md shadow-sm">
                        <Settings2 className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 border border-border/60 tactile-press bg-card/40 backdrop-blur-md shadow-sm">
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-12 border-l border-border/40 pl-12 h-10 hidden md:flex">
                    <StatItem label="Signals" value="12" />
                    <StatItem label="Nodes" value="4.8k" />
                    <StatItem label="Vault" value="152" />
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
        <span className="text-xl font-extrabold tracking-tight uppercase">{value}</span>
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-muted-foreground mt-0.5">
          {label}
        </span>
    </div>
  );
}
