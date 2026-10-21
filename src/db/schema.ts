import { integer, real, pgTable, text , date} from "drizzle-orm/pg-core";

export const temperatures = pgTable("temperatures", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  value: real("value").notNull(),
  created_at: date("created_at").notNull().defaultNow()
});

export const humidity = pgTable("humidity", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  value: real("value").notNull(),
  created_at: date("created_at").notNull().defaultNow()
});

export type Temperature = typeof temperatures.$inferSelect;
export type NewTemperature = typeof temperatures.$inferInsert;
export type Humidity = typeof humidity.$inferSelect;
export type NewHumidity = typeof humidity.$inferInsert