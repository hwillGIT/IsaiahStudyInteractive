import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// In-memory cache for chapter data
const chapterCache: Record<number, any> = {};

// Load all chapters into memory at startup
function loadChapters() {
  console.log('📚 Loading chapter data into memory...');
  for (let i = 1; i <= 12; i++) {
    try {
      const dataPath = join(__dirname, 'data', `chapter${i}.json`);
      const data = readFileSync(dataPath, 'utf-8');
      chapterCache[i] = JSON.parse(data);
      console.log(`   ✅ Loaded Chapter ${i}`);
    } catch (error) {
      console.error(`   ❌ Failed to load Chapter ${i}:`, error);
    }
  }
  console.log(`✨ ${Object.keys(chapterCache).length} chapters loaded successfully\n`);
}

// Load chapters on startup
loadChapters();

app.use(cors());
app.use(express.json());

app.get('/api/chapters/:chapterNumber', (req, res) => {
  const chapterNumber = parseInt(req.params.chapterNumber);
  
  if (!chapterNumber || chapterNumber < 1 || chapterNumber > 12) {
    return res.status(400).json({ error: 'Invalid chapter number. Must be between 1 and 12.' });
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

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📖 Serving ${Object.keys(chapterCache).length} chapters from memory`);
});
