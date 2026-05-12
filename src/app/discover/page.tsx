"use client";

import { SearchBar } from "@/features/search/components/search-bar";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import { TrendingUp, MessageSquare, Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVideos } from "@/features/video-feed/hooks/use-videos";
import { useTrendingCreators } from "@/features/profile/hooks/use-creators";
import { Skeleton } from "@/components/ui/skeleton";

export default function DiscoverPage() {
  const { data: videos, isLoading: isVideosLoading } = useVideos("trending");
  const { data: creators, isLoading: isCreatorsLoading } = useTrendingCreators();

  return (
    <main className="min-h-screen bg-background pb-32">
      <Navbar />

      <div className="container mx-auto max-w-6xl pt-24 px-6 md:pt-32">
        <section className="space-y-24">
          {/* Grounded Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
               <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Ecosystem Node</span>
                  <div className="w-12 h-[1px] bg-primary/20" />
               </div>
               <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.9] uppercase">
                 Deep<br/><span className="text-muted-foreground/30">Explore</span>
               </h1>
               <p className="reading-pane text-base">
                 Accessing the edge of short-form cinematography and technical subcultures across the Veltrix network.
               </p>
            </div>
            <div className="w-full md:w-80">
               <SearchBar onSearch={(q) => console.log(q)} />
            </div>
          </header>

          {/* Practical Category Bar - Refined Tactile Feel */}
          <div className="flex gap-2 overflow-x-auto pb-6 hide-scrollbar -mx-6 px-6 border-b border-border/40">
             {["#ROS2_Swarm", "#Silicon_Art", "#LowLevel_Dev", "#Cyber_Culture", "#Maker_Scene", "#VLSI_Rhythm"].map((tag, index) => (
                <button key={tag} className={cn(
                    "px-6 py-2.5 rounded-xl border transition-all duration-300 whitespace-nowrap tactile-press font-bold text-[10px] uppercase tracking-[0.1em]",
                    index === 0 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                      : "bg-card/40 backdrop-blur-sm border-border/40 text-muted-foreground hover:text-foreground hover:bg-card"
                )}>
                   {tag}
                </button>
             ))}
          </div>

          {/* Optimized Discover Grid */}
          <div className="min-h-[600px]">
            {isVideosLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className="aspect-[9/16] rounded-2xl bg-muted/20" />
                  ))}
               </div>
            ) : (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {videos?.map((video) => {
                     const creator = typeof video.creator !== "string" ? video.creator : { username: "Creator" };
                     
                     return (
                        <div 
                           key={video.$id}
                           className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-card border border-border/40 group cursor-pointer snappy-hover obsidian-glow"
                        >
                           <Image 
                             src={video.thumbnail} 
                             alt={video.title}
                             fill
                             sizes="(max-width: 768px) 50vw, 33vw"
                             className="object-cover transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105"
                           />
                           
                           {/* Simplified Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                              <div className="space-y-2">
                                 <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                                    @{creator.username}
                                 </p>
                                 <p className="text-sm text-white font-bold leading-tight tracking-tight uppercase line-clamp-2">{video.title}</p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
          </div>

          {/* Utility Signals Section */}
          <div className="content-grid gap-12 border-t border-border/40 pt-24">
             <div className="col-main space-y-12">
                <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-extrabold tracking-tight uppercase">Signal Threads</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[1, 2, 3, 4].map(i => (
                      <div key={i} className="p-8 rounded-3xl bg-card/40 border border-border/40 hover:border-primary/30 transition-all cursor-pointer group tactile-press obsidian-glow">
                         <div className="flex items-center gap-3 mb-6">
                            <Avatar className="w-6 h-6 border border-border shadow-sm">
                               <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} />
                            </Avatar>
                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Active Hub</span>
                         </div>
                         <p className="text-sm font-semibold leading-relaxed group-hover:text-primary transition-colors">
                            "The efficiency of the new buffer allocation protocol on high-latency signal nodes is exceeding expectations..."
                         </p>
                      </div>
                   ))}
                </div>
             </div>

              <div className="col-side space-y-12">
                 <div className="flex items-center gap-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-extrabold tracking-tight uppercase">Nodes</h3>
                 </div>
                 <div className="space-y-3">
                    {isCreatorsLoading ? (
                       [1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-20 rounded-2xl bg-muted/20" />)
                    ) : (
                       creators?.slice(0, 5).map(creator => (
                         <div key={creator.$id} className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4 group cursor-pointer hover:bg-foreground hover:text-background transition-all tactile-press obsidian-glow shadow-sm">
                            <Avatar className="w-12 h-12 border border-border/20">
                               <AvatarImage src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} />
                            </Avatar>
                            <div className="min-w-0">
                               <p className="text-xs font-bold truncate uppercase tracking-tight">{creator.username}</p>
                               <p className="text-[9px] font-bold text-muted-foreground group-hover:text-background/60 uppercase tracking-widest">Active Creator</p>
                            </div>
                         </div>
                       ))
                    )}
                 </div>
              </div>
          </div>
        </section>
      </div>
    </main>
  );
}
