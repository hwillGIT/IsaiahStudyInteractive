import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

const chapterCache: Record<number, any> = {};

function loadChapters() {
  console.log('📚 Loading chapter data into memory...');
  const dataDir = join(__dirname, 'data');
  const files = readdirSync(dataDir);
  for (const file of files) {
    const match = /^chapter(\d+)\.json$/i.exec(file);
    if (!match) continue;
    const chapterNumber = parseInt(match[1], 10);
    try {
      const dataPath = join(dataDir, file);
      const data = readFileSync(dataPath, 'utf-8');
      chapterCache[chapterNumber] = JSON.parse(data);
      console.log(`   ✅ Loaded Chapter ${chapterNumber}`);
    } catch (error) {
      console.error(`   ❌ Failed to load Chapter ${chapterNumber}:`, error);
    }
  }
  console.log(`✨ ${Object.keys(chapterCache).length} chapters loaded successfully\n`);
}

// Load chapters on startup
loadChapters();

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
const distPath = join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// API Routes

app.get('/api/chapters', (req, res) => {
  const availableChapters = Object.keys(chapterCache)
    .map(Number)
    .sort((a, b) => a - b)
    .map(num => {
      const ch = chapterCache[num];
      return {
        chapterNumber: num,
        title: ch.title || `Isaiah Chapter ${num}`,
        subtitle: ch.subtitle || '',
        verseCount: ch.verses?.length || 0,
        theme: ch.theme || ''
      };
    });
  res.json(availableChapters);
});

app.get('/api/chapters/:chapterNumber', (req, res) => {
  const chapterNumber = parseInt(req.params.chapterNumber);
  
  if (!chapterNumber || chapterNumber < 1) {
    return res.status(400).json({ error: 'Invalid chapter number.' });
  }
  
  const chapter = chapterCache[chapterNumber];
  if (!chapter) {
    return res.status(404).json({ error: `Chapter ${chapterNumber} not found` });
  }
  
  res.json(chapter);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    chaptersLoaded: Object.keys(chapterCache).length 
  });
});

// Catch-all handler: serve index.html for all other routes (React Router)
app.use((req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📖 Serving ${Object.keys(chapterCache).length} chapters from memory`);
  console.log(`🌐 Frontend served from: ${distPath}`);
});
