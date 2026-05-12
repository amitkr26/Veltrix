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
    <main className="min-h-screen bg-background pb-24 md:pb-12 overflow-x-hidden">
      <Navbar />
      
      {/* Social Continuity Header */}
      <div className="pt-24 px-6 md:pt-28">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <header className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter">Veltrix <span className="text-primary/40">Studio</span></h1>
              <p className="text-muted-foreground font-medium text-sm">Engineering the future of creativity.</p>
            </header>

            <Tabs defaultValue="for-you" className="w-full md:w-auto" onValueChange={setActiveFeed}>
              <TabsList className="bg-primary/5 border border-primary/10 rounded-full p-1 h-auto w-full md:w-auto">
                <TabsTrigger value="for-you" className="flex-1 md:flex-none rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black text-[10px] uppercase tracking-widest transition-all">
                  For You
                </TabsTrigger>
                <TabsTrigger value="following" className="flex-1 md:flex-none rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black text-[10px] uppercase tracking-widest transition-all">
                  Following
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex-1 md:flex-none rounded-full px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-black text-[10px] uppercase tracking-widest transition-all">
                  Trending
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Social Active Stories/Creators */}
          <div className="flex items-center gap-6 overflow-x-auto pb-4 hide-scrollbar -mx-6 px-6 mb-12">
            <div className="flex flex-col items-center gap-2.5 flex-shrink-0 group cursor-pointer">
               <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-dashed flex items-center justify-center transition-all group-hover:border-primary group-hover:bg-primary/5">
                  <Zap className="w-6 h-6 text-primary" />
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-primary">Live Now</span>
            </div>
            {isCreatorsLoading ? (
               [1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="w-16 h-16 rounded-full bg-white/5 flex-shrink-0" />)
            ) : (
               creators?.map((creator) => (
                  <div key={creator.$id} className="flex flex-col items-center gap-2.5 flex-shrink-0 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-primary/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Avatar className="w-16 h-16 border-2 border-background relative z-10 p-0.5">
                            <AvatarImage src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} className="rounded-full" />
                            <AvatarFallback>{creator.username[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-tight">
                      {creator.username}
                    </span>
                  </div>
                ))
            )}
            {!isCreatorsLoading && (!creators || creators.length === 0) && (
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 opacity-50">
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Inactive</span>
               </div>
            )}
          </div>

          {/* Evolving Visual Rhythm Feed */}
          <div className="min-h-[600px]">
            {isVideosLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <VideoSkeleton key={i} />)}
               </div>
            ) : videos && videos.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                  {videos.map((video, index) => (
                    <div key={`${video.$id}-${activeFeed}`} className={cn(
                      "natural-rhythm transition-all duration-700",
                      index % 3 === 0 ? "md:scale-105" : "md:scale-100"
                    )}>
                      <VeltrixReel 
                        video={video} 
                        priority={index < 2}
                      />
                    </div>
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-40">
                  <div className="p-4 rounded-full bg-white/5 border border-white/10">
                     <Hash className="w-8 h-8" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest">No Technical Media Found</p>
               </div>
            )}
          </div>

          {/* Trending Conversations/Tags */}
          <footer className="mt-24 border-t border-border/20 pt-16 pb-32">
             <div className="flex items-center gap-3 mb-8">
                <Hash className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-black tracking-tight uppercase tracking-[0.1em]">Trending Hub</h3>
             </div>
             <div className="flex flex-wrap gap-3">
                {TRENDING_HASHTAGS.map(tag => (
                   <button key={tag} className="px-6 py-3 rounded-2xl glass border-white/5 hover:bg-primary hover:text-primary-foreground transition-all font-black text-[10px] uppercase tracking-widest">
                     #{tag}
                   </button>
                ))}
             </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
