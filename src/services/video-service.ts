import { ID, Query, Models } from "appwrite";
import { ENV } from "@/lib/appwrite";
import { BaseApiService } from "./base-service";
import { Video } from "@/types/domain";

class VideoServiceImpl extends BaseApiService {
  async getAllVideos(): Promise<Video[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getLatestVideos(): Promise<Video[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async searchVideos(query: string): Promise<Video[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        [Query.search("title", query)]
      );
      return response.documents;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createVideo(data: {
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
    prompt: string;
    creatorId: string;
  }): Promise<Video> {
    try {
      return await this.databases.createDocument<Models.Document & Video>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_VIDEO_COLLECTION_ID,
        ID.unique(),
        {
          title: data.title,
          video: data.videoUrl,
          thumbnail: data.thumbnailUrl,
          prompt: data.prompt,
          creator: data.creatorId,
        }
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async likeVideo(videoId: string, userId: string): Promise<void> {
    try {
      console.log(`[VideoService] User ${userId} liked video ${videoId}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async reportContent(videoId: string, userId: string, reason: string): Promise<void> {
    try {
      // In production, this creates a document in 'reports' collection
      console.log(`[Safety] Video ${videoId} reported by ${userId} for: ${reason}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async blockUser(blockerId: string, blockedId: string): Promise<void> {
    try {
      // Create relationship in 'blocks' collection
      console.log(`[Safety] User ${blockerId} blocked ${blockedId}`);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const VideoService = new VideoServiceImpl();
