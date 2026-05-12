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
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">Synchronizing Identity...</p>
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
    <main className="min-h-screen bg-background relative pb-48 pt-32 px-8">
      <Navbar />

      <div className="container mx-auto max-w-7xl">
        <section className="space-y-32">
          {/* Identity Architecture */}
          <ProfileHeader user={profileUser} />

          {/* Contextual Ecosystem Navigation */}
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-start border-b border-white/5 sticky top-28 bg-background/80 backdrop-blur-2xl z-30 -mx-8 px-8">
                <TabsList className="bg-transparent h-auto p-0 gap-12">
                    {["grid", "reels", "saved"].map((tab) => (
                        <TabsTrigger 
                            key={tab}
                            value={tab} 
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-6 pt-2 px-0 font-black text-[10px] uppercase tracking-[0.3em] transition-all"
                        >
                            {tab === "grid" && <Grid className="w-4 h-4 mr-3" />}
                            {tab === "reels" && <Heart className="w-4 h-4 mr-3" />}
                            {tab === "saved" && <Bookmark className="w-4 h-4 mr-3" />}
                            {tab === "grid" ? "Cinematics" : tab === "reels" ? "Signals" : "Vault"}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <TabsContent value="grid" className="mt-20">
                <div className="min-h-[600px]">
                    {isLoading ? (
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="aspect-[9/16] rounded-3xl bg-white/5" />)}
                       </div>
                    ) : (
                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                           {videos?.map((video) => (
                               <div 
                                 key={video.$id} 
                                 className={cn(
                                   "relative aspect-[9/16] rounded-3xl overflow-hidden bg-card cursor-pointer obsidian-surface",
                                   "transition-all duration-700 hover:scale-[1.02] tactile-press group"
                                 )}
                               >
                                 <Image 
                                   src={video.thumbnail} 
                                   alt={video.title} 
                                   fill 
                                   className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                 <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                                    <div className="space-y-2">
                                       <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{video.title}</p>
                                       <div className="flex items-center gap-3">
                                          <Heart className="w-4 h-4 text-white fill-white" />
                                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Signal Locked</span>
                                       </div>
                                    </div>
                                 </div>
                               </div>
                           ))}
                       </div>
                    )}
                </div>
            </TabsContent>
            
            <TabsContent value="reels" className="mt-32">
                <div className="flex flex-col items-center justify-center py-48 text-center space-y-8 opacity-20">
                    <Heart className="w-16 h-16" />
                    <div className="space-y-2">
                      <p className="text-[12px] font-black uppercase tracking-[0.5em]">Signals Inactive</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">External signal nodes will appear here once authorized.</p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-32">
                <div className="flex flex-col items-center justify-center py-48 text-center space-y-8 opacity-20">
                    <Bookmark className="w-16 h-16" />
                    <div className="space-y-2">
                      <p className="text-[12px] font-black uppercase tracking-[0.5em]">Vault Sealed</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">Reference materials and inspirations are currently offline.</p>
                    </div>
                </div>
            </TabsContent>
          </Tabs>

          <footer className="mt-48 pt-24 border-t border-white/5 pb-48 opacity-20">
             <div className="flex flex-col items-center gap-6">
                <Hash className="w-12 h-12" />
                <span className="text-[10px] font-black uppercase tracking-[1em]">Veltrix Archive 0.1</span>
             </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
