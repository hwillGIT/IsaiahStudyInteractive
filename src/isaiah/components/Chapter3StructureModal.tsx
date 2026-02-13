interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter3StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">Chapter 3 Structure</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern showing how defying God's presence leads from leadership crisis to complete societal breakdown:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-7): <span className="font-sans font-semibold text-orange-700">Material Crisis</span> — No bread or clothing, leaders removed</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (8-12): <span className="font-sans font-semibold text-red-700">Jerusalem Crumbling</span> — Words and deeds defy the LORD</span>
            </div>
            <div className="ml-8 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-500 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-yellow-800 font-bold">★ CENTER (13-15): The LORD's Courtroom</span>
            </div>
            <div className="ml-12 text-yellow-700 font-sans italic pl-5">"The LORD enters into judgment... You have devoured the vineyard"</div>
            <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (16-17): <span className="font-sans font-semibold text-purple-700">Pride Judged</span> — LORD strikes daughters of Zion</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (18-4:1): <span className="font-sans font-semibold text-pink-700">Luxury Stripped</span> — We will eat our own food, wear our own clothing</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The chapter opens with leadership removed and material crisis—no bread or clothing (vv. 1-7)—and closes with women desperate to provide their own food and clothing (3:18-4:1). This shows judgment coming full circle: what God provided, He now withdraws, forcing self-reliance that leads to desperation.</li>
              <li><strong>B ↔ B':</strong> Jerusalem's collapse through defiant words and deeds (vv. 8-12) finds its answer in God striking the proud daughters of Zion (vv. 16-17). Those who defied God's presence with their speech now face His direct judgment on their pride and vanity.</li>
              <li><strong>Center (vv. 13-15):</strong> God's courtroom stands at the center—the LORD formally rises to judge His people, specifically accusing the elders and princes of devouring the vineyard and crushing the poor. This legal indictment is the pivot: everything flows from oppression of the vulnerable, which brings divine prosecution.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals that when leaders exploit the weak (center), God removes those leaders (outer frame), causing the entire society to collapse under its own weight of injustice.</p>
        </div>
      </div>
    </div>
  );
}
