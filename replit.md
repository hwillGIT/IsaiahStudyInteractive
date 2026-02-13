# Isaiah Interactive Study - Chapters 1-55

## Overview

This interactive web application facilitates the study of Isaiah Chapters 1-55, covering First Isaiah (Book of Immanuel, Oracles Against Nations, Isaiah Apocalypse, Woe Oracles, Historical Narrative) and Second Isaiah (Comfort and Redemption). It features a color-coded grid visualization of verses grouped thematically, with interactive hover tooltips and transformation point markers. The application provides a two-level modal navigation system for both reflective study (through "Seeing Connections," "How This Helps My Life," and "What This Teaches Us" modes) and "Scripture Connections," which illustrate how each verse integrates into the broader biblical narrative. Built with React, TypeScript, Tailwind CSS, React Router, and an Express backend API, it offers an engaging educational experience across 55 chapters, complete with detailed reflections and inter-biblical connections. A dedicated home page includes chapter navigation cards organized by section and educational modals explaining the book's structure and app usage.

**Completed Chapters (55 total)**:
- **The Book of Immanuel (Chapters 1-12)**: From God's covenant lawsuit through the Prince of Peace to songs of thanksgiving
- **Oracles Against the Nations (Chapters 13-23)**: Babylon, Philistia, Moab, Damascus, Cush, Egypt, Edom, Arabia, Jerusalem, Tyre
- **The Isaiah Apocalypse (Chapters 24-27)**: Cosmic judgment, praise for salvation, songs of trust, Israel's deliverance
- **Woe Oracles (Chapters 28-33)**: Warnings against leaders, Jerusalem, obstinate nation, reliance on Egypt
- **Judgment, Hope, and Historical Narrative (Chapters 34-39)**: Edom's judgment, the ransomed return, Sennacherib's threat, Hezekiah's prayer/illness, Babylonian envoys
- **Second Isaiah: Comfort and Redemption (Chapters 40-55)**: Comfort my people, Servant Songs, Cyrus, fall of Babylon, suffering servant, everlasting invitation

**Third Isaiah (Chapters 56-66)**: Deferred for future work.

## Recent Changes

**February 13, 2026 (Structure Modals for Chapters 13-55)**: **COMPLETE STRUCTURE MODALS** - Added `structureModal` data to all 43 chapter JSON files (13-55) with chiastic/concentric/linear literary pattern visualizations. Each structure modal includes title, subtitle, intro description, color-coded sections with labels and indentation, parallels explaining how mirroring sections connect, and closing summaries. Updated ChapterTemplate.tsx to render structure modals from JSON data with proper TypeScript types (StructureSection, StructureParallel, StructureModalData). All chapters now show the "View Chapter Structure" button matching the established pattern from chapters 1-12.

**February 13, 2026 (Chapters 13-55 Complete)**: **FULL FIRST AND SECOND ISAIAH** - Created all 43 new chapter JSON files (13-55) with complete content: NIV verse texts, thematic groups with metadata, transformation points, three-part reflections for every verse, and scripture connections. Updated home page with section-organized chapter cards (6 color-coded sections) and redesigned ChapterNavigation with collapsible section groups for 55 chapters.

**February 11, 2026 (Dynamic Chapter Support)**: **UNLOCKING CHAPTERS BEYOND 12** - Implemented A1/A2/A3/A4 changes to support adding chapters beyond 12 without code changes:
- **A1 - Backend**: Server now dynamically scans `server/data/` for chapter JSON files instead of hardcoding 1-12. Added `GET /api/chapters` endpoint returning available chapters list with metadata.
- **A2 - JSON Data Contract**: Extended all 12 chapter JSON files with `theme`, `groupMetadata` (group names/transitions), `hingeMetadata` (explanations/colors), and `structureModal` (null for existing chapters) fields.
- **A3 - ChapterTemplate**: Created reusable `src/isaiah/components/ChapterTemplate.tsx` that renders any chapter from JSON data alone, matching the full polished UI (color grid, modals, reflections, scripture connections, hover tooltips, transformation points).
- **A4 - Dynamic Routing**: Added `/chapter/:chapterNumber` route via `ChapterDynamic.tsx` that routes to custom components for chapters 1-12 and ChapterTemplate for 13+. Updated `ChapterNavigation` with dynamic `maxChapter` prop. All existing `/chapter-N` routes preserved for backward compatibility.
- **To add a new chapter**: Simply create `server/data/chapter13.json` (following the established data contract) and restart the server. No code changes needed.

