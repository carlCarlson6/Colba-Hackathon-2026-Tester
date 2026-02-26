import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recievedRequestsTable = sqliteTable("RecievedRequests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  requestText: text("request_text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const requestLoopsTable = sqliteTable("RequestLoops", {
  id: text("id").primaryKey(),
});