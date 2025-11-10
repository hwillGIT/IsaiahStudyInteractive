// Script to extract chapter data from React components and save as JSON files
// This will read the chapter TypeScript files and create clean JSON data files

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting content extraction from chapter components...\n');

// Create data directory if it doesn't exist
const dataDir = join(__dirname, '..', 'server', 'data');
mkdirSync(dataDir, { recursive: true });

// Helper to extract array/object from TypeScript source
function extractData(source, varName) {
  const regex = new RegExp(`const ${varName}[^=]*=\\s*([\\s\\S]*?);\\s*(?=const |function |interface |export |\\n\\n|$)`, 'm');
  const match = source.match(regex);
  if (!match) return null;
  
  try {
    // Clean up the extracted code
    let code = match[1]
      .replace(/\/\/.*/g, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .trim();
    
    // Wrap in parentheses for evaluation
    code = `(${code})`;
    
    // Evaluate (safe since it's our own code)
    return eval(code);
  } catch (e) {
    console.error(`❌ Error extracting ${varName}:`, e.message);
    return null;
  }
}

// Process each chapter
for (let chapterNum = 1; chapterNum <= 12; chapterNum++) {
  console.log(`📖 Processing Chapter ${chapterNum}...`);
  
  try {
    const chapterPath = join(__dirname, '..', 'src', 'chapters', `Chapter${chapterNum}.tsx`);
    const source = readFileSync(chapterPath, 'utf-8');
    
    // Extract all data structures
    const verses = extractData(source, 'verses');
    const reflectionContent = extractData(source, 'reflectionContent');
    const scriptureConnections = extractData(source, 'scriptureConnections');
    
    // Extract metadata using regex patterns
    const titleMatch = source.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const subtitleMatch = source.match(/<p[^>]*text-gray-600[^>]*>([^<]+)<\/p>/);
    const structureSubtitleMatch = source.match(/subtitle="([^"]+)"/);
    
    // Build the JSON structure
    const chapterData = {
      chapterNumber: chapterNum,
      title: titleMatch ? titleMatch[1].trim() : `Isaiah Chapter ${chapterNum}`,
      subtitle: subtitleMatch ? subtitleMatch[1].trim() : '',
      structureSubtitle: structureSubtitleMatch ? structureSubtitleMatch[1].trim() : '',
      verses: verses || [],
      reflections: reflectionContent || {},
      scriptureConnections: scriptureConnections || {}
    };
    
    // Save to JSON file
    const outputPath = join(dataDir, `chapter${chapterNum}.json`);
    writeFileSync(outputPath, JSON.stringify(chapterData, null, 2), 'utf-8');
    
    console.log(`   ✅ Extracted ${chapterData.verses.length} verses`);
    console.log(`   ✅ Extracted ${Object.keys(chapterData.reflections).length} reflections`);
    console.log(`   ✅ Extracted ${Object.keys(chapterData.scriptureConnections).length} scripture connections`);
    console.log(`   ✅ Saved to ${outputPath}\n`);
    
  } catch (error) {
    console.error(`   ❌ Error processing Chapter ${chapterNum}:`, error.message);
  }
}

console.log('✨ Content extraction complete!');
