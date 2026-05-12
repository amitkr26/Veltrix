"use client";

import { SearchBar } from "@/features/search/components/search-bar";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import { TrendingUp, MessageSquare, Hash, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVideos } from "@/features/video-feed/hooks/use-videos";
import { useTrendingCreators } from "@/features/profile/hooks/use-creators";
import { Skeleton } from "@/components/ui/skeleton";

export default function DiscoverPage() {
  const { data: videos, isLoading: isVideosLoading } = useVideos("trending");
  const { data: creators, isLoading: isCreatorsLoading } = useTrendingCreators();

  return (
    <main className="min-h-screen bg-background relative pt-32 pb-48 px-8">
      <Navbar />

      <div className="container mx-auto max-w-7xl">
        <section className="space-y-32">
          {/* Obsidian Editorial Header */}
          <header className="asymmetric-grid items-end gap-16">
            <div className="col-editorial-main space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-[1px] bg-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Discovery Protocol</span>
               </div>
               <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                 Deep<br/><span className="text-muted-foreground/20">Discovery</span>
               </h1>
               <p className="text-muted-foreground/60 font-medium text-xl max-w-xl leading-relaxed tracking-tight">
                 Accessing the edge of short-form cinematography and technical subcultures.
               </p>
            </div>
            <div className="col-editorial-side pb-2">
               <SearchBar onSearch={(q) => console.log(q)} />
            </div>
          </header>

          {/* Signal Category Bar */}
          <div className="flex gap-4 overflow-x-auto pb-12 hide-scrollbar -mx-8 px-8 border-b border-white/5">
             {["#ROS2_Swarm", "#Silicon_Art", "#LowLevel_Dev", "#Cyber_Culture", "#Maker_Scene", "#VLSI_Rhythm"].map(tag => (
                <button key={tag} className="px-8 py-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all whitespace-nowrap tactile-press">
                   {tag}
                </button>
             ))}
          </div>

          {/* Cinematic Asymmetric Grid */}
          <div className="min-h-[600px]">
            {isVideosLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-12 gap-6 auto-rows-[240px]">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className={cn(
                        "rounded-3xl bg-white/5",
                        i === 1 ? "md:col-span-8 md:row-span-2" : "md:col-span-4 md:row-span-1"
                    )} />
                  ))}
               </div>
            ) : (
               <div className="grid grid-cols-2 md:grid-cols-12 gap-6 auto-rows-[240px]">
                  {videos?.map((video, index) => {
                     const isFeatured = index === 0;
                     const isNiche = index === 3 || index === 4;
                     const creator = typeof video.creator !== "string" ? video.creator : { username: "Creator" };
                     
                     return (
                        <div 
                           key={video.$id}
                           className={cn(
                             "relative group rounded-[2rem] overflow-hidden bg-card cursor-pointer transition-all duration-700 shadow-2xl obsidian-surface",
                             isFeatured && "md:col-span-8 md:row-span-2",
                             isNiche && "md:col-span-4 md:row-span-2",
                             !isFeatured && !isNiche && "md:col-span-4 md:row-span-1"
                           )}
                        >
                           <Image 
                             src={video.thumbnail} 
                             alt={video.title}
                             fill
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                             className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
                           />
                           
                           {/* Editorial Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                              <div className="space-y-3">
                                 <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-primary" />
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                                        {creator.username}
                                    </p>
                                 </div>
                                 <p className="text-lg text-white font-black leading-tight tracking-tighter uppercase">{video.title}</p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
          </div>

          {/* Socially Layered Signal Debates */}
          <div className="asymmetric-grid gap-16 pt-24 border-t border-white/5">
             <div className="col-editorial-main space-y-12">
                <div className="flex items-center gap-4">
                    <MessageSquare className="w-8 h-8 text-primary" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Signal Threads</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[1, 2, 3, 4].map(i => (
                      <div key={i} className="p-8 rounded-[2rem] bg-card border border-white/5 hover:border-white/20 transition-all cursor-pointer group tactile-press">
                         <div className="flex items-center gap-4 mb-6">
                            <Avatar className="w-8 h-8 border border-white/10">
                               <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} />
                            </Avatar>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Node</span>
                         </div>
                         <p className="text-base font-bold leading-relaxed group-hover:text-primary transition-colors tracking-tight">
                            "Protocol analysis indicates a 40% increase in signal fidelity when utilizing asymmetric cryptographic buffers..."
                         </p>
                      </div>
                   ))}
                </div>
             </div>

              <div className="col-editorial-side space-y-12">
                 <div className="flex items-center gap-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Nodes</h3>
                 </div>
                 <div className="space-y-4">
                    {isCreatorsLoading ? (
                       [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 rounded-[2rem] bg-white/5" />)
                    ) : (
                       creators?.slice(0, 5).map(creator => (
                         <div key={creator.$id} className="p-6 rounded-[2rem] bg-card border border-white/5 flex items-center gap-5 group cursor-pointer hover:bg-white hover:text-black transition-all tactile-press">
                            <Avatar className="w-12 h-12 border border-white/10 group-hover:border-black/10">
                               <AvatarImage src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} />
                            </Avatar>
                            <div className="min-w-0">
                               <p className="text-sm font-black truncate uppercase tracking-tighter">{creator.username}</p>
                               <p className="text-[10px] font-black text-muted-foreground group-hover:text-black/40 uppercase tracking-widest">Creator Signal</p>
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
