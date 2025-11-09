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
  { number: 1, text: "You will say in that day: 'I will give thanks to you, O LORD, for though you were angry with me, your anger turned away, that you might comfort me.'", group: 1, isHinge: true, hingeType: 'turn-thanksgiving' },
  { number: 2, text: "'Behold, God is my salvation; I will trust, and will not be afraid; for the LORD GOD is my strength and my song, and he has become my salvation.'", group: 1 },
  { number: 3, text: "With joy you will draw water from the wells of salvation.", group: 1, isHinge: true, hingeType: 'hinge' },
  { number: 4, text: "And you will say in that day: 'Give thanks to the LORD, call upon his name, make known his deeds among the peoples, proclaim that his name is exalted.'", group: 2, isHinge: true, hingeType: 'turn-proclamation' },
  { number: 5, text: "'Sing praises to the LORD, for he has done gloriously; let this be made known in all the earth.'", group: 2 },
  { number: 6, text: "'Shout, and sing for joy, O inhabitant of Zion, for great in your midst is the Holy One of Israel.'", group: 2 },
];

const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: 'Personal Thanksgiving',
    2: 'Corporate Proclamation'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: 'Individual praise—God\'s anger turned to comfort, drawing from wells of salvation',
    2: 'Communal witness—proclaim His name, shout for joy, the Holy One dwells in Zion'
  };
  return transitions[group] || 'Transition in the song of praise';
};

const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-blue-500',
    2: 'bg-green-500'
  };
  return colors[group] || 'bg-gray-400';
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'turn-thanksgiving': 'bg-blue-400',
    'hinge': 'bg-yellow-400',
    'turn-proclamation': 'bg-green-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'turn-thanksgiving': 'Narrative Transition (v1) — From God\'s anger to His comfort: thanksgiving for turned-away wrath',
    'hinge': 'Chiastic Center (v3) — The heart of salvation: with joy drawing water from wells of deliverance',
    'turn-proclamation': 'Dramatic Turn (v4) — From personal praise to global mission: make His deeds known among all peoples'
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
    seeing: "This verse moves from past anger to present comfort. The thanksgiving isn't despite God's anger but because His anger 'turned away.' The remnant recognizes both God's righteous judgment and His merciful restoration.",
    life: "Can you thank God for discipline that led to healing? This verse shows mature faith: acknowledging God's justified anger while celebrating His comfort. Past correction becomes cause for present gratitude.",
    teach: "True thanksgiving includes the whole story—God's anger against sin AND His comfort in restoration. Shallow praise ignores our need for judgment; deep thanksgiving embraces both discipline and deliverance."
  },
  2: {
    seeing: "This verse echoes Exodus 15:2 (Moses' song after Red Sea deliverance), showing this anticipated deliverance is like a second exodus. 'God is my salvation' replaces fear with trust, anxiety with confidence.",
    life: "What replaces 'I will not be afraid' in your life? This verse gives the antidote to fear: God as salvation, strength, and song. When He becomes these, fear loses its grip.",
    teach: "Salvation produces a three-fold result: trust (I will trust), courage (not be afraid), and joy (my song). God doesn't just save us FROM something but FOR relationship with Him as our strength and delight."
  },
  3: {
    seeing: "The chiastic center uses the metaphor of drawing water—essential, refreshing, life-giving. 'With joy' emphasizes the attitude; salvation isn't just received but celebrated. Wells suggest abundant, ongoing supply.",
    life: "Are you drawing from salvation's wells with joy or duty? This verse invites delight in God's provision. Salvation isn't a one-time event but an ongoing source you can draw from daily.",
    teach: "The 'wells of salvation' (plural) suggest multiple dimensions of God's deliverance—spiritual, emotional, physical. Joy characterizes the drawing, showing salvation brings not just relief but celebration."
  },
  4: {
    seeing: "The dramatic shift from 'you' (v1-3, individual) to 'you' (v4-6, plural/corporate) marks the transition from personal testimony to communal mission. Thanksgiving must become proclamation—God's deeds must be made known among peoples.",
    life: "Does your thanksgiving stay private or become proclamation? This verse challenges you to move from closet worship to global witness. Personal salvation has public implications.",
    teach: "True thanksgiving is missional. If God's salvation is real, it can't stay secret. The redeemed community has a mandate: make His name known, proclaim His exaltation among all peoples."
  },
  5: {
    seeing: "'He has done gloriously'—the verb tense matters. Past accomplishment becomes present praise and future proclamation. The call is for earth-wide testimony: 'let this be made known in all the earth.'",
    life: "Who needs to hear what God has done in your life? This verse gives you permission to celebrate loudly—God's glorious deeds deserve global announcement, not polite whispers.",
    teach: "Worship is inherently evangelistic. When we sing praises for what God 'has done gloriously,' we're testifying to the watching world. Praise becomes witness; worship becomes mission."
  },
  6: {
    seeing: "The final verse crescendos: shout, sing for joy! The reason: 'great in your midst is the Holy One of Israel.' God's presence (Immanuel, chapters 7-12) completes the Book of Immanuel. He dwells among His people.",
    life: "The Holy One isn't distant but 'in your midst.' Does this reality make you want to shout? This verse invites exuberant joy because God Himself lives among His people.",
    teach: "The culmination of Isaiah 1-12: God's presence with His people (Immanuel) produces irrepressible joy. The Holy One dwelling in Zion is the ultimate cause for celebration—our salvation rests in His proximity."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Psalm 30:5 - His anger is but for a moment, His favor is for a lifetime", "Isaiah 54:7-8 - For a brief moment I forsook you, but with great compassion I will gather you"],
    to: ["2 Corinthians 5:18-19 - God was reconciling the world to Himself through Christ", "Romans 5:9-10 - If while we were enemies we were reconciled, how much more saved by His life"],
    context: "God's anger serves restoration, not destruction. This theme reaches fulfillment in Christ, who bore God's wrath so His anger could turn away from us permanently."
  },
  2: {
    from: ["Exodus 15:2 - The LORD is my strength and my song; He has become my salvation", "Psalm 118:14 - The LORD is my strength and my song; He has become my salvation"],
    to: ["Philippians 4:13 - I can do all things through Christ who strengthens me", "Revelation 15:3 - They sing the song of Moses and the song of the Lamb"],
    context: "Isaiah's song echoes Moses' Red Sea song and anticipates Revelation's final victory song. The same God who delivered Israel from Egypt delivers His people through Christ, the ultimate exodus."
  },
  3: {
    from: ["John 4:10-14 - Whoever drinks of the water I give will never thirst", "Jeremiah 2:13 - They have forsaken Me, the fountain of living waters"],
    to: ["John 7:37-39 - If anyone thirsts, let him come to Me and drink; out of his heart will flow rivers", "Revelation 22:17 - Let the one who is thirsty come; let the one who desires take the water of life"],
    context: "The wells of salvation find fulfillment in Jesus, who offers living water. What Isaiah anticipates, Jesus provides—eternal springs of salvation for all who come and drink."
  },
  4: {
    from: ["Psalm 105:1 - Give thanks, call upon His name, make known His deeds among the peoples", "1 Chronicles 16:8 - Give thanks, call upon His name, make known His deeds"],
    to: ["Matthew 28:19-20 - Go and make disciples of all nations", "Acts 1:8 - You will be My witnesses to the ends of the earth"],
    context: "The call to 'make known His deeds among the peoples' becomes the Great Commission. What Israel was called to proclaim finds global fulfillment in the church's missionary mandate."
  },
  6: {
    from: ["Exodus 25:8 - Let them make Me a sanctuary that I may dwell among them", "Ezekiel 37:27 - My dwelling place shall be with them"],
    to: ["John 1:14 - The Word became flesh and dwelt among us", "Revelation 21:3 - Behold, the dwelling place of God is with man"],
    context: "The Holy One dwelling in Zion points to Immanuel (God with us) in Jesus and culminates in Revelation's new creation where God dwells eternally with His people. The arc from Exodus to Revelation centers on divine presence."
  }
};

