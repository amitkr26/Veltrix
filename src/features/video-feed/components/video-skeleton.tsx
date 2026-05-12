"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function VideoSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto rounded-[2rem] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex items-center gap-2 px-6">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="px-6 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <VideoSkeleton key={i} />
      ))}
    </div>
  );
}
