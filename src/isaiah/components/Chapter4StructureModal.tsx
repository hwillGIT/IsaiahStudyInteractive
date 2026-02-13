interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Chapter4StructureModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">
              Chapter 4 Structure
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">
            This chapter shows a symmetrical pattern with restoration at
            the center, framed by glory revealed:
          </p>
          <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>
                A (1):{" "}
                <span className="font-sans font-semibold text-red-700">
                  Desperation After Judgment
                </span>{" "}
                — Seven women seeking one man
              </span>
            </div>
            <div className="ml-4 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>
                B (2):{" "}
                <span className="font-sans font-semibold text-green-700">
                  The Branch - Glory Revealed
                </span>{" "}
                — Beautiful and glorious
              </span>
            </div>
            <div className="ml-8 bg-blue-100 px-2 py-1 rounded border-l-4 border-blue-600 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded mt-0.5 flex-shrink-0"></div>
              <span className="font-sans text-blue-800 font-bold">
                ★ CENTER (3-4): Cleansing & Holiness
              </span>
            </div>
            <div className="ml-12 text-blue-700 font-sans italic pl-5">
              "Called holy... purges Jerusalem's bloodstains"
            </div>
            <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
              <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>
                B' (5):{" "}
                <span className="font-sans font-semibold text-green-700">
                  God's Glory as Canopy
                </span>{" "}
                — Cloud and fire over Zion
              </span>
            </div>
            <div className="ml-0 flex items-start gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
              <span>
                A' (6):{" "}
                <span className="font-sans font-semibold text-blue-700">
                  Complete Protection
                </span>{" "}
                — Shelter from all threats
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-800 mb-3">
              How the Parallels Connect:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <li>
                <strong>A ↔ A':</strong> The chapter opens with desperate
                women seeking protection from one man (v. 1) and closes
                with God providing complete shelter and protection for His
                people (v. 6). Human desperation for covering finds its
                answer in divine covering—God Himself becomes their
                refuge.
              </li>
              <li>
                <strong>B ↔ B':</strong> The Branch described as
                "beautiful and glorious" (v. 2) is matched by God's glory
                appearing as a visible canopy over Zion (v. 5). The
                messianic figure brings God's glory, and that glory then
                covers and protects His people.
              </li>
              <li>
                <strong>Center (vv. 3-4):</strong> At the heart stands
                God's cleansing work—making the remnant holy and washing
                away bloodstains. This purification is the necessary
                bridge between judgment (ch. 3) and restoration (ch. 4).
                Only after cleansing can God's protective presence return.
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 mt-4 italic">
            The symmetrical pattern reveals God's restorative plan: from
            desperation to divine covering, with cleansing at the center.
            The Branch brings glory, glory brings purification, and
            purification enables God's protective presence to return.
          </p>
        </div>
      </div>
    </div>
  );
}
