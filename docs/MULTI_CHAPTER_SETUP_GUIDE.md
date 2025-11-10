# Multi-Chapter Isaiah Study Setup Guide

## Overview
This guide shows you how to create separate Replit projects for each Isaiah chapter, all using the same template and cross-linked together.

## Architecture
- **7 separate Replit projects** (one for each chapter: 2, 3, 4, 5, 7, 8, 9)
- Each project is deployed independently with its own URL
- All projects cross-link to each other via the navigation bar
- All follow the same Isaiah 6 template design

---

## Step 1: Deploy Isaiah 6 (Current Project)

1. **Publish this project** using Replit's deploy button
2. **Copy the deployed URL** (e.g., `https://isaiah-6-study.yourname.repl.co`)
3. **Save this URL** - you'll need it for the other chapters

---

## Step 2: Create Projects for Each Chapter

For **each** of the 7 chapters (2, 3, 4, 5, 7, 8, 9), repeat these steps:

### A. Fork/Duplicate This Project
1. In Replit, fork this project
2. Rename it to `isaiah-[N]-study` (e.g., `isaiah-9-study`)

### B. Extract Chapter Content
The zip files are already in `attached_assets/`. For each chapter:

```bash
# Example for Isaiah 9:
cd /tmp/extracts/isaiah-9-interactive-study_*/isaiah-9-interactive-study/src
cat App.tsx
```

Look for these key sections to copy:
- `verses` array
- `getGroupName()` function  
- `getGroupTransition()` function
- `reflectionContent` object
- `scriptureConnections` object (if present)

### C. Update src/App.tsx

Replace the following sections in your new project:

1. **Update the header comment** (line 20):
```typescript
/**
 * INTERACTIVE BIBLE STUDY APPLICATION TEMPLATE
 * Isaiah Chapter 9: The Prince of Peace
 * ...
 */
```

2. **Replace verses array** (around line 35):
```typescript
const verses: Verse[] = [
  // Paste verses from extracted chapter
];
```

3. **Update getColorClass()** if needed (around line 56)
   - Adjust colors for the number of thematic groups in this chapter

4. **Replace getGroupName()** (around line 68):
```typescript
const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: "Light in Darkness",  // Use devotional names, not "Group 1"
    2: "Joy and Victory",
    // etc.
  };
  return names[group] || 'Unknown Group';
};
```

5. **Replace getGroupTransition()** (around line 83)

6. **Replace reflectionContent** (around line 104)

7. **Add scriptureConnections** if the chapter has them

8. **Update the page header** (around line 286):
```typescript
<h1 className="text-4xl font-bold text-gray-800 mb-2">
  Isaiah Chapter 9 Interactive Study
</h1>
<p className="text-lg text-gray-600 mb-4">
  The Prince of Peace
</p>
```

9. **Update the navigation bar** (around line 272):
```typescript
<span className="text-gray-500">Isaiah Studies:</span>
<a href="https://isaiah-2-study.yourname.repl.co" ...>Ch 2</a>
<a href="https://isaiah-3-study.yourname.repl.co" ...>Ch 3</a>
// ... etc
<span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">
  Ch 9  {/* Highlight current chapter */}
</span>
```

### D. Update the Legend

**IMPORTANT:** The legend must use the clean numbered format:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
  {Array.from({ length: 6 }, (_, i) => i + 1).map((group) => (
    <div key={group} className="flex items-start gap-3">
      <div className={`w-4 h-4 rounded mt-1 flex-shrink-0 ${getColorClass(group)}`}></div>
      <div className="text-sm">
        <div className="font-medium text-gray-800">
          <span className="text-gray-500 mr-1">{group}.</span>
          {getGroupName(group)}
        </div>
        <div className="text-gray-600 text-xs">{getGroupTransition(group)}</div>
      </div>
    </div>
  ))}
