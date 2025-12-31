import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // e.g., Wedding, Corporate, Social
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
});

// === BASE SCHEMAS ===
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

// Request types
export type CreateEventRequest = InsertEvent;
export type CreateTeamMemberRequest = InsertTeamMember;

// Response types
export type EventResponse = Event;
export type TeamMemberResponse = TeamMember;
