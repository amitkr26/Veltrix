import { Query, Models } from "appwrite";
import { ENV } from "@/lib/appwrite";
import { BaseApiService } from "./base-service";
import { Creator, Video } from "@/types/domain";

class CreatorServiceImpl extends BaseApiService {
  async getCreatorProfile(userId: string): Promise<Creator | null> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Creator>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_USER_COLLECTION_ID,
        [Query.equal("accountId", userId)]
      );
      return response.total > 0 ? response.documents[0] : null;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCreatorVideos(creatorId: string): Promise<Video[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        [Query.equal("creator", creatorId)]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCreatorAnalytics(creatorId: string) {
    return {
      totalViews: 0,
      totalLikes: 0,
      followerGrowth: 0,
      engagementRate: "0%",
    };
  }

  async getTrendingCreators(): Promise<Creator[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Creator>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_USER_COLLECTION_ID,
        [Query.limit(10)]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const CreatorService = new CreatorServiceImpl();
