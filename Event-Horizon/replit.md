# Pranora Production - Event Management Portfolio

## Overview

Pranora Production is a portfolio website for an Indian event management company. The application showcases past events (weddings, corporate events, social celebrations), team members, and provides a contact form for potential clients. It's built as a full-stack TypeScript application with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and scroll animations
- **Build Tool**: Vite

The frontend follows a pages-based structure with shared components. Key pages include Home, Events (portfolio), Event Details, About, and Contact. Custom hooks (`use-events.ts`, `use-team.ts`) encapsulate data fetching logic with React Query.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development
- **API Design**: RESTful endpoints defined in `shared/routes.ts` as a typed API contract
- **Database ORM**: Drizzle ORM with PostgreSQL

The server uses a storage abstraction layer (`server/storage.ts`) that implements database operations. Routes are registered in `server/routes.ts` and follow the API contract defined in shared types.

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM
- **Tables**: 
  - `events` - stores event information (title, description, date, location, imageUrl, category)
  - `team_members` - stores team member profiles (name, role, bio, imageUrl)
- **Migrations**: Managed via Drizzle Kit (`drizzle-kit push`)

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Database schema and Zod validation schemas
- `routes.ts` - API contract with path definitions and response types

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Custom build script (`script/build.ts`) that:
  - Builds frontend with Vite
  - Bundles server with esbuild, selectively bundling common dependencies

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- `pg` package for database connection pooling
- `connect-pg-simple` for session storage (available but not currently used)

### UI Components
- shadcn/ui component library (Radix UI primitives)
- Full component set including dialogs, forms, navigation, and data display components
- Custom theming with CSS variables for colors (deep navy primary, gold/champagne secondary)

### External Assets
- Google Fonts: Cormorant Garamond (display), Montserrat (body)
- Pexels images for event and hero photography

### Development Tools
- Replit-specific Vite plugins for development (cartographer, dev-banner, error overlay)
- TypeScript with strict mode
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)