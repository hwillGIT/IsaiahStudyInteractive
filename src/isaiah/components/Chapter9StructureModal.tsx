interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter9StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 9 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">The Light in the Darkness and the Prince of Peace</p>
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
          <p className="text-sm text-gray-600 mb-4">This chapter displays two symmetrical patterns—the first section (1-7) shows promise from darkness to light, while the second (8-21) shows judgment's refrain:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded mb-4">
            <div className="text-xs font-bold text-blue-600 mb-1">PART 1: FROM DARKNESS TO LIGHT (1-7)</div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-2): <span className="font-sans font-semibold text-yellow-700">Darkness Transformed</span> — People in darkness see great light</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (3-5): <span className="font-sans font-semibold text-orange-700">Joy and Liberation</span> — Yoke broken, weapons burned</span>
            </div>
            <div className="ml-8 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-green-800 font-bold">★ CENTER (6-7): The Child King</span>
            </div>
            <div className="ml-12 text-green-700 font-sans italic pl-5">"Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace"</div>
            <div className="mt-2 ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (6b): <span className="font-sans font-semibold text-orange-700">Government & Peace</span> — Endless reign from David's throne</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (7): <span className="font-sans font-semibold text-yellow-700">Zeal Established</span> — LORD's zeal accomplishes this</span>
            </div>
          </div>

          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="text-xs font-bold text-red-600 mb-1">PART 2: JUDGMENT REFRAIN (8-21)</div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>C (8-12): <span className="font-sans font-semibold text-gray-700">Pride Judged</span> — "His anger is not turned away"</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>D (13-17): <span className="font-sans font-semibold text-red-700">Leaders Judged</span> — "His anger is not turned away"</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-slate-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>E (18-21): <span className="font-sans font-semibold text-slate-700">Wickedness Judged</span> — "His anger is not turned away"</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>Part 1 - A ↔ A':</strong> The transformation from darkness to light (vv. 1-2) is guaranteed by the LORD's zeal (v. 7). What seems impossible—light piercing deep darkness—is certain because God Himself will accomplish it.</li>
              <li><strong>Part 1 - B ↔ B':</strong> The joy and liberation from oppression (vv. 3-5) finds its fulfillment in the child's eternal government (v. 6b-7). The broken yoke and burned weapons point to a king who brings lasting peace, not just temporary relief.</li>
              <li><strong>Part 1 - Center (vv. 6-7):</strong> The four throne names—Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace—are the answer to everything. This child is both fully divine and the perfect king, bringing wisdom, power, care, and peace forever.</li>
              <li><strong>Part 2 - Refrain Pattern:</strong> The repeated phrase "His anger is not turned away, His hand is still raised to strike" (vv. 12, 17, 21) shows God's sustained judgment against pride, corrupt leadership, and wickedness. The refrain structure emphasizes that sin brings inevitable, ongoing consequences.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The two-part structure creates a stark contrast: while the promised child brings light, joy, and endless peace (1-7), those who reject Him face repeated judgment (8-21). The Prince of Peace is the only escape from God's righteous anger.</p>
        </div>
      </div>
    </div>
  );
}
