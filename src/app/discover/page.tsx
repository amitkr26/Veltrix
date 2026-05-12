"use client";

import { Metadata } from "next";
import { SearchBar } from "@/features/search/components/search-bar";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import { Play, TrendingUp, Sparkles, Hash, Zap, ArrowUpRight, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVideos } from "@/features/video-feed/hooks/use-videos";
import { useTrendingCreators } from "@/features/profile/hooks/use-creators";
import { Skeleton } from "@/components/ui/skeleton";


export default function DiscoverPage() {
  const { data: videos, isLoading: isVideosLoading } = useVideos("trending");
  const { data: creators, isLoading: isCreatorsLoading } = useTrendingCreators();

  return (
    <main className="min-h-screen bg-background relative pt-24 pb-32 md:pb-12 px-6">
      <Navbar />

      <div className="container mx-auto max-w-6xl">
        <section className="space-y-20">
          {/* Restrained Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter leading-tight">Explore</h1>
              <p className="text-muted-foreground font-medium text-xl max-w-lg leading-relaxed">
                Niche subcultures, technical rabbit holes, and the edge of digital art.
              </p>
            </div>
            <SearchBar onSearch={(q) => console.log(q)} />
          </header>

          {/* Culturally Active Threads/Categories */}
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-6 px-6">
             {["#ROS2_Swarm", "#Silicon_Art", "#LowLevel_Dev", "#Cyber_Culture", "#Maker_Scene"].map(tag => (
                <button key={tag} className="px-6 py-2.5 rounded-xl border border-border/40 text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap">
                   {tag}
                </button>
             ))}
          </div>

          {/* Imperfect Asymmetric Grid */}
          <div className="min-h-[400px]">
            {isVideosLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[180px]">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className={cn(
                        "rounded-2xl bg-white/5",
                        i === 2 ? "md:col-span-3 md:row-span-3" : "md:col-span-2 md:row-span-2"
                    )} />
                  ))}
               </div>
            ) : (
               <div className="grid grid-cols-2 md:grid-cols-6 gap-4 auto-rows-[180px]">
                  {videos?.map((video, index) => {
                     const isFeatured = index === 1;
                     const isNiche = index === 4 || index === 5;
                     const creator = typeof video.creator !== "string" ? video.creator : { username: "Creator" };
                     
                     return (
                        <div 
                           key={video.$id}
                           className={cn(
                             "relative group rounded-2xl overflow-hidden bg-muted cursor-pointer transition-all duration-700",
                             isFeatured && "md:col-span-3 md:row-span-3",
                             isNiche && "md:col-span-2 md:row-span-2",
                             !isFeatured && !isNiche && "md:col-span-2 md:row-span-2"
                           )}
                        >
                           <Image 
                             src={video.thumbnail} 
                             alt={video.title}
                             fill
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                             className="object-cover group-hover:scale-105 transition-transform duration-700"
                           />
                           
                           {/* Subdued Overlay */}
                           <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                              <div className="flex justify-end">
                                 <span className="text-[9px] font-black text-white uppercase tracking-widest glass px-2 py-1 rounded">
                                    {index % 2 === 0 ? "Experimental" : "Top Pick"}
                                 </span>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-white uppercase tracking-widest">
                                    {creator.username}
                                 </p>
                                 <p className="text-[9px] text-white/70 font-medium line-clamp-1">{video.title}</p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
          </div>

          {/* Socially Layered Discussions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
             <div className="space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                   <MessageSquare className="w-4 h-4" /> Technical Debates
                </h3>
                <div className="space-y-4">
                   {[1, 2].map(i => (
                      <div key={i} className="p-6 rounded-2xl border border-border/40 hover:border-primary/30 transition-colors cursor-pointer group">
                         <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-6 h-6">
                               <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} />
                            </Avatar>
                            <span className="text-[10px] font-black uppercase tracking-widest">Active Thread</span>
                         </div>
                         <p className="text-sm font-semibold leading-relaxed group-hover:text-primary transition-colors">
                            "The trade-off between power consumption and clock speed in 5nm RISC-V cores is reaching a plateau..."
                         </p>
                      </div>
                   ))}
                </div>
             </div>

              <div className="space-y-8">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                    <TrendingUp className="w-4 h-4" /> Rising Stars
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    {isCreatorsLoading ? (
                       [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-14 rounded-2xl bg-white/5" />)
                    ) : (
                       creators?.slice(0, 4).map(creator => (
                         <div key={creator.$id} className="p-4 rounded-2xl bg-primary/5 flex items-center gap-3 group cursor-pointer hover:bg-primary/10 transition-all">
                            <Avatar className="w-10 h-10">
                               <AvatarImage src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.username}`} />
                            </Avatar>
                            <div className="min-w-0">
                               <p className="text-[11px] font-black truncate">{creator.username}</p>
                               <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Creator</p>
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
