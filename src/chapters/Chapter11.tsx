import { useState } from 'react';
import { ChapterNavigation } from '../components/ChapterNavigation';
import { StructureButton } from '../components/StructureButton';

interface Verse {
  number: number;
  text: string;
  group: number;
  isHinge?: boolean;
  hingeType?: string;
}

interface Connection {
  from?: string[];
  to?: string[];
  context?: string;
}

const verses: Verse[] = [
  { number: 1, text: "There shall come forth a shoot from the stump of Jesse, and a branch from his roots shall bear fruit.", group: 1, isHinge: true, hingeType: 'turn-messiah' },
  { number: 2, text: "And the Spirit of the LORD shall rest upon him, the Spirit of wisdom and understanding, the Spirit of counsel and might, the Spirit of knowledge and the fear of the LORD.", group: 1 },
  { number: 3, text: "And his delight shall be in the fear of the LORD. He shall not judge by what his eyes see, or decide disputes by what his ears hear,", group: 1 },
  { number: 4, text: "but with righteousness he shall judge the poor, and decide with equity for the meek of the earth; and he shall strike the earth with the rod of his mouth, and with the breath of his lips he shall kill the wicked.", group: 1 },
  { number: 5, text: "Righteousness shall be the belt of his waist, and faithfulness the belt of his loins.", group: 1, isHinge: true, hingeType: 'hinge' },
  { number: 6, text: "The wolf shall dwell with the lamb, and the leopard shall lie down with the young goat, and the calf and the lion and the fattened calf together; and a little child shall lead them.", group: 2 },
  { number: 7, text: "The cow and the bear shall graze; their young shall lie down together; and the lion shall eat straw like the ox.", group: 2 },
  { number: 8, text: "The nursing child shall play over the hole of the cobra, and the weaned child shall put his hand on the adder's den.", group: 2 },
  { number: 9, text: "They shall not hurt or destroy in all my holy mountain; for the earth shall be full of the knowledge of the LORD as the waters cover the sea.", group: 2 },
  { number: 10, text: "In that day the root of Jesse, who shall stand as a signal for the peoples—of him shall the nations inquire, and his resting place shall be glorious.", group: 3, isHinge: true, hingeType: 'turn-nations' },
  { number: 11, text: "In that day the Lord will extend his hand yet a second time to recover the remnant that remains of his people, from Assyria, from Egypt, from Pathros, from Cush, from Elam, from Shinar, from Hamath, and from the coastlands of the sea.", group: 4 },
  { number: 12, text: "He will raise a signal for the nations and will assemble the banished of Israel, and gather the dispersed of Judah from the four corners of the earth.", group: 4 },
  { number: 13, text: "The jealousy of Ephraim shall depart, and those who harass Judah shall be cut off; Ephraim shall not be jealous of Judah, and Judah shall not harass Ephraim.", group: 4 },
  { number: 14, text: "But they shall swoop down on the shoulder of the Philistines in the west, and together they shall plunder the people of the east. They shall put out their hand against Edom and Moab, and the Ammonites shall obey them.", group: 4 },
  { number: 15, text: "And the LORD will utterly destroy the tongue of the Sea of Egypt, and will wave his hand over the River with his scorching breath, and strike it into seven channels, and he will lead people across in sandals.", group: 4 },
  { number: 16, text: "And there will be a highway from Assyria for the remnant that remains of his people, as there was for Israel when they came up from the land of Egypt.", group: 4 },
];

const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: 'The Messiah\'s Character',
    2: 'The Peaceable Kingdom',
    3: 'Banner to the Nations',
    4: 'Restoration & Regathering'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: 'A shoot from Jesse\'s stump—Spirit-empowered, righteous judge',
    2: 'Predator and prey at peace—knowledge of God fills the earth',
    3: 'Root of Jesse stands as signal—nations seek Him',
    4: 'Second exodus—remnant gathered from earth\'s four corners'
  };
  return transitions[group] || 'Transition in messianic vision';
};

const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-purple-600',
    2: 'bg-green-500',
    3: 'bg-blue-500',
    4: 'bg-orange-500'
  };
  return colors[group] || 'bg-gray-400';
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'turn-messiah': 'bg-purple-400',
    'hinge': 'bg-yellow-400',
    'turn-nations': 'bg-blue-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'turn-messiah': 'Narrative Transition (v1) — From judgment\'s stump to new life: a shoot from Jesse brings messianic hope',
    'hinge': 'Chiastic Center (v5) — The foundation of His reign: righteousness and faithfulness define the Messiah\'s character',
    'turn-nations': 'Dramatic Turn (v10) — From Israel\'s king to world\'s hope: the root of Jesse becomes a banner for all peoples'
  };
  return explanations[hingeType] || 'Structural transition point';
};