</div>
```

**Key points:**
- Small color chips (w-4 h-4)
- Inline numbers: `<span>{group}.</span>`
- No "Group N:" labels
- No oversized icons
- No confusing arrows

---

## Step 3: Deploy Each Chapter

1. Deploy each chapter project using Replit's deploy button
2. Copy each deployed URL
3. Keep a list of all URLs:
   ```
   Chapter 2: https://isaiah-2-study.yourname.repl.co
   Chapter 3: https://isaiah-3-study.yourname.repl.co
   Chapter 4: https://isaiah-4-study.yourname.repl.co
   Chapter 5: https://isaiah-5-study.yourname.repl.co
   Chapter 6: https://isaiah-6-study.yourname.repl.co (current)
   Chapter 7: https://isaiah-7-study.yourname.repl.co
   Chapter 8: https://isaiah-8-study.yourname.repl.co
   Chapter 9: https://isaiah-9-study.yourname.repl.co
   ```

---

## Step 4: Update Navigation Links in All Projects

Go back to **each project** (including Isaiah 6) and update the navigation URLs:

```typescript
<div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 text-sm">
  <span className="text-gray-500">Isaiah Studies:</span>
  <a href="https://isaiah-2-study.yourname.repl.co" className="text-blue-600...">Ch 2</a>
  <a href="https://isaiah-3-study.yourname.repl.co" className="text-blue-600...">Ch 3</a>
  <a href="https://isaiah-4-study.yourname.repl.co" className="text-blue-600...">Ch 4</a>
  <a href="https://isaiah-5-study.yourname.repl.co" className="text-blue-600...">Ch 5</a>
  <a href="https://isaiah-6-study.yourname.repl.co" className="text-blue-600...">Ch 6</a>
  <a href="https://isaiah-7-study.yourname.repl.co" className="text-blue-600...">Ch 7</a>
  <a href="https://isaiah-8-study.yourname.repl.co" className="text-blue-600...">Ch 8</a>
  <a href="https://isaiah-9-study.yourname.repl.co" className="text-blue-600...">Ch 9</a>
</div>
```

Make sure to highlight the **current chapter** in each project:
```typescript
// In Isaiah 9 project:
<span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 9</span>
```

---

## Quick Checklist Per Chapter

- [ ] Fork Isaiah 6 project
- [ ] Rename to `isaiah-N-study`
- [ ] Extract content from zip file
- [ ] Update verses array
- [ ] Update getGroupName() with devotional names (no "Group N")
- [ ] Update getGroupTransition()
- [ ] Update reflectionContent
- [ ] Add scriptureConnections if available
- [ ] Update page title and subtitle
- [ ] Update navigation to highlight current chapter
- [ ] Deploy project
- [ ] Copy deployment URL
- [ ] Go back and update ALL chapter navigation links with this URL

---

## Template Design Requirements

Each chapter **must** follow these design patterns:

### ✅ Clean Numbered Legend
- Small color chips (w-4 h-4)
- Inline numbers: "1.", "2.", "3."
- Devotional group names (not "Group 1", "Group 2")
- Grid layout (1/2/3 columns)

### ✅ Two-Level Modal Navigation
- Tab 1: Reflections (with 3 viewing modes)
- Tab 2: Scripture Connections (FROM/TO references)

### ✅ Interactive Features
- Hover tooltips on verse cards
- Yellow transformation dots on hinge verses
- Responsive grid layout

### ❌ Avoid These
- Academic "Group N:" labels
- Oversized circular number badges
- Confusing flow arrows
- Vertical lists that dominate the page

---

## Extracted Chapter Data Locations

The chapter content has been extracted to:
```
/tmp/extracts/isaiah2-chiastic-enhanced_*/
/tmp/extracts/isaiah-3-interactive_*/
/tmp/extracts/isaiah-4-interactive-study_*/
/tmp/extracts/isaiah-5-interactive-study_*/
/tmp/extracts/isaiah-7-interactive-study_*/
/tmp/extracts/isaiah-8-interactive-study_*/
/tmp/extracts/isaiah-9-interactive-study_*/
```

Each contains a `src/App.tsx` file with the chapter's content.

---

## Need Help?

Refer to the Isaiah 6 template (this project) as the gold standard for:
- Legend design
- Modal navigation
- Verse grid layout
- Color coding
- Interactive tooltips

All chapters should look and feel identical, with only the content changing.
