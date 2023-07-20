import { FavoritePayload } from "@prisma/client";
import { z } from "zod";
import { FavoriteOutput } from "./FavoriteOutput";

let x: FavoritePayload;

/**
 *  id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    url: string
    clickCount: number
    title: string
    thumbnail: string
 */

export const favoriteInputSchema = z.object({
  id: z.string().optional(),
  url: z.string().trim().url().includes("http"),
  title: z.string(),
  thumbnail: z.string(),
  clickCount: z.number(),
});

export type FavoriteInput = z.infer<typeof favoriteInputSchema>;

export const buildFavoriteInput = (
  p?: Partial<FavoriteInput>
): FavoriteInput => ({
  url: "",
  title: "",
  thumbnail: "",
  clickCount: 0,
  ...p,
});

export const favoriteOutputToInput = (
  favoriteOutput: FavoriteOutput
): FavoriteInput => ({
  ...favoriteOutput,
});
