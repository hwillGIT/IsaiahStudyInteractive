interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter5StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Chapter 5 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">The Song of the Vineyard and Six Woes</p>
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
          <p className="text-sm text-gray-600 mb-4">This chapter shows a vineyard parable followed by five woe pronouncements, with verse 7 as the hinge revealing the vineyard's identity:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-7): <span className="font-sans font-semibold text-purple-700">Song of the Vineyard</span> — God's perfect care produces wild grapes</span>
            </div>
            <div className="ml-4 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-400 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-yellow-800 font-bold">★ TURNING POINT (7): VERDICT — The vineyard is Israel</span>
            </div>
            <div className="ml-8 text-yellow-700 font-sans italic pl-5">"He looked for justice, but behold, bloodshed"</div>
            <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (8-10): <span className="font-sans font-semibold text-orange-700">Woe #1 - The Greedy</span> — Land-grabbers face desolation</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>C (11-17): <span className="font-sans font-semibold text-red-700">Woe #2 - Drunkards</span> — Those who ignore God's works face exile</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>D (18-21): <span className="font-sans font-semibold text-yellow-700">Woe #3 - Mockers</span> — Inverting good and evil</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>E (22-25): <span className="font-sans font-semibold text-pink-700">Woe #4 - Corrupt Judges</span> — Bribery and injustice consumed like stubble</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>F (26-30): <span className="font-sans font-semibold text-gray-700">Woe #5 - The Invading Army</span> — God summons distant nations as judgment</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How This Unfolds:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>Before the Turning Point (vv. 1-6):</strong> The vineyard parable presents a puzzle—God did everything right for His vineyard, but it produced only wild grapes. The imagery is beautiful but perplexing. Who is this disappointing vineyard?</li>
              <li><strong>Turning Point (v. 7):</strong> The stunning revelation: "The vineyard of the LORD of hosts is the house of Israel." God expected justice but found bloodshed; He expected righteousness but heard cries of distress. The wordplay emphasizes the tragic irony—what sounds similar (justice/bloodshed) reveals how close Israel came, yet how far they fell.</li>
              <li><strong>After the Turning Point (vv. 8-30):</strong> The five woes detail exactly how Israel produced "wild grapes." Each woe expands on a specific failure: greed (#1), drunken indifference (#2), mocking God (#3), moral confusion (#4), and corrupt leadership (#5). The final section (vv. 26-30) shows God's response—summoning foreign armies as judgment.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The structure moves from mystery to revelation to specification. The vineyard parable asks "What went wrong?" The turning point answers "Israel failed." The woes detail "Here's exactly how they failed." Together, they paint a comprehensive picture of a nation that received everything but returned nothing.</p>
        </div>
      </div>
    </div>
  );
}
