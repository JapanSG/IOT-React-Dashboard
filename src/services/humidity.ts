import db from '../db/db.js';
import { desc , gte, sql} from 'drizzle-orm';
import { humidity } from '../db/schema.js';

export const getHumidity = async (minute: number) => {
  const result = await
  db.select()
  .from(humidity)
  .where(gte(humidity.created_at, sql`now() - ${minute} * interval '1 minute'`))
  .orderBy(desc(humidity.created_at));
  return result;
}

export const addHumidity = async (value: number) => {
  const result = await db.insert(humidity).values({value}).returning();
  return result;
}