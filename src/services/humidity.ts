import db from '../db/db.js';
import { desc } from 'drizzle-orm';
import { humidity } from '../db/schema.js';

export const getHumidity = async (num: number) => {
  const result = await db.select().from(humidity).orderBy(desc(humidity.created_at)).limit(num);
  return result;
}

export const addHumidity = async (value: number) => {
  const result = await db.insert(humidity).values({value}).returning();
  return result;
}