interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter2StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 2 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">God's Mountain, Idolatry, and the Day of the LORD</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern contrasting future glory with present pride, both leading to God's terrifying judgment:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-5): <span className="font-sans font-semibold text-yellow-700">Mountain Exalted</span> — Nations stream to Zion for God's word</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (6-11): <span className="font-sans font-semibold text-red-700">Pride and Idolatry</span> — People filled with foreign ways</span>
            </div>
            <div className="ml-8 bg-orange-100 px-2 py-1 rounded border-l-4 border-orange-500 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-orange-800 font-bold">★ CENTER (10-11): Terror of the LORD — Enter the rock, hide in the dust</span>
            </div>
            <div className="ml-12 text-orange-700 font-sans italic pl-5">"The LORD alone will be exalted in that day"</div>
            <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (12-17): <span className="font-sans font-semibold text-purple-700">All Pride Abased</span> — Day of the LORD against every high thing</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (18-22): <span className="font-sans font-semibold text-gray-700">Idols Abolished</span> — Stop trusting mere humans</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The vision opens with the LORD's mountain exalted above all (vv. 1-5) but closes with idols completely abolished (vv. 18-22). God's glory rising means all false gods must fall—only one can be supreme.</li>
              <li><strong>B ↔ B':</strong> Human pride and idolatry in Israel (vv. 6-11) finds its answer in God bringing low every proud thing (vv. 12-17). The very things people trust—silver, gold, horses, alliances—become targets of divine judgment.</li>
              <li><strong>Center (vv. 10-11):</strong> The repeated phrase "terror of the LORD" appears at the center, showing that God's holiness is both awesome and terrifying. When confronted with His glory, humanity must hide or be humbled—there is no middle ground.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern teaches that God's exaltation requires humanity's humbling. In the day of the LORD, every source of human pride will be brought low so that the LORD alone is lifted high.</p>
        </div>
      </div>
    </div>
  );
}
