interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter12StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 12 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">Song of Thanksgiving and Praise</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">This brief hymn displays perfect symmetry centered on the wells of salvation. Personal gratitude flows through joy to worldwide proclamation—from "I will give thanks" to "make known among all peoples":</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-2): <span className="font-sans font-semibold text-blue-700">Personal Thanksgiving</span> — "I will give thanks...God is my salvation"</span>
            </div>
            <div className="ml-4 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-yellow-800 font-bold">★ CENTER (3): Wells of Salvation — "With joy you will draw water from the wells of salvation"</span>
            </div>
            <div className="ml-0 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (4-6): <span className="font-sans font-semibold text-green-700">Corporate Proclamation</span> — "Make known His deeds among the peoples"</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> "I will give thanks" (v. 1) expands to "you will say...give thanks, call upon his name, make known his deeds" (v. 4). Personal testimony becomes communal witness. Individual salvation experienced privately (A) must be declared publicly among all nations (A'). What begins as "my" salvation ends as a global proclamation.</li>
              <li><strong>Center (v. 3):</strong> The pivot verse—"with joy you will draw water from the wells of salvation"—transforms singular thanksgiving into plural mission. The shift from "I" (v. 1) to "you" (v. 3) to "you...the peoples" (v. 4) traces the gospel's widening radius. The wells are inexhaustible; salvation isn't hoarded but shared. Joy is the hinge emotion: gratitude (A) becomes joy (center) that overflows into praise (A').</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">This three-part structure mirrors the gospel rhythm: receive salvation personally (A), drink deeply with joy (center), then go tell the world (A'). Chapter 12 concludes Isaiah 1-12 by showing that God's salvation—once received—compels witness. The one who draws from the well cannot stay silent. Personal thanksgiving erupts into global proclamation.</p>
        </div>
      </div>
    </div>
  );
}
