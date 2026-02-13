import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ChapterNavigationProps {
  currentChapter?: number;
  maxChapter?: number;
}

const sectionRanges = [
  { label: "1-12", start: 1, end: 12 },
  { label: "13-23", start: 13, end: 23 },
  { label: "24-27", start: 24, end: 27 },
  { label: "28-33", start: 28, end: 33 },
  { label: "34-39", start: 34, end: 39 },
  { label: "40-55", start: 40, end: 55 },
];

export function ChapterNavigation({ currentChapter, maxChapter = 55 }: ChapterNavigationProps) {
  const currentSection = sectionRanges.find(
    (s) => currentChapter && currentChapter >= s.start && currentChapter <= s.end
  );

  const [expandedSection, setExpandedSection] = useState<string | null>(
    currentSection?.label ?? null
  );

  const handleToggle = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex items-center gap-1 bg-white rounded-lg shadow-sm px-3 py-2 text-sm flex-wrap">
        <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium mr-1">
          Introduction:
        </Link>
        {sectionRanges.map((section) => {
          if (section.end > maxChapter) return null;
          const isExpanded = expandedSection === section.label;
          const isCurrent = currentSection?.label === section.label;

          if (isExpanded) {
            return (
              <span key={section.label} className="inline-flex items-center gap-0.5 flex-wrap">
                <button
                  onClick={() => handleToggle(section.label)}
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                    isCurrent ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-700'
                  } hover:bg-gray-300`}
                >
                  {section.label} ▾
                </button>
                {Array.from({ length: section.end - section.start + 1 }, (_, i) => section.start + i).map((ch) => {
                  if (ch === currentChapter) {
                    return (
                      <span
                        key={ch}
                        className="text-gray-800 font-semibold px-1.5 py-0.5 bg-blue-100 rounded text-xs"
                      >
                        {ch}
                      </span>
                    );
                  }
                  return (
                    <Link
                      key={ch}
                      to={ch <= 12 ? `/chapter-${ch}` : `/chapter/${ch}`}
                      className="text-blue-600 hover:text-blue-800 font-medium px-1.5 py-0.5 hover:bg-blue-50 rounded text-xs"
                    >
                      {ch}
                    </Link>
                  );
                })}
              </span>
            );
          }

          return (
            <button
              key={section.label}
              onClick={() => handleToggle(section.label)}
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                isCurrent ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              } hover:bg-gray-200`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