function Chapter12() {
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
        <ChapterNavigation currentChapter={12} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 12</h1>
          <p className="text-gray-600 text-lg">Song of Thanksgiving and Praise</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thematic Groups</h2>
          <p className="text-sm text-gray-600 mb-6">Click any verse to explore deeper reflections and connections</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        </div>

        <StructureButton 
          onClick={() => setShowStructureModal(true)}
          subtitle="See the song of salvation"
        />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
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
                  <h2 className="text-2xl font-bold text-gray-800">Chapter 12 Structure</h2>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">This brief hymn displays perfect symmetry centered on the wells of salvation. Personal gratitude flows through joy to worldwide proclamation—from "I will give thanks" to "make known among all peoples":</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-2): <span className="font-sans font-semibold text-blue-700">Personal Thanksgiving</span> — "I will give thanks...God is my salvation"</span>
                  </div>
                  <div className="ml-4 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-600 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-yellow-800 font-bold">★ CENTER (3): Wells of Salvation</span>
                  </div>
                  <div className="ml-8 text-yellow-700 font-sans italic pl-5">"With joy you will draw water from the wells of salvation"</div>
                  <div className="mt-3 ml-0 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (4-6): <span className="font-sans font-semibold text-green-700">Corporate Proclamation</span> — "Make known His deeds among the peoples"</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>A ↔ A':</strong> "I will give thanks" (v. 1) expands to "you will say...give thanks, call upon his name, make known his deeds" (v. 4). Personal testimony becomes communal witness. Individual salvation experienced privately (A) must be declared publicly among all nations (A'). What begins as "my" salvation ends as a global proclamation.</li>
                    <li><strong>Center (v. 3):</strong> The pivot verse—"with joy you will draw water from the wells of salvation"—transforms singular thanksgiving into plural mission. The shift from "I" (v. 1) to "you" (v. 3) to "you...the peoples" (v. 4) traces the gospel's widening radius. The wells are inexhaustible; salvation isn't hoarded but shared. Joy is the hinge emotion: gratitude (A) becomes joy (center) that overflows into praise (A').</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">This three-part structure mirrors the gospel rhythm: receive salvation personally (A), drink deeply with joy (center), then go tell the world (A'). Chapter 12 concludes Isaiah 1-12 by showing that God's salvation—once received—compels witness. The one who draws from the well cannot stay silent. Personal thanksgiving erupts into global proclamation.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter12;
