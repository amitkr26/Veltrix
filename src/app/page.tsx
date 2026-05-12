"use client";

import { Suspense, useState } from "react";
import { TrendingUp, Sparkles, Hash, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { VeltrixReel } from "@/features/video-feed/components/veltrix-reel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useVideos } from "@/features/video-feed/hooks/use-videos";
import { useTrendingCreators } from "@/features/profile/hooks/use-creators";
import { VideoSkeleton } from "@/features/video-feed/components/video-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const TRENDING_HASHTAGS = [
  "ROS2", "NextJS15", "VLSI_Design", "EmbeddedSystems", "UI_Motion", "Cybernetics"
];

export default function Home() {
  const [activeFeed, setActiveFeed] = useState("for-you");
  const { data: videos, isLoading: isVideosLoading } = useVideos(activeFeed);
  const { data: creators, isLoading: isCreatorsLoading } = useTrendingCreators();

  return (
    <main className="min-h-screen bg-background pb-32 overflow-x-hidden">
      <Navbar />
      
      <div className="pt-24 px-8 md:pt-32">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <header className="space-y-4 max-w-xl">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-primary/20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Ecosystem Beta</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase">
                 Veltrix<br/><span className="text-muted-foreground/20">Studio</span>
               </h1>
               <p className="text-muted-foreground/60 font-medium text-sm tracking-tight">Engineering the future of short-form cinematography.</p>
            </header>

            <Tabs defaultValue="for-you" className="w-full md:w-auto" onValueChange={setActiveFeed}>
              <TabsList className="bg-transparent border-b border-white/5 rounded-none p-0 h-auto w-full md:w-auto flex gap-8">
                {["for-you", "following", "trending"].map((tab) => (
                    <TabsTrigger 
                        key={tab}
                        value={tab} 
                        className="rounded-none px-0 py-4 data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent data-[state=active]:border-primary font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        {tab.replace("-", " ")}
                    </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Creator Signal Bar */}
          <div className="flex items-center gap-10 overflow-x-auto pb-12 hide-scrollbar -mx-8 px-8 mb-20 border-b border-white/5">
            <div className="flex flex-col items-center gap-4 flex-shrink-0 group cursor-pointer tactile-press">
               <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:border-white group-hover:bg-white/5 bg-card">
                  <Zap className="w-8 h-8 text-primary" />
               </div>
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Live Signal</span>
            </div>
            {isCreatorsLoading ? (
               [1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="w-20 h-20 rounded-full bg-white/5 flex-shrink-0" />)
            ) : (
               creators?.map((creator) => (
                  <div key={creator.$id} className="flex flex-col items-center gap-4 flex-shrink-0 group cursor-pointer tactile-press">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Avatar className="w-20 h-20 border border-white/10 p-1 bg-black relative z-10 transition-transform group-hover:scale-105">
                            <AvatarImage src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} className="rounded-full" />
                            <AvatarFallback className="bg-black">{creator.username[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-tight">
                      {creator.username}
                    </span>
                  </div>
                ))
            )}
          </div>

          {/* Editorial Visual Rhythm Feed */}
          <div className="min-h-[800px]">
            {isVideosLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                  {[1, 2, 3, 4, 5, 6].map(i => <VideoSkeleton key={i} />)}
               </div>
            ) : videos && videos.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
                  {videos.map((video, index) => (
                    <div key={`${video.$id}-${activeFeed}`} className={cn(
                      "transition-all duration-1000",
                      index % 2 !== 0 ? "md:translate-y-20" : ""
                    )}>
                      <VeltrixReel 
                        video={video} 
                        priority={index < 2}
                      />
                    </div>
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-48 space-y-8 opacity-20">
                  <Hash className="w-16 h-16" />
                  <p className="text-[12px] font-black uppercase tracking-[0.5em]">Sector Inactive</p>
               </div>
            )}
          </div>

          <footer className="mt-48 border-t border-white/5 pt-24 pb-48">
             <div className="asymmetric-grid">
                <div className="col-editorial-main space-y-12">
                    <div className="flex items-center gap-4">
                        <Hash className="w-10 h-10 text-primary" />
                        <h3 className="text-4xl font-black tracking-tighter uppercase">Signal Hub</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {TRENDING_HASHTAGS.map(tag => (
                           <button key={tag} className="px-8 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-black text-[10px] uppercase tracking-[0.2em] tactile-press">
                             #{tag}
                           </button>
                        ))}
                    </div>
                </div>
                <div className="col-editorial-side bg-card p-10 rounded-3xl border border-white/5 space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol Status</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">The Veltrix ecosystem is operating at peak cinematic fidelity. All signal nodes are active and synchronized.</p>
                    <div className="pt-4 border-t border-white/5">
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Build 0.1.0-Obsidian</span>
                    </div>
                </div>
             </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
