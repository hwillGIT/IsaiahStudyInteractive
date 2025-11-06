# Isaiah 6 Interactive Study

## Overview

This is an interactive web application for studying Isaiah Chapter 6 from the Bible. The application features a color-coded grid visualization of all 13 verses organized into 6 thematic groups, with interactive hover tooltips and transformation point markers. A two-level modal navigation system provides both reflective study (three viewing modes: Seeing Connections, How This Helps My Life, What This Teaches Us) and Scripture Connections showing how each verse fits into God's larger plan across the entire Bible. Built with React, TypeScript, and Tailwind CSS, it offers an engaging educational experience for understanding Isaiah's vision of God's holiness and his prophetic commission.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript
- **Rationale**: Provides type safety and modern component-based architecture for building interactive UI
- **Component Structure**: Single App component with grid-based verse visualization and modal-based detail view
- **State Management**: Local component state using React hooks (useState) for verse selection, modal view, and reflection mode
- **Pros**: Simple state management adequate for current scope, easy to understand and maintain
- **Cons**: May need state management library (Redux, Zustand) if complexity grows

**Build Tool**: Vite 6
- **Rationale**: Fast development server with hot module replacement, optimized for React applications
- **Configuration**: Configured for host 0.0.0.0 on port 5000 for Replit compatibility
- **Pros**: Lightning-fast builds, excellent developer experience
- **Cons**: None for this use case

**Styling Approach**: Tailwind CSS with custom CSS for specific needs
- **Rationale**: Utility-first CSS framework provides rapid development and consistent design system
- **Global Styles**: Gradient background (blue to purple), base typography via Tailwind
- **Component Styles**: Inline utility classes with custom CSS for modal animations
- **Pros**: Fast iteration, consistent spacing/colors, built-in responsive design
- **Cons**: Verbose class names in JSX, requires build step

### Data Architecture

**Data Storage**: Static TypeScript data structures
- **Location**: Embedded in `src/App.tsx`
- **Structure**: 
  - `Verse` interface with number, text, group, hinge markers
  - `verses` array containing all 13 verses
  - `reflectionContent` object with three perspectives per verse (seeing, life, teach)
  - `scriptureConnections` object with FROM/TO references and theological context per verse
- **Rationale**: Content is static biblical text that doesn't change; no need for database
- **Pros**: Simple, type-safe, no backend required, fast load times
- **Cons**: Content updates require code changes and redeployment

**Interaction Patterns**:
- Verse selection triggers modal with two-level navigation
- Modal tab switching between Reflections and Scripture Connections
- Reflection mode buttons for switching between three viewing perspectives
- Hover tooltips for quick verse preview
- Yellow dots mark key transformation points

### User Interface Design

**Layout Pattern**: Single-page application with modal-based navigation
- **Problem**: Multiple views of the same content without page reloads
- **Solution**: Two-level modal navigation - first level tabs (Reflections vs Scripture Connections), second level buttons (viewing modes)
- **Alternatives**: Multi-page with routing (React Router)
- **Chosen Approach**: Simpler for small scope, no URL management needed

**Visual Theme**: Purple gradient background with white/light gray content cards
- **Design Language**: Clean, modern, focused on readability
- **Interactive Elements**: Hover states, click states, smooth transitions
- **Accessibility**: Color contrast, clickable areas, semantic HTML

**Responsive Design**: Flexible grid and flexbox layouts
- **Breakpoints**: CSS auto-fit grid for theme cards, centered max-width containers
- **Mobile Support**: Flex-wrap for navigation tabs, column layouts for verses

**Legend Design Pattern (Template)**:
- **Layout**: Grid (1 col mobile, 2 col tablet, 3 col desktop) with clean spacing
- **Visual Elements**: Small color chip (w-4 h-4) on left + text content on right
- **Sequence Indication**: Inline numbers in light gray ("1.", "2.", etc.) next to titles
- **Rationale**: Avoids academic "Group N" labels, no oversized icons, no confusing arrows
- **Reader Experience**: Numbers indicate sequence clearly without being obtrusive; color chips provide visual reference without dominating the content
- **This template should be maintained**: Clean, compact, and reader-friendly approach

## External Dependencies

### Runtime Dependencies

**react** (^18.3.1): Core UI library
- Purpose: Component rendering and state management
- Used throughout application for all UI components

**react-dom** (^18.3.1): React DOM renderer
- Purpose: Mounting React components to browser DOM
- Entry point in `src/main.tsx`

### Development Dependencies

**TypeScript** (~5.6.2): Type system for JavaScript
- Purpose: Static type checking, improved developer experience
- Configuration: Strict mode enabled, ES2020 target

**@vitejs/plugin-react** (^4.3.4): Vite plugin for React
- Purpose: Enable JSX transformation and fast refresh in Vite
- Integrated in `vite.config.ts`

**@types/react** & **@types/react-dom**: TypeScript definitions
- Purpose: Type definitions for React APIs

**vite** (^6.0.3): Build tool and development server
- Purpose: Development server, production builds, asset handling
- Custom configuration for Replit hosting environment

### No Backend Services

This application runs entirely client-side with no external API calls, databases, or authentication systems. All content is embedded in the application code as static data structures.