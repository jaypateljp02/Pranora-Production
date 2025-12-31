import { db } from "./db";
import {
  events,
  teamMembers,
  type Event,
  type TeamMember,
  type InsertEvent,
  type InsertTeamMember
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
}

export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private teamMembers: Map<number, TeamMember>;
  private eventId: number;
  private teamMemberId: number;

  constructor() {
    this.events = new Map();
    this.teamMembers = new Map();
    this.eventId = 1;
    this.teamMemberId = 1;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.teamMemberId++;
    const member: TeamMember = { ...insertMember, id };
    this.teamMembers.set(id, member);
    return member;
  }
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<Event[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(events).orderBy(events.date);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    if (!db) throw new Error("Database not initialized");
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(teamMembers);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    if (!db) throw new Error("Database not initialized");
    const [member] = await db.insert(teamMembers).values(insertMember).returning();
    return member;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
