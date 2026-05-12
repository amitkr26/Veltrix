"use client";

import { Grid, Heart, Bookmark, Hash } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/use-auth-store";
import { useVideos } from "@/features/video-feed/hooks/use-videos";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { data: videos, isLoading } = useVideos("personal");

  if (!user) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-black">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary animate-pulse">Syncing Identity...</p>
       </div>
    );
  }

  const profileUser = {
    username: user.username,
    avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
    bio: user.bio || "Principal Architect in the Veltrix ecosystem.",
    isVerified: true,
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      <Navbar />

      <div className="container mx-auto max-w-6xl pt-24 px-6 md:pt-32">
        <section className="space-y-20">
          {/* Refined Identity */}
          <ProfileHeader user={profileUser} />

          {/* Ergonomic Navigation */}
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-start border-b border-border/40 sticky top-0 md:top-8 bg-background/80 backdrop-blur-xl z-30 -mx-6 px-6">
                <TabsList className="bg-transparent h-auto p-0 gap-10">
                    {["grid", "reels", "saved"].map((tab) => (
                        <TabsTrigger 
                            key={tab}
                            value={tab} 
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 pt-2 px-0 font-bold text-[11px] uppercase tracking-[0.15em] transition-all"
                        >
                            {tab === "grid" ? "Gallery" : tab === "reels" ? "Signals" : "Vault"}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <TabsContent value="grid" className="mt-12">
                <div className="min-h-[400px]">
                    {isLoading ? (
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="aspect-[9/16] rounded-2xl bg-muted/20" />)}
                       </div>
                    ) : (
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {videos?.map((video) => (
                               <div 
                                 key={video.$id} 
                                 className={cn(
                                   "relative aspect-[9/16] rounded-2xl overflow-hidden bg-card border border-border/40 cursor-pointer group snappy-hover"
                                 )}
                               >
                                 <Image 
                                   src={video.thumbnail} 
                                   alt={video.title} 
                                   fill 
                                   className="object-cover transition-all duration-700 opacity-90 group-hover:opacity-100 group-hover:scale-105" 
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                                    <div className="space-y-1">
                                       <p className="text-[10px] font-bold text-white/90 uppercase tracking-tight truncate">{video.title}</p>
                                       <div className="flex items-center gap-2">
                                          <Heart className="w-3.5 h-3.5 text-white/60 fill-white/60" />
                                          <span className="text-[9px] font-bold text-white/60 uppercase">Signal Sync</span>
                                       </div>
                                    </div>
                                 </div>
                               </div>
                           ))}
                       </div>
                    )}
                </div>
            </TabsContent>
            
            <TabsContent value="reels" className="mt-12">
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 opacity-30">
                    <Heart className="w-12 h-12" />
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Signals Inactive</p>
                      <p className="text-sm font-medium">External creator signals will appear here once authorized.</p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-12">
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 opacity-30">
                    <Bookmark className="w-12 h-12" />
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Vault Offline</p>
                      <p className="text-sm font-medium">Reference materials and inspirations are currently sealed.</p>
                    </div>
                </div>
            </TabsContent>
          </Tabs>

          <footer className="section-rhythm border-t border-border/40 mt-20 opacity-20 flex flex-col items-center gap-6">
             <Hash className="w-8 h-8" />
             <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Archive v0.1.2</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
