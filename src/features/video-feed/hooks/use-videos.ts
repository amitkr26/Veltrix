"use client";

import { useQuery } from "@tanstack/react-query";
import { VideoService } from "@/services/video-service";

export function useVideos(type: string = "for-you") {
  return useQuery({
    queryKey: ["videos", type],
    queryFn: async () => {
      try {
        const videos = await VideoService.getAllVideos();
        // Zero-tolerance for mock data. Return empty state if DB is empty.
        return videos;
      } catch (error) {
        console.error("[VideoFeed] Production fetch failed:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
