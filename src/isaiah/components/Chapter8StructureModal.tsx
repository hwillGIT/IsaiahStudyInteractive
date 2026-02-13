interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter8StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">Chapter 8 Structure</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on "God with us," showing how the same God becomes either sanctuary or stumbling stone:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-4): <span className="font-sans font-semibold text-teal-700">Testimony & Witnesses</span> — Prophetic sign recorded</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (5-8): <span className="font-sans font-semibold text-blue-700">Waters Overflow</span> — Assyrian flood threatens</span>
            </div>
            <div className="ml-8 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-green-800 font-bold">★ CENTER (9-10): Immanuel - God With Us</span>
            </div>
            <div className="ml-12 text-green-700 font-sans italic pl-5">"For God is with us"</div>
            <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (11-15): <span className="font-sans font-semibold text-purple-700">Sanctuary or Stumbling Stone</span> — God becomes trap or refuge</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (16-20): <span className="font-sans font-semibold text-orange-700">Testimony Sealed</span> — Record preserved among disciples</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The chapter opens with testimony and witnesses recorded (vv. 1-4) and closes with the testimony sealed and preserved among disciples (vv. 16-20). God's word is documented and protected—whether people believe it or not, the truth stands forever.</li>
              <li><strong>B ↔ B':</strong> The Assyrian flood threatens to overwhelm (vv. 5-8), but God Himself becomes either sanctuary (protection from the flood) or stumbling stone (causing people to fall into it) in verses 11-15. The same disaster that destroys some preserves others—the difference is their response to God.</li>
              <li><strong>Center (vv. 9-10):</strong> At the heart stands the proclamation "Immanuel—God is with us." No matter what enemies plot or how overwhelming the threats, God's presence with His people guarantees their survival. This central truth answers all fear: if God is with us, who can stand against us?</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals a profound truth: God's presence (center) determines everything. The same God who preserves His testimony (outer frame) and confronts His people with disaster (inner frame) becomes either refuge or ruin based entirely on how we respond to Him. Immanuel is the answer—but only for those who make Him their sanctuary.</p>
        </div>
      </div>
    </div>
  );
}
