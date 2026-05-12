import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID: z.string().min(1),
});

export const validateEnv = () => {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID,
  });

  if (!parsed.success) {
    if (process.env.NODE_ENV === "production") {
        console.error(
            "❌ Invalid environment variables:",
            parsed.error.flatten().fieldErrors
        );
        // During real production runtime, we might want to throw, 
        // but during build we should be careful.
        // For now, let's just log loudly.
    } else {
        console.warn(
            "⚠️ Missing environment variables for local development:",
            parsed.error.flatten().fieldErrors
        );
    }
  }

  return parsed.data;
};
