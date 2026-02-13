interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter7StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 7 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">The Sign of Immanuel - God With Us</p>
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
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on the Immanuel sign, with prophetic word framing the divine promise:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-9): <span className="font-sans font-semibold text-red-700">Prophetic Reassurance</span> — "Do not fear these smoldering stumps"</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (10-11): <span className="font-sans font-semibold text-blue-700">Invitation to Ask</span> — "Ask for a sign from the LORD"</span>
            </div>
            <div className="ml-8 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-green-800 font-bold">★ CENTER (12-14): The Immanuel Sign</span>
            </div>
            <div className="ml-12 text-green-700 font-sans italic pl-5">"The virgin shall conceive... God with us"</div>
            <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (12): <span className="font-sans font-semibold text-blue-700">Refusal to Ask</span> — "I will not ask, nor test the LORD"</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (15-25): <span className="font-sans font-semibold text-purple-700">Prophetic Judgment</span> — Assyrian invasion and desolation</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The chapter opens with Isaiah's prophetic reassurance—"Do not fear" (vv. 1-9)—but closes with prophetic warnings of judgment through Assyria (vv. 15-25). God offers peace, but rejecting His word brings the very disaster He promised to prevent.</li>
              <li><strong>B ↔ B':</strong> God graciously invites Ahaz to ask for any sign (vv. 10-11), but Ahaz piously refuses (v. 12). This seeming humility is actually faithless rebellion—refusing to trust God's promise by refusing to test it. Faith that won't accept confirmation isn't faith at all.</li>
              <li><strong>Center (vv. 12-14):</strong> Despite Ahaz's refusal, God gives the sign anyway—Immanuel, "God with us." This is the ultimate promise: God Himself will dwell among His people through a virgin-born son. The sign transcends the immediate crisis, pointing to the Messiah who is both fully divine ("God") and fully present ("with us").</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals that God's grace persists even when rejected. Ahaz refuses the sign, but God gives it anyway—not just for one crisis, but as the eternal answer to all human need. Immanuel stands at the center, God's unshakeable promise despite human faithlessness.</p>
        </div>
      </div>
    </div>
  );
}
