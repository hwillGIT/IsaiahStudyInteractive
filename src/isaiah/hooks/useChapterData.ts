import { useState, useEffect } from 'react';

export interface Verse {
  number: number;
  text: string;
  group: number;
  isHinge?: boolean;
  hingeType?: string;
}

export interface Reflection {
  seeing: string;
  life: string;
  teach: string;
}

export interface Connection {
  from?: string[];
  to?: string[];
  context: string;
}

export interface GroupMeta {
  name: string;
  transition: string;
}

export interface HingeMeta {
  explanation: string;
  color: string;
}

export interface ChapterData {
  chapterNumber: number;
  title: string;
  subtitle: string;
  structureSubtitle: string;
  verses: Verse[];
  reflections: Record<number, Reflection>;
  scriptureConnections: Record<number, Connection>;
  theme?: string;
  groupMetadata?: Record<number, GroupMeta>;
  hingeMetadata?: Record<string, HingeMeta>;
  structureModal?: unknown | null;
}

export function useChapterData(chapterNumber: number) {
  const [data, setData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChapterData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/chapters/${chapterNumber}`);
        if (!response.ok) {
          throw new Error(`Failed to load chapter ${chapterNumber}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching chapter data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchChapterData();
  }, [chapterNumber]);

  return { data, loading, error };
}
