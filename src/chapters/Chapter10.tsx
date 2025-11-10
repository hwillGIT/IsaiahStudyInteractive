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
  { number: 1, text: "Woe to those who decree iniquitous decrees, and the writers who keep writing oppression,", group: 1 },
  { number: 2, text: "to turn aside the needy from justice and to rob the poor of my people of their right, that widows may be their spoil, and that they may make the fatherless their prey!", group: 1 },
  { number: 3, text: "What will you do on the day of punishment, in the ruin that will come from afar? To whom will you flee for help, and where will you leave your wealth?", group: 1 },
  { number: 4, text: "Nothing remains but to crouch among the prisoners or fall among the slain. For all this his anger has not turned away, and his hand is stretched out still.", group: 1 },
  { number: 5, text: "Ah, Assyria, the rod of my anger; the staff in their hands is my fury!", group: 2, isHinge: true, hingeType: 'transition-rod' },
  { number: 6, text: "Against a godless nation I send him, and against the people of my wrath I command him, to take spoil and seize plunder, and to tread them down like the mire of the streets.", group: 2 },
  { number: 7, text: "But he does not so intend, and his heart does not so think; but it is in his heart to destroy, and to cut off nations not a few;", group: 3 },
  { number: 8, text: "for he says: 'Are not my commanders all kings?'", group: 3 },
  { number: 9, text: "'Is not Calno like Carchemish? Is not Hamath like Arpad? Is not Samaria like Damascus?'", group: 3 },
  { number: 10, text: "'As my hand has reached to the kingdoms of the idols, whose carved images were greater than those of Jerusalem and Samaria,'", group: 3 },
  { number: 11, text: "'shall I not do to Jerusalem and her idols as I have done to Samaria and her images?'", group: 3 },
  { number: 12, text: "When the Lord has finished all his work on Mount Zion and on Jerusalem, he will punish the speech of the arrogant heart of the king of Assyria and the boastful look in his eyes.", group: 4, isHinge: true, hingeType: 'hinge' },
  { number: 13, text: "For he says: 'By the strength of my hand I have done it, and by my wisdom, for I have understanding; I remove the boundaries of peoples, and plunder their treasures; like a bull I bring down those who sit on thrones.'", group: 4 },
  { number: 14, text: "'My hand has found like a nest the wealth of the peoples; and as one gathers eggs that have been forsaken, so I have gathered all the earth; and there was none that moved a wing or opened the mouth or chirped.'", group: 4 },
  { number: 15, text: "Shall the axe boast over him who hews with it, or the saw magnify itself against him who wields it? As if a rod should wield him who lifts it, or as if a staff should lift him who is not wood!", group: 4 },
  { number: 16, text: "Therefore the Lord GOD of hosts will send wasting sickness among his stout warriors, and under his glory a burning will be kindled, like the burning of fire.", group: 5 },
  { number: 17, text: "The light of Israel will become a fire, and his Holy One a flame, and it will burn and devour his thorns and briers in one day.", group: 5 },
  { number: 18, text: "The glory of his forest and of his fruitful land the LORD will destroy, both soul and body, and it will be as when a sick man wastes away.", group: 5 },
  { number: 19, text: "The remnant of the trees of his forest will be so few that a child can write them down.", group: 5 },
  { number: 20, text: "In that day the remnant of Israel and the survivors of the house of Jacob will no more lean on him who struck them, but will lean on the LORD, the Holy One of Israel, in truth.", group: 6, isHinge: true, hingeType: 'turn-remnant' },
  { number: 21, text: "A remnant will return, the remnant of Jacob, to the mighty God.", group: 6 },
  { number: 22, text: "For though your people Israel be as the sand of the sea, only a remnant of them will return. Destruction is decreed, overflowing with righteousness.", group: 6 },
  { number: 23, text: "For the Lord GOD of hosts will make a full end, as decreed, in the midst of all the earth.", group: 6 },
  { number: 24, text: "Therefore thus says the Lord GOD of hosts: 'O my people, who dwell in Zion, be not afraid of the Assyrians when they strike with the rod and lift up their staff against you as the Egyptians did.'", group: 7 },
  { number: 25, text: "'For in a very little while my fury will come to an end, and my anger will be directed to their destruction.'", group: 7 },
  { number: 26, text: "And the LORD of hosts will wield against them a whip, as when he struck Midian at the rock of Oreb. And his staff will be over the sea, and he will lift it as he did in Egypt.", group: 7 },
  { number: 27, text: "And in that day his burden will depart from your shoulder, and his yoke from your neck; and the yoke will be broken because of the fat.'", group: 7 },
  { number: 28, text: "He has come to Aiath; he has passed through Migron; at Michmash he stores his baggage;", group: 8 },
  { number: 29, text: "they have crossed over the pass; at Geba they lodge for the night; Ramah trembles; Gibeah of Saul has fled.", group: 8 },
  { number: 30, text: "Cry aloud, O daughter of Gallim! Give attention, O Laishah! O poor Anathoth!", group: 8 },
  { number: 31, text: "Madmenah is in flight; the inhabitants of Gebim flee for safety.", group: 8 },
  { number: 32, text: "This very day he will halt at Nob; he shakes his fist at the mount of the daughter of Zion, the hill of Jerusalem.", group: 8 },
  { number: 33, text: "Behold, the Lord GOD of hosts will lop the boughs with terrifying power; the great in height will be hewn down, and the lofty will be brought low.", group: 9 },
  { number: 34, text: "He will cut down the thickets of the forest with an axe, and Lebanon with its majestic trees will fall.", group: 9 },
];

