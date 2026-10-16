import { z } from "zod";

export const addTempSchema = z.object({
  value: z.number(),
  unit: z.enum(["C", "F"])
});

export const getTempSchema = z.object({
  num: z.number().min(1).max(100).optional(),
});