const getUniqueHingeTypes = (): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
};

const reflectionContent: Record<number, {seeing: string, life: string, teach: string}> = {
  1: {
    seeing: "The 'stump of Jesse' is a cut-down tree—the Davidic dynasty appeared dead after Babylon's conquest. Yet God promises a new shoot will emerge. Naming Jesse (David's father) emphasizes humble beginnings over royal grandeur.",
    life: "When everything seems cut off—career, relationships, hopes—God can bring new life from dead stumps. The Messiah came from a dynasty that looked finished. Your dead ends might be God's new beginnings.",
    teach: "The Messiah's lineage was prophesied to appear dead before His arrival. This 'stump theology' shows God's pattern: resurrection life springs from apparent death, fulfilling promises when circumstances suggest impossibility."
  },
  5: {
    seeing: "This verse describes the Messiah's essential character: righteousness as His belt (holds everything together) and faithfulness as His foundation. These aren't just qualities He has—they define everything He does.",
    life: "What 'belts' hold your life together? The Messiah's core is righteousness and faithfulness. When these become your foundation, everything else in life aligns properly around them.",
    teach: "The chiastic center reveals what matters most: not the Messiah's power or miracles, but His righteous and faithful character. Power without righteousness corrupts; miracles without faithfulness mislead. Character is central."
  },
  10: {
    seeing: "The 'root of Jesse' now stands as a 'signal for the peoples'—a dramatic expansion from Israel's king to the nations' hope. Paul quotes this verse in Romans 15:12 to explain the gospel going to Gentiles.",
    life: "Jesus didn't come just for one group but as hope for all. This verse invites you to see beyond tribal boundaries—God's salvation plan includes every nation, tongue, and people seeking the root of Jesse.",
    teach: "The Messiah's mission has two phases: first to Israel as promised, then as a banner to all nations. This verse bridges the testaments, showing God's covenant faithfulness to Israel fulfilled in cosmic salvation."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["2 Samuel 7:12-16 - Your house and kingdom shall endure forever", "Jeremiah 23:5 - I will raise up for David a righteous Branch"],
    to: ["Matthew 1:1 - The book of the genealogy of Jesus Christ, the son of David", "Revelation 5:5 - The Lion of Judah, the Root of David, has conquered"],
    context: "The shoot from Jesse's stump is Jesus. Matthew and Revelation both identify Christ as this promised Branch from David's line, emerging after the dynasty appeared cut off."
  },
  5: {
    from: ["Psalm 89:14 - Righteousness and justice are the foundation of Your throne", "Jeremiah 23:6 - This is His name: The LORD is our righteousness"],
    to: ["Ephesians 6:14 - Stand therefore, having fastened on the belt of truth", "Philippians 2:8 - He humbled himself by becoming obedient to death"],
    context: "Righteousness and faithfulness aren't just traits but the Messiah's very essence. Jesus embodied this perfectly, and Paul calls believers to 'put on' these same qualities as spiritual armor."
  },
  10: {
    from: ["Numbers 21:8-9 - Set up a banner, and everyone who sees it shall live", "Isaiah 49:6 - I will make you as a light for the nations"],
    to: ["Romans 15:12 - The root of Jesse will come, to rule the Gentiles", "John 12:32 - If I am lifted up, I will draw all people to myself"],
    context: "Isaiah's prophecy that the root of Jesse would become a banner for the nations is fulfilled as Jesus draws all peoples to Himself. Paul quotes this verse to explain Gentile inclusion in God's plan."
  }
};

