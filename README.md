# Isaiah Interactive Study - Chapters 1-12

An interactive web application for studying Isaiah Chapters 1-12, known as the "Book of Immanuel." This app features color-coded verse groupings, interactive hover tooltips, structural markers, and comprehensive devotional reflections.

## Features

### 📖 Interactive Study Experience
- **Color-Coded Thematic Groups**: Verses are organized into thematic sections with distinct colors for easy visual identification
- **Hover Tooltips**: Quick verse previews appear when hovering over verse cards
- **Transformation Point Markers**: Color-coded dots highlight key structural points (chiastic centers, dramatic turns, narrative transitions)
- **Two-Level Modal Navigation**: Click any verse to view detailed reflections and Scripture connections

### 🎨 Visual Design
- **Clean, Modern Interface**: Purple gradient background with readable dark text on white cards
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Semantic Color Coding**: Transformation points use meaningful colors:
  - 🔵 Blue: Chiastic centers (hinge/center points)
  - 🔴 Red: Dramatic turns
  - 🟡 Yellow: Narrative transitions
  - 🟣 Purple: Climactic moments
  - 🟢 Green: Foundation elements

### 📚 Content Features
- **Devotional Reflections**: Three perspectives for each verse:
  - "Seeing Connections": Literary and thematic insights
  - "How This Helps My Life": Personal application
  - "What This Teaches Us": Theological lessons
- **Scripture Connections**: Inter-biblical references showing how verses integrate into the broader biblical narrative
- **Chapter Structure Modals**: Visual explanations of each chapter's chiastic or thematic structure
- **Educational Home Page**: Overview of the Book of Isaiah and app usage tutorials

## Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite 6** for fast development server and optimized builds
- **React Router DOM** for client-side navigation
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for specific design elements

### Backend
- **Express** web server serving chapter data via REST API
- **In-memory caching** for optimal performance
- **JSON data files** for easy content updates
- **CORS enabled** for frontend-backend communication

### Database (Future)
- **PostgreSQL** via Neon serverless
- **Drizzle ORM** for type-safe database operations

## Project Structure

```
.
├── server/                    # Backend API server
│   ├── index.ts              # Express server with caching
│   └── data/                 # Chapter JSON files (chapter1.json - chapter12.json)
├── src/
│   ├── chapters/             # Chapter components (Chapter1.tsx - Chapter12.tsx)
│   ├── components/           # Reusable UI components
│   │   ├── ChapterNavigation.tsx
│   │   ├── StructureButton.tsx
│   │   └── Chapter*StructureModal.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── useChapterData.ts # Data fetching hook
│   ├── utils/                # Utility functions
│   │   └── chapterHelpers.ts # Shared color/hinge helpers
│   ├── App.tsx               # Main app with routing
│   └── Home.tsx              # Landing page
├── package.json              # Dependencies and scripts
├── vite.config.ts           # Vite configuration with proxy
└── replit.md                # Project documentation
```

## Getting Started

### Prerequisites
- Node.js 20 or later
- npm or equivalent package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd isaiah-interactive-study
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
# Start both frontend and backend concurrently
npm run dev
```

The application will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start frontend dev server (Vite on port 5000)
- `npm run server` - Start backend API server (Express on port 3001)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Architecture

### Data Flow
1. User navigates to a chapter page
2. `useChapterData` hook fetches data from backend API
3. Express server returns cached JSON data
4. Frontend renders color-coded verse grid
5. User interactions trigger modals with detailed content

### Separation of Concerns
- **Content** (JSON files): Easy to update without code changes
- **Presentation** (React components): Consistent UI patterns
- **Business Logic** (hooks/utils): Shared functionality
- **Backend** (Express): Data serving with caching

## Content Structure

Each chapter JSON file includes:
- `chapterNumber`: Chapter identifier
- `title`: Display title
- `subtitle`: Chapter theme
- `structureSubtitle`: Structure modal subtitle
- `verses`: Array of verse objects with:
  - `number`: Verse number
  - `text`: Verse content
  - `group`: Thematic group number
  - `isHinge`: (optional) Transformation point marker
  - `hingeType`: (optional) Type of transformation
- `reflections`: Three-perspective devotional content
- `scriptureConnections`: Inter-biblical references

## Customization

### Adding New Chapters
1. Create JSON file in `server/data/chapterN.json`
2. Create component in `src/chapters/ChapterN.tsx`
3. Create structure modal in `src/components/ChapterNStructureModal.tsx`
4. Add route in `src/App.tsx`
5. Update home page navigation

### Styling
- Global styles: `src/App.css`
- Tailwind config: `tailwind.config.js`
- Color classes defined in `src/utils/chapterHelpers.ts`

## Deployment

The app is configured for deployment on Replit with two workflows:
1. **Backend API Server**: Express on port 3001
2. **Isaiah 6 Study App**: Vite frontend on port 5000 with proxy

For other platforms, ensure:
- Both frontend and backend are running
- Frontend proxy is configured to reach backend
- Environment variables are set if using database

## Contributing

This is a devotional study tool. When contributing:
- Maintain simple, everyday language (avoid academic jargon)
- Ensure content accuracy with biblical text
- Follow existing UI patterns for consistency
- Test on multiple devices for responsiveness

## License

[Add your license here]

## Acknowledgments

Built with a focus on making Isaiah's profound prophecies accessible through modern, interactive technology.

---

**Chapters Completed**: 1-12 (The Book of Immanuel)
**Total Verses**: 252 verses with full reflections and connections
