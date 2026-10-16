import db from '../db/db.js';
import { desc } from 'drizzle-orm';
import { temperatures } from '../db/schema.js';

export const getTemperatures = async (num: number) => {
  const result = await db.select().from(temperatures).orderBy(desc(temperatures.created_at)).limit(num);
  return result;
}

export const addTemperature = async (value: number, unit: string) => {
  const result = await db.insert(temperatures).values({value}).returning();
  return result;
}