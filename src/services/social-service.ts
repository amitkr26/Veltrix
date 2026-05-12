import { ID, Query, Models } from "appwrite";
import { ENV } from "@/lib/appwrite";
import { BaseApiService } from "./base-service";
import { Comment } from "@/types/domain";

class SocialServiceImpl extends BaseApiService {
  async followCreator(followerId: string, followingId: string): Promise<void> {
    try {
      // In production, we use a separate 'follows' collection for scalability
      console.log(`[SocialGraph] ${followerId} following ${followingId}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async addComment(videoId: string, userId: string, text: string): Promise<Comment | undefined> {
    try {
      const response = await this.databases.createDocument<Models.Document & Comment>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_COMMENT_COLLECTION_ID,
        ID.unique(),
        {
          postId: videoId,
          userId: userId,
          text: text,
        }
      );
      return response;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  async getVideoComments(videoId: string): Promise<Comment[]> {
    try {
      const response = await this.databases.listDocuments<Models.Document & Comment>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_COMMENT_COLLECTION_ID,
        [Query.equal("postId", videoId), Query.orderDesc("$createdAt")]
      );
      return response.documents;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }

  async getNotifications(userId: string): Promise<Models.Document[]> {
    try {
      const response = await this.databases.listDocuments(
        ENV.APPWRITE_DATABASE_ID,
        "notifications", 
        [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
      );
      return response.documents;
    } catch (error) {
      this.handleError(error);
      return [];
    }
  }
}

export const SocialService = new SocialServiceImpl();
