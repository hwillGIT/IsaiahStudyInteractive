import { pgTable, serial, text, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  chapterNumber: integer('chapter_number').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
});

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  chapterId: integer('chapter_id').notNull().references(() => chapters.id),
  groupNumber: integer('group_number').notNull(),
  name: text('name').notNull(),
  transition: text('transition').notNull(),
  colorClass: text('color_class').notNull(),
});

export const verses = pgTable('verses', {
  id: serial('id').primaryKey(),
  chapterId: integer('chapter_id').notNull().references(() => chapters.id),
  verseNumber: integer('verse_number').notNull(),
  text: text('text').notNull(),
  groupId: integer('group_id').notNull().references(() => groups.id),
  isHinge: boolean('is_hinge').default(false),
  hingeType: text('hinge_type'),
});

export const reflections = pgTable('reflections', {
  id: serial('id').primaryKey(),
  verseId: integer('verse_id').notNull().references(() => verses.id),
  seeing: text('seeing').notNull(),
  life: text('life').notNull(),
  teach: text('teach').notNull(),
});

export const scriptureConnections = pgTable('scripture_connections', {
  id: serial('id').primaryKey(),
  verseId: integer('verse_id').notNull().references(() => verses.id),
  fromReferences: jsonb('from_references').$type<string[]>(),
  toReferences: jsonb('to_references').$type<string[]>(),
  context: text('context'),
});

export const structureMarkers = pgTable('structure_markers', {
  id: serial('id').primaryKey(),
  chapterId: integer('chapter_id').notNull().references(() => chapters.id),
  hingeType: text('hinge_type').notNull(),
  explanation: text('explanation').notNull(),
  color: text('color').notNull(),
});

export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = typeof chapters.$inferInsert;
export type Group = typeof groups.$inferSelect;
export type InsertGroup = typeof groups.$inferInsert;
export type Verse = typeof verses.$inferSelect;
export type InsertVerse = typeof verses.$inferInsert;
export type Reflection = typeof reflections.$inferSelect;
export type InsertReflection = typeof reflections.$inferInsert;
export type ScriptureConnection = typeof scriptureConnections.$inferSelect;
export type InsertScriptureConnection = typeof scriptureConnections.$inferInsert;
export type StructureMarker = typeof structureMarkers.$inferSelect;
export type InsertStructureMarker = typeof structureMarkers.$inferInsert;
