import db from '../db/db.js';
import { desc, gte, sql } from 'drizzle-orm';
import { temperatures } from '../db/schema.js';

export const getTemperatures = async (minute: number) => {
  const result = await 
  db.select()
  .from(temperatures)
  .where(gte(temperatures.created_at, sql`now() - ${minute} * interval '1 minute'`))
  .orderBy(desc(temperatures.created_at));
  return result;
}

export const addTemperature = async (value: number, unit: string) => {
  const result = await db.insert(temperatures).values({value}).returning();
  return result;
}