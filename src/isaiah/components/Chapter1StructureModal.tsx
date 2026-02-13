interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter1StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 1 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">The Rebellious Nation and the Invitation to Return</p>
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
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on God's invitation to reason together, framed by rebellion and restoration:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (2-9): <span className="font-sans font-semibold text-red-700">Rebellion & Devastation</span> — Ungrateful children, wounded nation, remnant spared</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (10-15): <span className="font-sans font-semibold text-gray-700">Empty Worship</span> — Sacrifices and prayers God refuses to hear</span>
            </div>
            <div className="ml-8 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>C (16-17): <span className="font-sans font-semibold text-blue-700">Call to Justice</span> — Wash, do right, defend the oppressed</span>
            </div>
            <div className="ml-12 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-green-800 font-bold">★ CENTER (18-20): Divine Invitation</span>
            </div>
            <div className="ml-16 text-green-700 font-sans italic pl-5">"Though your sins are like scarlet, they shall be as white as snow"</div>
            <div className="mt-3 ml-8 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>C' (21-23): <span className="font-sans font-semibold text-purple-700">Corruption Exposed</span> — Faithful city becomes prostitute, leaders love bribes</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (24-26): <span className="font-sans font-semibold text-teal-700">Purification Promise</span> — God will refine away dross, restore righteous judges</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-pink-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (27-31): <span className="font-sans font-semibold text-pink-700">Redemption & Judgment</span> — Penitent delivered, rebels consumed by fire</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The chapter opens with Israel's rebellion and devastation (vv. 2-9) and closes with the final verdict separating the redeemed from rebels (vv. 27-31). Both sections address the consequences of choices—God preserves a remnant at the start, and at the end divides between penitent and persistent rebels. What begins with mercy for survivors ends with justice for those who refuse to turn.</li>
              <li><strong>B ↔ B':</strong> God's rejection of empty worship (vv. 10-15) finds its answer in His promise to purify and restore (vv. 24-26). The same God who won't accept blood-stained sacrifices promises to remove the dross and restore righteous judges. Worship is meaningless until purification happens—then true worship can resume.</li>
              <li><strong>C ↔ C':</strong> The call to wash and pursue justice (vv. 16-17) stands in stark contrast to the corruption exposed (vv. 21-23). God commands them to defend orphans and widows, but the reality is leaders love bribes and ignore the vulnerable. The gap between what God requires and what His people practice is the crisis the chapter addresses.</li>
              <li><strong>Center (vv. 18-20):</strong> At the heart stands God's stunning invitation: "Come, let us reason together." Despite scarlet sins, God offers snow-white cleansing. This isn't automatic—there's a choice: willing obedience brings blessing, rebellion brings the sword. The entire chapter pivots on this gracious offer of forgiveness that requires a response.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals that God's invitation to forgiveness stands at the center of everything. Rebellion and empty religion frame one side; on the other, God promises purification and a divided outcome. The choice is ours: will we accept the invitation to be cleansed, or persist in rebellion until judgment arrives?</p>
        </div>
      </div>
    </div>
  );
}
