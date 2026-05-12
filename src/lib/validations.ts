import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Video Schemas
export const videoCreateSchema = z.object({
  title: z.string().min(3, "Title too short").max(100, "Title too long"),
  prompt: z.string().min(10, "Provide a more detailed prompt").max(1000),
  videoUrl: z.string().url("Invalid video URL"),
  thumbnailUrl: z.string().url("Invalid thumbnail URL"),
});

// File Validation Constants
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
