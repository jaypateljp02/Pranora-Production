import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.events.list.path, async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  });

  app.get(api.team.list.path, async (_req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  // Seed data function
  // TODO: Seeding on serverless startup causes timeouts. 
  // Should be moved to a dedicated script or triggered manually.
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Failed to seed database:", error);
  }

  return httpServer;
}

async function seedDatabase() {
  console.log("Starting database seed check...");
  const existingEvents = await storage.getEvents();
  console.log(`Found ${existingEvents.length} existing events.`);

  // Clean up old unsplash data if it exists to force refresh with pexels
  if (existingEvents.some(e => e.imageUrl.includes('unsplash.com'))) {
    // In-memory or DB storage - if DB, we might want to clear it
    // For this implementation, we'll just check if we need to add/update
  }

  if (!existingEvents.some(e => e.title === "Grandeur Delhi Wedding Celebration")) {
    const events = [
      {
        title: "Grandeur Delhi Wedding Celebration",
        description: "A magnificent wedding ceremony with 500+ guests, featuring intricate floral arrangements, live Hindustani classical music, and authentic Indian cuisine at the opulent Indra Ballroom.",
        date: new Date("2024-03-15"),
        location: "Indra Ballroom, Delhi",
        imageUrl: "https://images.pexels.com/photos/3350141/pexels-photo-3350141.jpeg?auto=compress&cs=tinysrgb&w=1600",
        categoryId: "Wedding",
        category: "Wedding",
        gallery: [
          "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2291462/pexels-photo-2291462.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      {
        title: "TechInnovate Mumbai Summit 2024",
        description: "A premier tech innovation summit bringing together 1000+ industry leaders, entrepreneurs, and investors from across India for keynote speeches, workshops, and networking.",
        date: new Date("2024-02-28"),
        location: "The Gateway Hotel, Mumbai",
        imageUrl: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600",
        category: "Corporate",
        gallery: [
          "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      {
        title: "Bangalore Brand Launch Gala",
        description: "An exclusive product launch event for a luxury fashion brand featuring live performances, interactive installations, and high-profile celebrity attendees.",
        date: new Date("2024-01-20"),
        location: "Vibrant Event Space, Bangalore",
        imageUrl: "https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1600",
        category: "Corporate",
        gallery: [
          "https://images.pexels.com/photos/3025584/pexels-photo-3025584.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      },
      {
        title: "Destination Wedding Goa",
        description: "A romantic beachside wedding blending traditional Indian ceremonies with contemporary beach elegance, complete with sunset celebrations and oceanfront dining.",
        date: new Date("2023-12-10"),
        location: "Taj Exotica Resort, Goa",
        imageUrl: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1600",
        category: "Wedding",
        gallery: [
          "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/2253835/pexels-photo-2253835.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
      }
    ];

    for (const event of events) {
      await storage.createEvent(event);
    }

    const team = [
      {
        name: "Omkar Suresh Nage",
        role: "Founder & Lead Event Planner",
        bio: "With 15+ years in event management, Omkar is the creative force behind Pranora Production's stunning celebrations across India.",
        imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        name: "Priya Sharma",
        role: "Creative Director & Designer",
        bio: "Priya transforms visions into reality with her exceptional eye for aesthetics and deep understanding of cultural nuances in event design.",
        imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        name: "Amit Patel",
        role: "Operations & Logistics Manager",
        bio: "Amit ensures every event runs flawlessly with meticulous planning, vendor coordination, and attention to every detail.",
        imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ];

    for (const member of team) {
      await storage.createTeamMember(member);
    }
    console.log("Database seeded with Indian events and team!");
  } else {
    console.log("Database already has Indian data, skipping seed.");
  }
}
