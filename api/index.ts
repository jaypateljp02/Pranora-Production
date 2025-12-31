import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Middleware setup copied from server/index.ts
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
// We need to wait for routes to be registered, but top-level await might not be supported in all environments 
// without proper config. However, Vercel supports it.
// If not, we can wrap the export.
// The registerRoutes function returns httpServer, we don't need it for serverless but we need the side effects on app.

// Initialize routes and seeding
const initPromise = registerRoutes(httpServer, app);

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
});

export default async function handler(req: Request, res: Response) {
    try {
        await initPromise;
        app(req, res);
    } catch (error) {
        console.error("API Initialization Error:", error);
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            message: "Internal Server Error during initialization",
            details: message
        });
    }
}
