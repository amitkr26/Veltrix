import { ID, Query, Models } from "appwrite";
import { ENV } from "@/lib/appwrite";
import { BaseApiService } from "./base-service";
import { User } from "@/types/domain";

class AuthServiceImpl extends BaseApiService {
  async register(email: string, password: string, username: string): Promise<User> {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );

      const avatarUrl = this.avatars.getInitials(username).toString();

      await this.login(email, password);

      const newUser = await this.databases.createDocument<Models.Document & User>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_USER_COLLECTION_ID,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          username,
          avatar: avatarUrl,
        }
      );

      return newUser;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async login(email: string, password: string): Promise<Models.Session> {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const currentAccount = await this.account.get();
      if (!currentAccount) return null;

      const userDocs = await this.databases.listDocuments<Models.Document & User>(
        ENV.APPWRITE_DATABASE_ID,
        ENV.APPWRITE_USER_COLLECTION_ID,
        [Query.equal("accountId", currentAccount.$id)]
      );

      if (userDocs.total === 0) return null;

      return userDocs.documents[0];
    } catch (error) {
      return null; // Silent fail for session checks is often preferred
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export const AuthService = new AuthServiceImpl();
