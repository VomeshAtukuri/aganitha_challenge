import { pgTable, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  code: varchar("code", { length: 8 }).primaryKey(),
  url: varchar("url", { length: 2048 }).notNull(),
  clicks: integer("clicks").default(0),
  lastClicked: timestamp("last_clicked"),
  createdAt: timestamp("created_at").defaultNow(),
});
