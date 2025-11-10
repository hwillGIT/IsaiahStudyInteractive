interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter10StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 10 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">Assyria: God's Rod and the Remnant's Return</p>
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
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on God's sovereign timing: He will finish His work on Zion, THEN judge Assyria's pride. The structure reveals how God uses even arrogant empires as His instruments while holding them accountable:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-4): <span className="font-sans font-semibold text-red-700">Woe to Unjust Legislators</span> — Those who codify oppression face captivity</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (5-6): <span className="font-sans font-semibold text-orange-700">Assyria: God's Rod</span> — Commissioned as instrument of divine anger</span>
            </div>
            <div className="ml-8 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>C (7-11): <span className="font-sans font-semibold text-purple-700">Assyria's Arrogant Boasting</span> — Empire boasts of conquests, ignorant of God's plan</span>
            </div>
            <div className="ml-12 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-yellow-800 font-bold">★ CENTER (12-15): Divine Timing — "When the Lord has finished all his work...he will punish"</span>
            </div>
            <div className="ml-8 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>C' (16-19): <span className="font-sans font-semibold text-red-700">Fire Consumes the Mighty</span> — Assyria's forest burned, glory destroyed</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (20-27): <span className="font-sans font-semibold text-green-700">Remnant Returns + Deliverance</span> — No longer lean on oppressor, trust God alone</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (28-34): <span className="font-sans font-semibold text-gray-700">Proud Forest Felled</span> — Assyria's march halted, lofty brought low</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The chapter opens with unjust human legislators (vv. 1-4) and closes with God judging Assyria's prideful march (vv. 28-34). Both sections expose corrupt power—first Israel's oppressors, then the foreign empire. What begins with legislative injustice ends with military arrogance, both cut down by divine judgment.</li>
              <li><strong>B ↔ B':</strong> Assyria as God's rod of anger (vv. 5-6) finds its answer in the remnant's deliverance (vv. 20-27). The same power used to discipline Israel will be broken. Where Israel once leaned on oppressors, the remnant will lean on the LORD alone—the rod becomes kindling.</li>
              <li><strong>C ↔ C':</strong> Assyria's arrogant boasting about conquests (vv. 7-11) contrasts with fire consuming their glory (vv. 16-19). The empire that bragged "my hand has reached kingdoms" will see God's fire reduce its forest to stumps a child can count. Boasting meets burning.</li>
              <li><strong>Center (vv. 12-15):</strong> The pivot point reveals God's sovereign timing: He will FIRST finish His disciplinary work on Zion, THEN punish Assyria's pride. Verses 13-15 mock the tool that thinks it controls the craftsman—does the axe boast over the woodcutter? This paradox sits at the heart: Assyria is both God's instrument AND accountable for its evil intentions.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern teaches that God uses even arrogant empires as His tools while holding them fully responsible for their motives. Sovereignty and accountability coexist—the rod that strikes will itself be broken, but only when God's purposes are complete.</p>
        </div>
      </div>
    </div>
  );
}
