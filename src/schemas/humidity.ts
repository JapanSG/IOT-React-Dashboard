import { z } from "zod";

export const addHumidSchema = z.object({
  value: z.number().min(0).max(100),
});

export const getHumidSchema = z.object({
  minute: z.coerce.number().min(0).optional(),
});