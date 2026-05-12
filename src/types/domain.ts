export interface Creator {
  $id: string;
  username: string;
  avatar: string;
  bio?: string;
  isVerified?: boolean;
}

export interface Video {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
  creator: Creator | string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: string;
}

export interface User {
  $id: string;
  accountId: string;
  email: string;
  username: string;
  avatar: string;
  bio?: string;
}

export interface Comment {
  $id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt?: string;
}

export type AuthType = "login" | "signup";
