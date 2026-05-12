"use client";

import { useState } from "react";
import { Send, X, MessageSquare, Loader2 } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/use-auth-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SocialService } from "@/services/social-service";

interface CommentSheetProps {
  videoId: string;
}

export function CommentSheet({ videoId }: CommentSheetProps) {
  const [comment, setComment] = useState("");
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: comments, isLoading, isError } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => SocialService.getVideoComments(videoId),
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (text: string) => SocialService.addComment(videoId, user?.$id || "anon", text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
      setComment("");
    },
  });

  const handleSend = () => {
    if (!comment.trim()) return;
    mutation.mutate(comment);
  };

  return (
    <SheetContent side="right" className="w-full sm:max-w-md bg-background/95 backdrop-blur-2xl border-white/5 p-0 flex flex-col">
      <SheetHeader className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <SheetTitle className="text-2xl font-black tracking-tight">Technical Debate</SheetTitle>
                <SheetDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {comments?.length || 0} Professional Contributions
                </SheetDescription>
            </div>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {isLoading ? (
           <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
           </div>
        ) : (
           comments?.map((com) => (
             <div key={com.$id} className="space-y-4 group">
               <div className="flex gap-4">
                 <Avatar className="w-8 h-8 rounded-xl ring-2 ring-white/5">
                   <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${com.userId}`} />
                   <AvatarFallback>U</AvatarFallback>
                 </Avatar>
                 <div className="space-y-1.5 flex-1">
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest">{com.userId.substring(0, 8)}</span>
                     <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Just now</span>
                   </div>
                   <p className="text-sm font-medium leading-relaxed">{com.text}</p>
                 </div>
               </div>
             </div>
           ))
        )}

        {!isLoading && !isError && (!comments || comments.length === 0) && (
           <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
              <MessageSquare className="w-8 h-8" />
              <p className="text-[10px] font-black uppercase tracking-widest">No Active Discussions</p>
           </div>
        )}

        {isError && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 text-destructive/60">
               <X className="w-8 h-8" />
               <p className="text-[10px] font-black uppercase tracking-widest">Connection Refused</p>
               <p className="text-[9px] font-medium max-w-[200px]">Verify infrastructure scopes and regional endpoint accessibility.</p>
            </div>
        )}
      </div>

      <div className="p-6 border-t border-white/5 bg-white/[0.02]">
        <div className="relative">
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add to the conversation..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-sm font-medium focus:border-primary/50 outline-none transition-all resize-none h-24"
            disabled={mutation.isPending}
          />
          <Button 
            onClick={handleSend}
            disabled={!comment.trim() || mutation.isPending}
            size="icon"
            className="absolute bottom-4 right-4 rounded-xl w-10 h-10 shadow-lg shadow-primary/20"
          >
            {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </SheetContent>
  );
}
