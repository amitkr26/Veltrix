"use client";

import { Grid, Heart, Bookmark, Edit3, BadgeCheck, Settings2, Share } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { VeltrixReel } from "@/features/video-feed/components/veltrix-reel";
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
       <div className="min-h-screen flex items-center justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Establishing Identity...</p>
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
    <main className="min-h-screen bg-background relative pb-32 px-6 pt-12 md:pt-24">
      <Navbar />

      <div className="container mx-auto max-w-6xl">
        <div className="space-y-16">
          {/* Identity Section */}
          <ProfileHeader user={profileUser} />

          {/* Contextual Navigation */}
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-center border-b border-border/40 sticky top-20 bg-background/80 backdrop-blur-xl z-30 -mx-6 px-6">
                <TabsList className="bg-transparent h-auto p-0 gap-10">
                    <TabsTrigger 
                        value="grid" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        <Grid className="w-4 h-4 mr-2" /> Gallery
                    </TabsTrigger>
                    <TabsTrigger 
                        value="reels" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        <Heart className="w-4 h-4 mr-2" /> Liked
                    </TabsTrigger>
                    <TabsTrigger 
                        value="saved" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                    >
                        <Bookmark className="w-4 h-4 mr-2" /> Vault
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="grid" className="mt-12">
                <div className="min-h-[300px]">
                    {isLoading ? (
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="aspect-[9/16] rounded-2xl bg-white/5" />)}
                       </div>
                    ) : (
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {videos?.map((video) => (
                               <div 
                                 key={video.$id} 
                                 className={cn(
                                   "relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted group cursor-pointer",
                                   "transition-all duration-500 hover:brightness-110 active:scale-95"
                                 )}
                               >
                                 <Image 
                                   src={video.thumbnail} 
                                   alt={video.title} 
                                   fill 
                                   className="object-cover" 
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                 <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                    <div className="flex items-center gap-2">
                                       <Heart className="w-4 h-4 text-white fill-white" />
                                       <span className="text-xs font-bold text-white">0</span>
                                    </div>
                                 </div>
                               </div>
                           ))}
                       </div>
                    )}
                </div>
            </TabsContent>
            
            <TabsContent value="reels" className="mt-12">
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                        <Heart className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-black tracking-tight">Curation Empty</p>
                      <p className="text-muted-foreground font-medium">Videos you love will appear in your private gallery.</p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-12">
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                        <Bookmark className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-black tracking-tight">The Vault is Sealed</p>
                      <p className="text-muted-foreground font-medium">Save inspiration here to build your creative reference.</p>
                    </div>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
