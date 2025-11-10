// Shared helper functions for all chapter components

import { Verse } from '../hooks/useChapterData';

// Standardized color palette for verse groups
export const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-red-600',
    2: 'bg-orange-500',
    3: 'bg-gray-600',
    4: 'bg-blue-500',
    5: 'bg-green-600',
    6: 'bg-purple-500',
    7: 'bg-teal-500',
    8: 'bg-pink-600',
    9: 'bg-indigo-500'
  };
  return colors[group] || 'bg-gray-400';
};

// Default hinge marker color (yellow dot)
export const getHingeColor = (_hingeType?: string): string => {
  return 'bg-yellow-400';
};

// Extract unique hinge types from verses array
export const getUniqueHingeTypes = (verses: Verse[]): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
};