function Chapter11() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');

  const getCurrentReflection = (): string => {
    if (!selectedVerse) return '';
    const content = reflectionContent[selectedVerse.number];
    if (!content) return 'Reflection coming soon for this verse.';
    return content[activeReflectionMode];
  };

  const getConnection = (verseNum: number): Connection | undefined => {
    return scriptureConnections[verseNum];
  };

  const hasConnections = (verseNum: number): boolean => {
    const connection = scriptureConnections[verseNum];
    return !!(connection?.from?.length || connection?.to?.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <ChapterNavigation currentChapter={11} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 11</h1>
          <p className="text-gray-600 text-lg">The Messiah's Reign and the Peaceable Kingdom</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thematic Groups</h2>
              <p className="text-sm text-gray-600">Click any verse to explore deeper reflections and connections</p>
            </div>
            <StructureButton 
              onClick={() => setShowStructureModal(true)}
              subtitle="See the messianic kingdom unfold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {Array.from(new Set(verses.map(v => v.group))).map(group => (
              <div key={group} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-4 h-4 ${getColorClass(group)} rounded mt-0.5 flex-shrink-0`}></div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{getGroupName(group)}</div>
                  <div className="text-xs text-gray-600">{getGroupTransition(group)}</div>
                </div>
              </div>
            ))}
          </div>

          {getUniqueHingeTypes().length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-yellow-600">★</span> Key Structural Points
              </h3>
              <div className="space-y-1">
                {getUniqueHingeTypes().map(type => (
                  <div key={type} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className={`w-3 h-3 ${getHingeColor(type)} rounded mt-0.5 flex-shrink-0`}></div>
                    <span>{getHingeExplanation(type)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {verses.map((verse) => (
              <div key={verse.number} className="relative">
                <button
                  onClick={() => setSelectedVerse(verse)}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${getColorClass(verse.group)} border-opacity-50 hover:shadow-md hover:scale-105 text-white font-semibold relative`}
                  title={verse.text.substring(0, 100) + '...'}
                >
                  {verse.number}
                  {verse.isHinge && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${getHingeColor(verse.hingeType)} rounded-full animate-pulse`}></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Verse Detail Modal */}
        {selectedVerse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`${getColorClass(selectedVerse.group)} text-white px-3 py-1 rounded-full font-semibold`}>
                        Verse {selectedVerse.number}
                      </span>
                      {selectedVerse.isHinge && (
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 ${getHingeColor(selectedVerse.hingeType)} rounded-full`}></div>
                          <span className="text-xs text-gray-600">Key Point</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed">{selectedVerse.text}</p>
                  </div>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl ml-4"
                  >
                    ×
                  </button>
                </div>

                <div className="flex gap-2 mt-4 border-t pt-4">
                  <button
                    onClick={() => setActiveTab('reflections')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'reflections'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Reflections
                  </button>
                  {hasConnections(selectedVerse.number) && (
                    <button
                      onClick={() => setActiveTab('connections')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === 'connections'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Scripture Connections
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'reflections' && (
                  <div>
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setActiveReflectionMode('seeing')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          activeReflectionMode === 'seeing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Seeing Connections
                      </button>
                      <button
                        onClick={() => setActiveReflectionMode('life')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          activeReflectionMode === 'life'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        How This Helps My Life
                      </button>
                      <button
                        onClick={() => setActiveReflectionMode('teach')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          activeReflectionMode === 'teach'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        What This Teaches Us
                      </button>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{getCurrentReflection()}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'connections' && (
                  <div className="space-y-4">
                    {getConnection(selectedVerse.number)?.from && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Building From:</h3>
                        <ul className="space-y-1">
                          {getConnection(selectedVerse.number)!.from!.map((ref, i) => (
                            <li key={i} className="text-sm text-gray-700">→ {ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {getConnection(selectedVerse.number)?.to && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Pointing To:</h3>
                        <ul className="space-y-1">
                          {getConnection(selectedVerse.number)!.to!.map((ref, i) => (
                            <li key={i} className="text-sm text-gray-700">→ {ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {getConnection(selectedVerse.number)?.context && (
                      <div className="bg-purple-50 p-4 rounded-lg mt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Context:</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {getConnection(selectedVerse.number)!.context}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Structure Modal */}
        {showStructureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Chapter 11 Structure</h2>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">The Messianic King</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Chapter 11 is one of Scripture's most comprehensive messianic prophecies. From a cut-down stump (David's fallen dynasty) emerges a shoot—the Messiah empowered by God's Spirit. His reign brings both perfect justice and universal peace, expanding from Israel to become a banner for all nations. The chapter concludes with a second exodus, gathering God's people from earth's four corners. This prophecy bridges testaments, finding fulfillment in Jesus Christ.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Thematic Progression</h3>
                  <div className="space-y-3">
                    {Array.from(new Set(verses.map(v => v.group))).map((group, index) => (
                      <div key={group} className="flex items-start gap-3">
                        <span className="text-gray-500 font-mono text-sm mt-1">{index + 1}.</span>
                        <div className={`w-3 h-3 ${getColorClass(group)} rounded mt-1.5 flex-shrink-0`}></div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{getGroupName(group)}</div>
                          <div className="text-sm text-gray-600">{getGroupTransition(group)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter11;
