import { integer, real, pgTable, text , date} from "drizzle-orm/pg-core";

export const temperatures = pgTable("temperatures", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  value: real("value").notNull(),
  unit: text("unit").notNull(),
  created_at: date("created_at").notNull().defaultNow()
});

export type Temperature = typeof temperatures.$inferSelect;
export type NewTemperature = typeof temperatures.$inferInsert;