const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: 'Woe to Unjust Legislators',
    2: 'Assyria: God\'s Rod of Anger',
    3: 'Assyria\'s Arrogant Boasting',
    4: 'God\'s Response to Pride',
    5: 'Fire Consumes the Mighty',
    6: 'Remnant Returns to God',
    7: 'Do Not Fear Assyria',
    8: 'The Enemy\'s March on Jerusalem',
    9: 'The Proud Forest Felled'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: 'Legislators who codify injustice, rob the poor—captivity awaits',
    2: 'Assyria commissioned as rod in God\'s hand to punish His people',
    3: 'Assyria boasts of conquering nations, ignorant of God\'s plan',
    4: 'When God finishes His work, He will judge Assyria\'s pride',
    5: 'Wasting disease and fire will consume Assyria\'s glory',
    6: 'Remnant will no longer lean on oppressors but trust God alone',
    7: 'God commands: do not fear—deliverance coming like Midian',
    8: 'Poetic march through 12 cities as enemy threatens Zion',
    9: 'God lops off mighty boughs—Lebanon\'s cedars fall'
  };
  return transitions[group] || 'Transition point in divine judgment';
};

const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-red-600',
    2: 'bg-orange-500',
    3: 'bg-purple-600',
    4: 'bg-yellow-500',
    5: 'bg-red-500',
    6: 'bg-green-500',
    7: 'bg-blue-500',
    8: 'bg-gray-600',
    9: 'bg-green-700'
  };
  return colors[group] || 'bg-gray-400';
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'transition-rod': 'bg-orange-400',
    'hinge': 'bg-yellow-400',
    'turn-remnant': 'bg-green-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'transition-rod': 'Narrative Transition (v5) — From Judah\'s oppressors to God\'s instrument: Assyria becomes the rod of divine anger',
    'hinge': 'Chiastic Center (v12) — The sovereign pivot: when God finishes disciplining Zion, He will judge Assyria\'s arrogance',
    'turn-remnant': 'Dramatic Turn (v20) — From leaning on oppressors to trusting God: the remnant will rely on the Holy One in truth'
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
    seeing: "This woe targets those who weaponize law itself—not just breaking rules, but creating unjust rules that systematically oppress. The repetition 'decree...writers who keep writing' shows deliberate, ongoing legislative evil.",
    life: "Do you participate in systems that codify injustice? This verse challenges us to examine not just personal morality but the structures and policies we support or create that harm vulnerable people.",
    teach: "God judges not only individual sins but systemic injustice. When the powerful write laws that oppress the weak, they've turned justice into a weapon. God sees and will act."
  },
  12: {
    seeing: "This is the chiastic center—the pivot verse. God will use Assyria to discipline Jerusalem, THEN judge Assyria's pride. The sequence matters: first God's work on Zion, then punishment for the tool that thought itself sovereign.",
    life: "Sometimes God uses difficult circumstances (even hostile people) to refine you. But that doesn't make their intentions good. God will deal with both your need for discipline AND those who harm you.",
    teach: "Divine sovereignty means God uses even pagan empires for His purposes, but they remain accountable for their motives. The tool doesn't control the craftsman; Assyria's usefulness doesn't excuse its arrogance."
  },
  20: {
    seeing: "The remnant learns a costly lesson: stop leaning on 'him who struck them' (foreign alliances) and instead lean on the LORD 'in truth.' This marks the turn from political pragmatism to genuine faith.",
    life: "What are you leaning on that has actually hurt you? Failed relationships, addictions, coping mechanisms? The remnant discovers that their supposed helpers were their strikers. Real help comes from God alone.",
    teach: "True faith often emerges from the ashes of failed alternatives. The remnant 'no more' leans on human strength—having tried and failed, they finally lean on God in truth, not just in theory."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Exodus 23:6-7 - Do not deny justice to the poor", "Amos 5:11-12 - You trample the poor and deprive them of justice"],
    to: ["James 5:1-6 - Woe to you rich who have hoarded wealth by fraud", "Matthew 23:13-14 - Woe to you teachers who shut the kingdom and devour widows' houses"],
    context: "Legislating oppression invokes God's woe. This theme runs from Exodus through James—God fiercely defends the poor, widow, and orphan against those who use law as a weapon."
  },
  12: {
    from: ["Habakkuk 1:6-11 - God raises Chaldeans to execute judgment, then judges them", "Jeremiah 25:9-14 - Babylon will serve God's purpose, then face His wrath"],
    to: ["Revelation 17:16-17 - God puts it in their hearts to carry out His purpose, then they are destroyed", "Acts 4:27-28 - Herod and Pilate did what God's hand predestined"],
    context: "This verse is the key to understanding God's sovereignty over history. Pagan empires unknowingly serve divine purposes, then answer for their evil intentions—just as Pilate and Herod did with Jesus."
  },
  20: {
    from: ["2 Kings 16:7-9 - Ahaz relied on Assyria against his enemies", "Hosea 5:13 - Ephraim went to Assyria, but he cannot cure you"],
    to: ["2 Corinthians 1:9 - That we might not rely on ourselves but on God", "Jeremiah 17:5-8 - Cursed is one who trusts in man, blessed is one who trusts the LORD"],
    context: "The remnant learns what Ahaz refused: foreign alliances betray. Only God is trustworthy. This truth echoes to Paul's teaching that God deliberately allows weakness so we'll rely on Him alone."
  }
};

function Chapter10() {
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
        <ChapterNavigation currentChapter={10} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 10</h1>
          <p className="text-gray-600 text-lg">Assyria: God's Rod and the Remnant's Return</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thematic Groups</h2>
          <p className="text-sm text-gray-600 mb-6">Click any verse to explore deeper reflections and connections</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
          subtitle="See divine sovereignty over empires"
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
                  <h2 className="text-2xl font-bold text-gray-800">Chapter 10 Structure</h2>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
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
        )}
      </div>
    </div>
  );
}

export default Chapter10;
