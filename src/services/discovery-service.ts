import { Query, Models } from "appwrite";
import { ENV } from "@/lib/appwrite";
import { BaseApiService } from "./base-service";
import { Video } from "@/types/domain";

class DiscoveryServiceImpl extends BaseApiService {
  async getTrendingVideos(): Promise<Video[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        [Query.orderDesc("likesCount"), Query.limit(10)]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPersonalizedFeed(_userId: string): Promise<Video[]> {
    try {
      // In production, we utilize the _userId to fetch affinity-based content
      return await this.getTrendingVideos(); 
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getVideosByCategory(category: string): Promise<Video[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        [Query.equal("category", category)]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const DiscoveryService = new DiscoveryServiceImpl();
