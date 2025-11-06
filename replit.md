# Isaiah 6 Interactive Study

## Overview

This is an interactive web application for studying Isaiah Chapter 6 from the Bible. The application provides three main views: Scripture text with verse selection, thematic exploration of key concepts, and detailed study notes with commentary. Built with React and TypeScript, it offers an engaging educational experience for biblical study through interactive verse highlighting, keyword exploration, and thematic grouping. The application is designed to help users understand the profound theological themes in Isaiah's vision of God's holiness and his prophetic commission.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript
- **Rationale**: Provides type safety and modern component-based architecture for building interactive UI
- **Component Structure**: Three main feature components (Isaiah6Text, ThemeExplorer, StudyNotes) managed by a parent App component with tab-based navigation
- **State Management**: Local component state using React hooks (useState, useEffect)
- **Pros**: Simple state management adequate for current scope, easy to understand and maintain
- **Cons**: May need state management library (Redux, Zustand) if complexity grows

**Build Tool**: Vite 6
- **Rationale**: Fast development server with hot module replacement, optimized for React applications
- **Configuration**: Configured for host 0.0.0.0 on port 5000 for Replit compatibility
- **Pros**: Lightning-fast builds, excellent developer experience
- **Cons**: None for this use case

**Styling Approach**: Vanilla CSS with component-scoped stylesheets
- **Rationale**: Simple styling needs don't require CSS-in-JS or utility frameworks
- **Global Styles**: Gradient background (purple theme), base typography
- **Component Styles**: Modular CSS files per component
- **Pros**: No additional dependencies, straightforward maintenance
- **Cons**: No built-in theming system, manual responsive design

### Data Architecture

**Data Storage**: Static TypeScript data structures
- **Location**: `src/data/isaiah6.ts`
- **Structure**: 
  - `Verse` interface with number, text, and keywords
  - `isaiah6Verses` array containing all 13 verses
  - `themes` array grouping verses by theological concepts
  - `studyNotes` array with commentary per verse
- **Rationale**: Content is static biblical text that doesn't change; no need for database
- **Pros**: Simple, type-safe, no backend required, fast load times
- **Cons**: Content updates require code changes and redeployment

**Interaction Patterns**:
- Verse selection state lifted to App component and passed to child components
- Tab-based navigation for switching between Scripture, Themes, and Study Notes views
- Click handlers for interactive elements (verses, keywords, themes)
- Conditional highlighting based on selected state

### User Interface Design

**Layout Pattern**: Single-page application with tabbed navigation
- **Problem**: Multiple views of the same content without page reloads
- **Solution**: Tab-based component switching with shared state
- **Alternatives**: Multi-page with routing (React Router)
- **Chosen Approach**: Simpler for small scope, no URL management needed

**Visual Theme**: Purple gradient background with white/light gray content cards
- **Design Language**: Clean, modern, focused on readability
- **Interactive Elements**: Hover states, click states, smooth transitions
- **Accessibility**: Color contrast, clickable areas, semantic HTML

**Responsive Design**: Flexible grid and flexbox layouts
- **Breakpoints**: CSS auto-fit grid for theme cards, centered max-width containers
- **Mobile Support**: Flex-wrap for navigation tabs, column layouts for verses

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