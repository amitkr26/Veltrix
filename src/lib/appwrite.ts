import { Client, Account, Databases, Storage, Avatars } from "appwrite";

// Production Infrastructure Identifiers
export const ENV = {
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1",
  APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
  APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
  APPWRITE_VIDEO_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID || "",
  APPWRITE_USER_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || "",
  APPWRITE_COMMENT_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID || "",
  APPWRITE_SOCIAL_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_SOCIAL_COLLECTION_ID || "",
  APPWRITE_NOTIFICATIONS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID || "",
  APPWRITE_BOOKMARKS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID || "",
  APPWRITE_REPORTS_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_REPORTS_COLLECTION_ID || "",
  APPWRITE_STORAGE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || "",
};

// Singleton client instance
export const client = new Client();

// Only initialize if we have a project ID to prevent build-time crashes
if (ENV.APPWRITE_PROJECT_ID) {
    client
        .setEndpoint(ENV.APPWRITE_ENDPOINT)
        .setProject(ENV.APPWRITE_PROJECT_ID);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
