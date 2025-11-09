import { Link } from 'react-router-dom';

interface ChapterNavigationProps {
  currentChapter?: number;
}

export function ChapterNavigation({ currentChapter }: ChapterNavigationProps) {
  const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 text-sm flex-wrap">
        <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium">
          Introduction:
        </Link>
        {chapters.map((ch) => {
          if (ch === currentChapter) {
            return (
              <span
                key={ch}
                className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded"
              >
                Ch {ch}
              </span>
            );
          }
          return (
            <Link
              key={ch}
              to={`/chapter-${ch}`}
              className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded"
            >
              Ch {ch}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
