"use client";

import { useQuery } from "@tanstack/react-query";
import { CreatorService } from "@/services/creator-service";

export function useTrendingCreators() {
  return useQuery({
    queryKey: ["creators", "trending"],
    queryFn: async () => {
      try {
        return await CreatorService.getTrendingCreators();
      } catch (error) {
        console.error("[Creators] Failed to fetch production creators:", error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000,
  });
}
