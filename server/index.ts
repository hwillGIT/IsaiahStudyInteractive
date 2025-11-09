import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { chapters, groups, verses, reflections, scriptureConnections, structureMarkers } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get chapter data with all related information
app.get('/api/chapter/:chapterNumber', async (req, res) => {
  try {
    const chapterNumber = parseInt(req.params.chapterNumber);
    
    // Get chapter info
    const [chapter] = await db.select().from(chapters).where(eq(chapters.chapterNumber, chapterNumber));
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    // Get groups for this chapter
    const chapterGroups = await db.select().from(groups).where(eq(groups.chapterId, chapter.id));
    
    // Get verses for this chapter
    const chapterVerses = await db.select().from(verses).where(eq(verses.chapterId, chapter.id));
    
    // Get structure markers for this chapter
    const markers = await db.select().from(structureMarkers).where(eq(structureMarkers.chapterId, chapter.id));

    res.json({
      chapter,
      groups: chapterGroups,
      verses: chapterVerses,
      structureMarkers: markers
    });
  } catch (error) {
    console.error('Error fetching chapter:', error);
    res.status(500).json({ error: 'Failed to fetch chapter data' });
  }
});

// Get verse details (reflections and connections)
app.get('/api/verse/:verseId', async (req, res) => {
  try {
    const verseId = parseInt(req.params.verseId);
    
    // Get reflection
    const [reflection] = await db.select().from(reflections).where(eq(reflections.verseId, verseId));
    
    // Get scripture connections
    const [connections] = await db.select().from(scriptureConnections).where(eq(scriptureConnections.verseId, verseId));

    res.json({
      reflection: reflection || null,
      connections: connections || null
    });
  } catch (error) {
    console.error('Error fetching verse details:', error);
    res.status(500).json({ error: 'Failed to fetch verse details' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
