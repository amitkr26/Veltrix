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
    <main className="min-h-screen bg-background pb-32">
      <Navbar />
      
      <div className="pt-24 px-6 md:pt-32">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <header className="space-y-6 max-w-2xl">
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Ecosystem Beta</span>
                  <div className="w-12 h-[1px] bg-primary/20" />
               </div>
               <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.9] uppercase">
                 Veltrix<br/><span className="text-muted-foreground/50">Studio</span>
               </h1>
               <p className="reading-pane text-base">
                 Engineering the future of short-form cinematography through high-fidelity narratives and technical subcultures.
               </p>
            </header>

            <Tabs defaultValue="for-you" className="w-full md:w-auto" onValueChange={setActiveFeed}>
              <TabsList className="bg-card/40 backdrop-blur-md border border-border/40 p-1.5 rounded-2xl h-auto w-full md:w-auto flex gap-1">
                {["for-you", "following", "trending"].map((tab) => (
                    <TabsTrigger 
                        key={tab}
                        value={tab} 
                        className="rounded-xl px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-bold text-[10px] uppercase tracking-[0.15em] transition-all duration-300 tactile-press"
                    >
                        {tab.replace("-", " ")}
                    </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Creator Signal Bar - Refined Density */}
          <div className="flex items-center gap-8 overflow-x-auto pb-8 hide-scrollbar -mx-6 px-6 mb-16 border-b border-border/40">
            <div className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer tactile-press">
               <div className="w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center transition-all group-hover:border-primary group-hover:bg-primary/5 shadow-sm obsidian-glow">
                  <Zap className="w-6 h-6 text-primary" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary">Live</span>
            </div>
            {isCreatorsLoading ? (
               [1, 2, 3, 4, 5, 6, 7].map(i => <Skeleton key={i} className="w-16 h-16 rounded-full bg-muted/20 flex-shrink-0" />)
            ) : (
               creators?.map((creator) => (
                  <div key={creator.$id} className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer tactile-press obsidian-glow">
                    <div className="relative">
                        <Avatar className="w-16 h-16 border border-border p-1 bg-card transition-all duration-500 group-hover:border-primary group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)] shadow-sm">
                            <AvatarImage src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} className="rounded-full" />
                            <AvatarFallback className="bg-muted">{creator.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-background rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[80px] uppercase tracking-tighter">
                      {creator.username}
                    </span>
                  </div>
                ))
            )}
          </div>

          {/* Standardized Feed Rhythm */}
          <div className="min-h-[800px]">
            {isVideosLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => <VideoSkeleton key={i} />)}
               </div>
            ) : videos && videos.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {videos.map((video, index) => (
                    <div key={`${video.$id}-${activeFeed}`}>
                      <VeltrixReel 
                        video={video} 
                        priority={index < 2}
                      />
                    </div>
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-48 space-y-10 opacity-40">
                  <div className="relative">
                      <Hash className="w-16 h-16 animate-pulse" />
                      <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping" />
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.4em] text-primary">Awaiting Signal Ingestion</p>
                    <p className="reading-pane text-sm max-w-xs mx-auto">The ecosystem is currently synchronizing with the global creator network. New narratives will appear shortly.</p>
                  </div>
               </div>
            )}
          </div>

          <footer className="section-rhythm border-t border-border/40 mt-32">
             <div className="content-grid gap-12">
                <div className="col-main space-y-12">
                    <div className="flex items-center gap-4">
                        <Hash className="w-8 h-8 text-primary" />
                        <h3 className="text-3xl font-extrabold tracking-tight uppercase">Signal Hub</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {TRENDING_HASHTAGS.map(tag => (
                           <button key={tag} className="px-6 py-3 rounded-full border border-border bg-card hover:bg-foreground hover:text-background transition-all font-bold text-[11px] uppercase tracking-[0.1em] tactile-press">
                             #{tag}
                           </button>
                        ))}
                    </div>
                </div>
                <div className="col-side bg-card p-8 rounded-3xl border border-border/40 space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Status</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">The Veltrix ecosystem is currently operating within stable parameters. Multi-region signal synchronization is active.</p>
                    <div className="pt-4 border-t border-border/20">
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Build v0.1.2-Stable</span>
                    </div>
                </div>
             </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
