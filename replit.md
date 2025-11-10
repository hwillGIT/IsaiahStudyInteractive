# Isaiah Interactive Study - Chapters 1-12

## Overview

This interactive web application facilitates the study of Isaiah Chapters 1-12, known as the "Book of Immanuel." It features a color-coded grid visualization of verses grouped thematically, with interactive hover tooltips and transformation point markers. The application provides a two-level modal navigation system for both reflective study (through "Seeing Connections," "How This Helps My Life," and "What This Teaches Us" modes) and "Scripture Connections," which illustrate how each verse integrates into the broader biblical narrative. Built with React, TypeScript, Tailwind CSS, React Router, and an Express backend API, it offers an engaging educational experience across 12 chapters, complete with detailed reflections and inter-biblical connections. A dedicated home page includes chapter navigation cards and educational modals explaining the book's structure and app usage.

**Completed Chapters**:
- Chapter 1 (31 verses): The Rebellious Nation and the Invitation to Return
- Chapter 2 (22 verses): God's Mountain, Idolatry, and the Day of the LORD
- Chapter 3 (25 verses): Judgment on Leaders and Pride
- Chapter 4 (6 verses): The Branch of the LORD and God's Return
- Chapter 5 (30 verses): The Song of the Vineyard and Six Woes
- Chapter 6 (13 verses): Encountering God's Holiness and Divine Commissioning
- Chapter 7 (25 verses): The Sign of Immanuel - God With Us
- Chapter 8 (22 verses): Sanctuary or Stumbling Stone
- Chapter 9 (21 verses): The Light in the Darkness and the Prince of Peace
- Chapter 10 (34 verses): Assyria: God's Rod and the Remnant's Return
- Chapter 11 (16 verses): The Messiah's Reign and the Peaceable Kingdom
- Chapter 12 (6 verses): Song of Thanksgiving and Praise

## Recent Changes

**November 10, 2025 (Production Deployment Fix)**: **UNIFIED SERVER ARCHITECTURE** - Consolidated Express server to serve both the API and built React frontend for production deployment. The server now serves static files from the `dist` directory and handles React Router's client-side navigation with a catch-all route. Changed port binding to use `process.env.PORT` for Replit's VM deployment. Updated deployment configuration to use `vm` deployment target with `npm start` command. This enables the app to run as a single unified process in production with both frontend and backend operational.

**November 10, 2025**: **MAJOR ARCHITECTURE REFACTORING** - Migrated all chapter content from hardcoded arrays to backend API. Created Express server (`server/index.ts`) serving JSON files (`server/data/chapter1.json` through `chapter12.json`) with in-memory caching. All 12 chapters now fetch data via `useChapterData` hook from `src/hooks/useChapterData.ts`. Created shared utilities (`src/utils/chapterHelpers.ts`) for color classes and hinge type extraction. Extracted all structure modals into separate components (`Chapter1StructureModal.tsx` through `Chapter12StructureModal.tsx`). This separation of content from presentation enables easier content updates, consistent data structure, and potential future features like search, bookmarking, or user notes. Both workflows (Backend API Server on port 3001, Frontend on port 5000) run concurrently with Vite proxy forwarding `/api` requests to backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript for type safety and a component-based UI. State is managed locally using React hooks, and React Router DOM handles navigation.
**Build Tool**: Vite 6, chosen for its fast development server and optimized builds.
**Styling**: Tailwind CSS for rapid, utility-first development and consistent design, supplemented by custom CSS for specific elements.

### Data Architecture

**Backend API Server**: An Express server (`server/index.ts`) serves chapter data from JSON files (`server/data/chapterN.json`) with in-memory caching. Endpoints include `GET /api/chapters/:id` for specific chapter data and `GET /health`. Each chapter JSON adheres to a defined contract including `chapterNumber`, `title`, `subtitle`, `structureSubtitle`, `verses`, `reflections`, and `scriptureConnections`. Verses may include optional `isHinge` and `hingeType` properties for transformation point markers.
**Frontend Data Layer**: A custom React hook `useChapterData(chapterNumber)` fetches chapter data. Shared utility functions are located in `src/utils/chapterHelpers.ts`. Chapter components manage loading, error states, and chapter-specific metadata functions.
**Interaction Patterns**: Verse selection opens a modal with two-level navigation. Users can switch between Reflection and Scripture Connection tabs and various reflection modes. Hover tooltips provide quick verse previews, and yellow dots highlight key transformation points.

### User Interface Design

**Layout**: Multi-chapter application utilizing React Router for navigation between chapters and a two-level modal system for detailed verse views.
**Visual Theme**: A clean, modern design featuring a purple gradient background with white/light gray content cards, focused on readability. Interactive elements include hover states and smooth transitions.
**Responsive Design**: Flexible grid and flexbox layouts with CSS auto-fit and centered max-width containers ensure mobile compatibility.
**Legend Design Pattern**: Thematic group legends utilize a clean, compact grid layout with color chips and inline numbering for clarity, avoiding academic jargon or obtrusive icons.
**Home Page Educational Modals**: Two full-screen modals ("Understanding the Book of Isaiah" and "How to Use This Study App") provide contextual information and app tutorials, designed with a scholarly framework translated into everyday language.

## External Dependencies

**Frontend Runtime Dependencies**:
- `react` (^18.3.1): Core UI library
- `react-dom` (^18.3.1): React DOM renderer
- `react-router-dom`: Client-side routing between chapters
- `clsx`: Conditional class name utility
- `tailwind-merge`: Tailwind CSS class merger

**Backend Runtime Dependencies**:
- `express`: Web server framework for API endpoints
- `cors`: Enable cross-origin requests from frontend
- `ts-node`, `tsx`: TypeScript execution for backend server
- `@neondatabase/serverless`: PostgreSQL database driver (future use)
- `drizzle-orm`: TypeScript ORM for database (future use)

**Development Dependencies**:
- `TypeScript` (~5.6.2): Static type checking
- `@vitejs/plugin-react` (^4.3.4): Vite plugin for React
- `@types/react`, `@types/react-dom`, `@types/express`, `@types/cors`, `@types/node`, `@types/ws`: TypeScript definitions
- `vite` (^6.0.3): Build tool and development server
- `tailwindcss`: Utility-first CSS framework
- `autoprefixer`, `postcss`: CSS processing tools
- `drizzle-kit`: Database migration tool (future use)

## Deployment Configuration

**Development Workflows**:
1. **Backend API Server**: `npm run server` - Express server on port 3001
2. **Isaiah 6 Study App**: `npm run dev` - Vite frontend on port 5000 with proxy to backend

**Vite Proxy Configuration** (`vite.config.ts`): All `/api` requests forwarded to `http://localhost:3001` to connect frontend with backend during development.

**Production Deployment**:
- **Deployment Target**: VM (always-on server)
- **Build Command**: `npm run build` - Compiles TypeScript and builds Vite frontend to `dist/`
- **Start Command**: `npm start` - Runs unified Express server serving both API and built frontend
- **Port Binding**: Server binds to `process.env.PORT` (Replit-assigned) or falls back to 3001
- **Static File Serving**: Express serves built React app from `dist/` directory
- **React Router Support**: Catch-all route ensures client-side routing works in production