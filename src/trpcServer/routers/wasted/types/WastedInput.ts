import { Wasted } from "@prisma/client";
import { z } from "zod";

let x: Wasted;

export const wastedInputSchema = z.object({
  id: z.string().optional(),
  datetime: z.string().datetime(),
  minutes: z.number(),
});

export type WastedInput = z.infer<typeof wastedInputSchema>;

export const buildWastedInput = (p?: Partial<WastedInput>): WastedInput => ({
  datetime: new Date().toISOString(),
  minutes: 0,
  ...p,
});
