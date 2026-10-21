import { z } from "zod";

export const addHumidSchema = z.object({
  value: z.number().min(0).max(100),
});

export const getHumidSchema = z.object({
  num: z.number().min(0).max(100).optional(),
});