// Shared helper functions for all chapter components

import { Verse } from '../hooks/useChapterData';

// Extended color palette including custom colors for special cases
export const COLOR_PALETTE = {
  red: 'bg-red-600',
  redLight: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
  yellowLight: 'bg-yellow-400',
  gray: 'bg-gray-600',
  slate: 'bg-slate-600',
  blue: 'bg-blue-500',
  blueDeep: 'bg-blue-600',
  green: 'bg-green-500',
  greenDeep: 'bg-green-600',
  purple: 'bg-purple-500',
  purpleDeep: 'bg-purple-600',
  teal: 'bg-teal-500',
  pink: 'bg-pink-500',
  pinkDeep: 'bg-pink-600',
  indigo: 'bg-indigo-500'
};

// Standardized color palette for verse groups (default mapping)
// 
// Usage:
//   Basic: getColorClass(1) → 'bg-red-600'
//   Custom: getColorClass(1, { 1: COLOR_PALETTE.yellow }) → 'bg-yellow-500'
// 
// Chapters can override default colors by passing a custom mapping object:
//   const customColors = { 1: COLOR_PALETTE.yellowLight, 3: COLOR_PALETTE.yellow };
//   getColorClass(verse.group, customColors)
export const getColorClass = (group: number, customMapping?: Record<number, string>): string => {
  // If custom mapping provided, check there first
  if (customMapping && customMapping[group]) {
    return customMapping[group];
  }
  
  // Default color mapping
  const colors: Record<number, string> = {
    1: COLOR_PALETTE.red,
    2: COLOR_PALETTE.orange,
    3: COLOR_PALETTE.gray,
    4: COLOR_PALETTE.blue,
    5: COLOR_PALETTE.greenDeep,
    6: COLOR_PALETTE.purple,
    7: COLOR_PALETTE.teal,
    8: COLOR_PALETTE.pinkDeep,
    9: COLOR_PALETTE.indigo
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
