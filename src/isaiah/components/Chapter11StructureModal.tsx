interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter11StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Chapter 11 Structure</h3>
              <p className="text-sm text-gray-600 mt-1">The Messiah's Reign and the Peaceable Kingdom</p>
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
          <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on the Messiah as banner to the nations. From Israel's king to the world's hope, the structure expands outward to embrace all peoples:</p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded mt-0.5 flex-shrink-0"></div>
              <span>A (1-5): <span className="font-sans font-semibold text-purple-700">The Messiah's Character</span> — Spirit-filled shoot from Jesse, righteous judge</span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B (6-9): <span className="font-sans font-semibold text-green-700">The Peaceable Kingdom</span> — Wolf with lamb, earth full of God's knowledge</span>
            </div>
            <div className="ml-8 bg-blue-100 px-2 py-1 rounded border-l-4 border-blue-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-blue-800 font-bold">★ CENTER (10): Banner to the Nations — "Root of Jesse stands as signal—nations shall inquire of him"</span>
            </div>
            <div className="ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>B' (11-13): <span className="font-sans font-semibold text-orange-700">Unity & Gathering</span> — Second exodus, Ephraim/Judah reunited, scattered assembled</span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>A' (14-16): <span className="font-sans font-semibold text-orange-700">God's Power Manifested</span> — Enemies defeated, highway from Assyria like exodus from Egypt</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li><strong>A ↔ A':</strong> The Messiah empowered by God's Spirit (vv. 1-5) finds its parallel in God's outstretched hand wielding power (vv. 14-16). Both sections emphasize divine enabling—the Messiah equipped with seven-fold Spirit, and God's arm creating highways through impossible obstacles. The shoot becomes the strength.</li>
              <li><strong>B ↔ B':</strong> The peaceable kingdom where predators dwell with prey (vv. 6-9) mirrors the reunification of divided Israel (vv. 11-13). Just as the wolf lies with the lamb, Ephraim's jealousy of Judah departs. External peace in creation reflects internal peace among God's people—both require supernatural transformation.</li>
              <li><strong>Center (v. 10):</strong> The pivot declares that the "root of Jesse" becomes a "signal for the peoples." This is the theological hinge: what began as Israel's messianic king (A) expands to become the nations' banner (center). The vision shifts from Jewish Messiah to Gentile hope. Verse 10's "nations shall inquire of him" unlocks everything that follows—the global regathering (B') and worldwide victory (A').</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals how personal transformation (shoot from Jesse's stump) leads to cosmic peace (peaceable kingdom), culminating in universal salvation (nations' banner), then reversing outward: unified people return (B') through God's mighty hand (A'). Verse 10 is the key—when the root of Jesse stands as a banner, the whole world is invited home.</p>
        </div>
      </div>
    </div>
  );
}
