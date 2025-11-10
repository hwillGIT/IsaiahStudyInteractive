interface Props {
  show: boolean;
  onClose: () => void;
}

export function Chapter6StructureModal({ show, onClose }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">Chapter 6 Structure</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">This chapter follows a symmetrical pattern where each section mirrors another, with verse 8 at the center as the divine commissioning:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-4): <span className="font-sans font-semibold text-blue-700">Vision of Glory</span> — Earth filled with God's glory</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (5): <span className="font-sans font-semibold text-orange-700">Isaiah's Cry</span> — "Woe is me! I am undone"</span>
            </div>
            <div className="ml-8 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>C (6-7): <span className="font-sans font-semibold text-purple-700">Cleansing by Fire</span> — Sin purged, guilt removed</span>
            </div>
            <div className="ml-12 bg-teal-100 px-2 py-1 rounded border-l-4 border-teal-500 flex items-start gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-teal-800 font-bold">★ D (8): CENTER — Divine Commissioning — "Whom shall I send?" — "Here am I; send me!"</span>
            </div>
            <div className="ml-8 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>C' (9-10): <span className="font-sans font-semibold text-gray-700">Hardening Message</span> — Hearts hardened, not healed</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (11a): <span className="font-sans font-semibold text-red-700">Isaiah's Question</span> — "How long, O Lord?"</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (11b-13): <span className="font-sans font-semibold text-green-700">Vision of Desolation</span> — Earth a desolate waste</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The chapter opens with earth filled with God's glory (v. 3) but closes with earth as a desolate waste (v. 11-12). This shows how human sin transforms God's glorious presence into devastating judgment.</li>
              <li><strong>B ↔ B':</strong> Isaiah's confession "Woe is me!" (v. 5) finds its answer in his persistent question "How long, O Lord?" (v. 11). Once convicted and cleansed, the prophet can now faithfully ask how long God's judgment must continue.</li>
              <li><strong>C ↔ C':</strong> The cleansing that removes Isaiah's sin (vv. 6-7) contrasts sharply with the hardening message he must deliver (vv. 9-10). God heals Isaiah so he can proclaim that others will not be healed—a painful irony showing that encounter with holiness either transforms or hardens.</li>
              <li><strong>D (Center):</strong> The commissioning (v. 8) is the turning point. Only after being purified by God's holiness can Isaiah respond "Send me!" This central moment shows that divine cleansing enables faithful service, even when that service involves difficult messages.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern emphasizes that encountering God's holiness transforms everything—from glory to judgment, from personal conviction to prophetic mission, from cleansing to hardening, depending on how hearts respond.</p>
        </div>
      </div>
    </div>
  );
}
