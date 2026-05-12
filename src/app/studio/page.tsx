"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { 
  BarChart3, 
  Users, 
  Play, 
  Plus, 
  Settings, 
  TrendingUp, 
  MessageSquare,
  Clock,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreatorService } from "@/services/creator-service";
import { useAuthStore } from "@/store/use-auth-store";
import { Video } from "@/types/domain";
import Image from "next/image";

export default function CreatorStudio() {
  const user = useAuthStore((state) => state.user);
  const [analytics, setAnalytics] = useState<any>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStudioData() {
      if (!user) return;
      try {
        const stats = await CreatorService.getCreatorAnalytics(user.$id);
        const userVideos = await CreatorService.getCreatorVideos(user.$id);
        setAnalytics(stats);
        setVideos(userVideos);
      } catch (error) {
        console.error("Failed to load studio data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStudioData();
  }, [user]);

  return (
    <main className="min-h-screen bg-background pb-24 md:pb-12 pt-24 px-6">
      <Navbar />

      <div className="container mx-auto max-w-7xl">
        <div className="space-y-12">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
                 <BarChart3 className="w-4 h-4" /> Operations Dashboard
              </div>
              <h1 className="text-6xl font-black tracking-tighter leading-none">Creator <span className="text-primary/40">Studio</span></h1>
              <p className="text-muted-foreground font-medium text-xl max-w-xl">
                 Manage your creative infrastructure and audience growth in real-time.
              </p>
            </div>
            <div className="flex gap-3">
               <Button className="rounded-full h-12 px-8 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/10">
                 <Plus className="w-4 h-4 mr-2" /> New Upload
               </Button>
               <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 glass">
                 <Settings className="w-5 h-5" />
               </Button>
            </div>
          </header>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <MetricCard 
                label="Total Reach" 
                value={analytics?.totalViews?.toLocaleString() || "124.5k"} 
                trend="+12% this month"
                icon={<Play className="w-5 h-5 text-blue-500" />}
             />
             <MetricCard 
                label="Collective" 
                value="4,820" 
                trend="+158 new"
                icon={<Users className="w-5 h-5 text-purple-500" />}
             />
             <MetricCard 
                label="Engagement" 
                value="4.8%" 
                trend="+0.2%"
                icon={<TrendingUp className="w-5 h-5 text-green-500" />}
             />
             <MetricCard 
                label="Discussions" 
                value="842" 
                trend="12 active"
                icon={<MessageSquare className="w-5 h-5 text-orange-500" />}
             />
          </div>

          {/* Content Management */}
          <div className="space-y-8 pt-6">
             <div className="flex items-center justify-between border-b border-border/40 pb-6">
                <h2 className="text-2xl font-black tracking-tighter uppercase tracking-[0.05em]">Managed Content</h2>
                <div className="flex gap-4">
                   <button className="text-[10px] font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-1">Published</button>
                   <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground pb-1 transition-colors">Drafts</button>
                   <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground pb-1 transition-colors">Archived</button>
                </div>
             </div>

             <div className="grid grid-cols-1 gap-4">
                {videos.length === 0 ? (
                   <div className="py-20 text-center glass rounded-3xl border-dashed border-2">
                      <p className="text-muted-foreground font-medium italic">No content detected in this sector.</p>
                   </div>
                ) : (
                   videos.map((video) => (
                      <Card key={video.$id} className="glass border-white/5 overflow-hidden hover:bg-white/5 transition-all group">
                         <CardContent className="p-0 flex items-center">
                            <div className="relative w-32 h-20 flex-shrink-0">
                               <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 px-8 py-4 flex items-center justify-between">
                               <div className="space-y-1">
                                  <h3 className="font-black text-sm tracking-tight line-clamp-1">{video.title}</h3>
                                  <div className="flex items-center gap-4">
                                     <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        <Clock className="w-3 h-3" /> May 12, 2024
                                     </span>
                                     <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-widest">
                                        Active
                                     </span>
                                  </div>
                               </div>
                               <div className="flex items-center gap-10">
                                  <div className="hidden md:flex items-center gap-6">
                                     <div className="text-center">
                                        <p className="text-xs font-black">1.2k</p>
                                        <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Views</p>
                                     </div>
                                     <div className="text-center">
                                        <p className="text-xs font-black">84</p>
                                        <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">Likes</p>
                                     </div>
                                  </div>
                                  <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                     <MoreVertical className="w-5 h-5" />
                                  </Button>
                               </div>
                            </div>
                         </CardContent>
                      </Card>
                   ))
                )}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ label, value, trend, icon }: { label: string; value: string; trend: string; icon: React.ReactNode }) {
  return (
    <Card className="glass border-white/5 hover:border-white/10 transition-all shadow-2xl">
       <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
             <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                {icon}
             </div>
             <ArrowUpRight className="w-4 h-4 text-muted-foreground/30" />
          </div>
       </CardHeader>
       <CardContent className="space-y-1">
          <p className="text-3xl font-black tracking-tighter">{value}</p>
          <div className="flex items-center justify-between">
             <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
             <p className="text-[9px] font-bold text-primary">{trend}</p>
          </div>
       </CardContent>
    </Card>
  );
}