**November 10, 2025 (Multi-App File Structure)**: **PROJECT REORGANIZATION FOR SCALABILITY** - Reorganized file structure to support hosting multiple apps on a single VM deployment. Created `docs/` folder for all documentation and examples. Restructured `src/` to separate app-specific code from shared utilities:
- `src/isaiah/` - All Isaiah app code (chapters/, components/, hooks/, utils/, App.tsx, App.css, main.tsx)
- `src/shared/` - Shared utilities and components usable across future apps (lib/)
- `src/main.tsx` - Root entry point that bootstraps individual apps
- Files use relative imports, so no path updates needed
- Vite `@` alias still points to `./src` for convenience
This structure enables adding future apps under `src/<app-name>/` with independent main.tsx files while sharing common utilities. All apps would be served from the same Express server via hostname-based routing or URL paths.

**November 10, 2025 (Secure Content Deployment)**: **UNIFIED SERVER ARCHITECTURE** - Configured for VM deployment to protect content from easy extraction. Express server serves both the API (with chapter data on server) and the built React frontend. Content remains secure on the backend, accessible only through API endpoints. Port binding uses `process.env.PORT` for Replit's deployment. This architecture ensures study content is not exposed in browser-accessible JavaScript bundles.

**November 10, 2025**: **MAJOR ARCHITECTURE REFACTORING** - Migrated all chapter content from hardcoded arrays to backend API. Created Express server (`server/index.ts`) serving JSON files (`server/data/chapter1.json` through `chapter12.json`) with in-memory caching. All 12 chapters now fetch data via `useChapterData` hook from `src/isaiah/hooks/useChapterData.ts`. Created shared utilities (`src/isaiah/utils/chapterHelpers.ts`) for color classes and hinge type extraction. Extracted all structure modals into separate components (`Chapter1StructureModal.tsx` through `Chapter12StructureModal.tsx`). This separation of content from presentation enables easier content updates, consistent data structure, and potential future features like search, bookmarking, or user notes. Both workflows (Backend API Server on port 3001, Frontend on port 5000) run concurrently with Vite proxy forwarding `/api` requests to backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Project File Structure (Multi-App)

**Organization for Scalability**: The project is structured to host multiple apps on a single VM deployment ($20/month) with the following organization:

```
project-root/
├── docs/                           # All documentation and examples
│   ├── examples/                   # Example code and demos
│   └── *.md                        # Architecture docs and guides
├── server/                         # Backend Express server
│   ├── data/                       # JSON data files per app
│   │   └── isaiah/                 # Isaiah app data
│   └── index.ts                    # Unified server for all apps
├── src/                            # Frontend source code
│   ├── main.tsx                    # Root entry point (bootstraps apps)
│   ├── index.css                   # Global styles
│   ├── isaiah/                     # Isaiah app (example)
│   │   ├── chapters/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx                # Isaiah app component export
│   └── shared/                     # Shared utilities across apps
│       └── lib/                    # Utility functions (cn, etc.)
└── dist/                           # Production build output
```

**Adding Future Apps**:
1. Create new folder under `src/<app-name>/` with its own App.tsx, main.tsx, components/, etc.
2. Update `src/main.tsx` to import and conditionally render the new app
3. Add app data to `server/data/<app-name>/`
4. Update Express server to handle new app routes (hostname-based or URL path-based)
5. Both apps republish together on the same VM (no downtime during republish)
6. Use custom domain with subdomains for different app URLs (e.g., `isaiah.yourdomain.com`, `other.yourdomain.com`)

**Benefits of Multi-App Structure**:
- Single $20/month VM hosts multiple apps (vs. $20 per app on separate VMs)
- Shared utilities and components in `src/shared/` reduce code duplication
- All apps update together during republish (no downtime)
- Clean separation between app-specific code and shared infrastructure

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
- **Deployment Target**: VM (always-on server, $20/month)
- **Build Command**: `npm run build` - Compiles TypeScript and builds Vite frontend to `dist/`
- **Start Command**: `npm start` - Runs unified Express server serving both API and built frontend
- **Port Binding**: Server binds to `process.env.PORT` (Replit-assigned) or falls back to 3001
- **Data Security**: Chapter content stays on server, served only through API endpoints
- **Static File Serving**: Express serves built React app from `dist/` directory
- **React Router Support**: Catch-all route ensures client-side routing works in production
- **Cost Note**: $20/month covered by Replit Core credits ($25/month)