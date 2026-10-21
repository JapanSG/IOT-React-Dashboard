import { z } from "zod";

export const addTempSchema = z.object({
  value: z.number(),
  unit: z.enum(["C", "F"])
});

export const getTempSchema = z.object({
  minute: z.coerce.number().min(0).optional(),
});