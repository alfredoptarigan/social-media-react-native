import { UserCollection } from "./user";

export interface VideoCollection {
  id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  creator: UserCollection;
}
