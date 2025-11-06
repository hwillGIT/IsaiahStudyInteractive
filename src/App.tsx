import React, { useState } from 'react';
import './App.css';

interface Verse {
  number: number;
  text: string;
  group: number;
  isHinge?: boolean;
  hingeType?: string;
}

const verses: Verse[] = [
  { number: 1, text: "In the year that King Uzziah died, I saw the Lord, high and exalted, seated on a throne; and the train of his robe filled the temple.", group: 1 },
  { number: 2, text: "Above him were seraphim, each with six wings: With two wings they covered their faces, with two they covered their feet, and with two they were flying.", group: 1 },
  { number: 3, text: "And they were calling to one another: 'Holy, holy, holy is the LORD Almighty; the whole earth is full of his glory.'", group: 1 },
  { number: 4, text: "At the sound of their voices the doorposts and thresholds shook and the temple was filled with smoke.", group: 1 },
  { number: 5, text: "'Woe to me!' I cried. 'I am ruined! For I am a man of unclean lips, and I live among a people of unclean lips, and my eyes have seen the King, the LORD Almighty.'", group: 2, isHinge: true, hingeType: 'conviction' },
  { number: 6, text: "Then one of the seraphim flew to me with a live coal in his hand, which he had taken with tongs from the altar.", group: 2 },
  { number: 7, text: "With it he touched my mouth and said, 'See, this has touched your lips; your guilt is taken away and your sin atoned for.'", group: 2, isHinge: true, hingeType: 'cleansing' },
  { number: 8, text: "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I. Send me!'", group: 3, isHinge: true, hingeType: 'commission' },
  { number: 9, text: "He said, 'Go and tell this people: \"Be ever hearing, but never understanding; be ever seeing, but never perceiving.\"'", group: 4 },
  { number: 10, text: "Make the heart of this people calloused; make their ears dull and close their eyes. Otherwise they might see with their eyes, hear with their ears, understand with their hearts, and turn and be healed.", group: 4 },
  { number: 11, text: "Then I said, 'For how long, Lord?' And he answered: 'Until the cities lie ruined and without inhabitant, until the houses are left deserted and the fields ruined and ravaged,'", group: 5 },
  { number: 12, text: "until the LORD has sent everyone far away and the land is utterly forsaken.", group: 5 },
  { number: 13, text: "And though a tenth remains in the land, it will again be laid waste. But as the terebinth and oak leave stumps when they are cut down, so the holy seed will be the stump in the land.", group: 6, isHinge: true, hingeType: 'hope' }
];

const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-blue-600',
    2: 'bg-orange-500', 
    3: 'bg-teal-500',
    4: 'bg-gray-600',
    5: 'bg-red-600',
    6: 'bg-green-500'
  };
  return colors[group] || 'bg-gray-400';
};

const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: "God's Holy Throne Room",
    2: 'Confession & Cleansing',
    3: 'Divine Commissioning',
    4: 'The Hardening Message',
    5: 'Scope of Judgment',
    6: 'Remnant & Holy Seed'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: "Encountering God's throne, seraphim, and holy glory",
    2: "Recognizing uncleanness and receiving purification",
    3: 'Responding to God\'s call with "Here am I; send me"',
    4: "Delivering a message that people won't receive",
    5: "Understanding the extent and duration of discipline",
    6: "Hope for survival through God's faithful remnant"
  };
  return transitions[group] || "Transition point in Isaiah's vision";
};

const reflectionContent: Record<number, {seeing: string, life: string, teach: string}> = {
  1: {
    seeing: "This verse marks a pivotal transition—the death of King Uzziah represents the end of an era of prosperity, but Isaiah's vision reveals an eternal King whose throne never ends. The train of God's robe filling the temple shows His glory permeating every space.",
    life: "When earthly security fades (like a king dying), we discover God's eternal presence. Have you experienced moments where loss revealed God's unchanging nature? His throne remains when everything else shakes.",
    teach: "Human authority is temporary; divine sovereignty is eternal. God uses moments of earthly transition to reveal heavenly reality. The same God who filled the temple fills our lives with His presence."
  },
  2: {
    seeing: "The seraphim—burning ones—serve in God's presence with profound reverence. Their six wings reveal their posture: covering faces (reverence before God's holiness), covering feet (humility), and flying (readiness to serve). Even angels cannot look directly upon God's glory.",
    life: "If even angels cover themselves in God's presence, how should we approach Him? This verse challenges our casual attitudes toward worship. True worship combines reverence, humility, and readiness to serve.",
    teach: "Proper response to God's holiness includes reverence (faces covered), humility (feet covered), and service (ready to fly). These creatures show us that worship is both an attitude of heart and a posture of service."
  },
  3: {
    seeing: "The threefold 'Holy, holy, holy' emphasizes the superlative nature of God's holiness—He is completely set apart, perfectly pure. This is the only attribute of God repeated three times in Scripture, showing its centrality to His nature. The whole earth declares His glory.",
    life: "When was the last time you were awestruck by God's holiness? This verse invites us to pause and recognize that the same God worshiped by angels is present with us. His holiness should evoke wonder, not casual familiarity.",
    teach: "God's holiness is His essential nature—He is completely other, perfectly pure, absolutely set apart. Yet His glory fills the earth, making His transcendent holiness accessible to us through His presence."
  },
  4: {
    seeing: "The physical response to God's holiness is overwhelming—doorposts shake, smoke fills the temple. Creation itself responds to the declaration of God's holiness. This demonstrates the power and weight of divine presence.",
    life: "Has God's presence ever left you shaken? Sometimes we need to be disturbed from our comfort to truly encounter God. The smoke and shaking represent both God's concealment and His power.",
    teach: "God's holiness is not merely a concept but a powerful reality that affects the physical world. When heaven touches earth, creation responds. True encounter with God should move us deeply."
  },
  5: {
    seeing: "Isaiah's immediate response to God's holiness is conviction of sin. 'Unclean lips' represents his entire being, but specifically his speech. Seeing God's holiness reveals our sinfulness. This is a hinge moment—from viewing God to viewing himself.",
    life: "Encountering God's holiness always reveals our sinfulness. Have you had a moment where God's presence made you acutely aware of your need for cleansing? This awareness is not condemnation but invitation.",
    teach: "True conviction comes from seeing God's holiness, not from human effort. The closer we get to God, the more we see our need for His grace. Conviction precedes cleansing."
  },
  6: {
    seeing: "God's response to Isaiah's confession is immediate—a seraph brings a live coal from the altar. The altar represents sacrifice and atonement. God doesn't condemn; He cleanses. The coal is hot, representing the cost and power of purification.",
    life: "When you confess your sin, God doesn't lecture or condemn—He cleanses. His purification might be uncomfortable (like a hot coal), but it's necessary and healing. Are you willing to receive His cleansing touch?",
    teach: "God's grace follows genuine confession. The coal from the altar points to substitutionary atonement—sin is dealt with through sacrifice. Cleansing is painful but necessary for service."
  },
  7: {
    seeing: "The coal touches Isaiah's lips—the specific area of his confession. God addresses our exact point of need. 'Guilt taken away, sin atoned for'—complete forgiveness. This is another hinge point—from confession to commission.",
    life: "God doesn't just cover your sin; He removes it. Atonement means complete forgiveness and restoration. Have you experienced this level of cleansing? Only the cleansed can serve effectively.",
    teach: "True cleansing is specific and complete. God touches our exact point of need. Atonement is comprehensive—guilt removed, sin forgiven. Cleansing always precedes and enables service."
  },
  8: {
    seeing: "After cleansing, God poses the question: 'Whom shall I send?' Isaiah's response is immediate and enthusiastic: 'Send me!' Notice God doesn't command but invites. This is the climax—cleansed, Isaiah is ready to serve.",
    life: "God invites rather than coerces. After experiencing His cleansing grace, are you ready to respond with 'Send me'? Willing service flows from experiencing God's transforming love.",
    teach: "Divine calling comes as invitation, not demand. God seeks willing servants, not forced labor. Only the cleansed can effectively say 'Send me' because they understand grace."
  },
  9: {
    seeing: "Isaiah's message is difficult—people will hear but not understand, see but not perceive. This isn't God's desire but the result of persistent rejection. The message itself becomes an instrument of judgment to hardened hearts.",
    life: "Sometimes God calls us to faithfully deliver His message even when we know people won't receive it. Obedience isn't measured by results but by faithfulness. Are you willing to speak even when people won't listen?",
    teach: "Persistent rejection of truth leads to judicial hardening. God's word always accomplishes His purpose—either softening hearts or hardening them. The messenger's job is faithfulness, not results."
  },
  10: {
    seeing: "This verse reveals the tragic consequence of persistent rejection—hearts become calloused, ears dull, eyes closed. Yet even here, we see God's mercy: 'lest they...turn and be healed.' God would heal if they would turn.",
    life: "Repeated resistance to God's truth leads to spiritual insensitivity. Guard your heart against gradual hardening. Even small compromises can dull your spiritual perception over time.",
    teach: "Spiritual hardening is a progressive process. God allows hardening as judgment for persistent rejection, yet He always desires healing and restoration. The door to repentance remains open."
  },
  11: {
    seeing: "Isaiah asks the crucial question: 'How long?' God's answer is sobering—until complete desolation. The judgment will be thorough and extensive. This shows both God's patience (giving time for repentance) and His justice (sin must be addressed).",
    life: "When you face consequences of sin, you might ask 'How long?' God's discipline is purposeful, not arbitrary. It continues until it accomplishes its purpose of restoration.",
    teach: "God's judgment is not impulsive but measured. He disciplines thoroughly because He loves deeply. The extent of judgment reveals both the seriousness of sin and God's commitment to restoration."
  },
  12: {
    seeing: "The judgment continues—exile, abandonment, desolation. This is the lowest point of the vision. Yet even this severe judgment serves a purpose: to bring the people back to God.",
    life: "Sometimes God allows us to experience the full consequences of our choices. This isn't cruelty but love—He lets us hit bottom so we'll finally look up. Have you experienced this kind of discipline?",
    teach: "Divine discipline can be severe but is always purposeful. God removes false securities so we'll find our security in Him alone. Even in judgment, God's goal is restoration."
  },
  13: {
    seeing: "The final hinge point—from desolation to hope! Though only a tenth remains and will be laid waste again, there's a holy seed, a stump that survives. From apparent death comes new life. This points to both the remnant and ultimately to Christ.",
    life: "When everything seems destroyed, God preserves a seed of hope. Have you seen God bring new life from what seemed dead? The stump contains the promise of future growth and restoration.",
    teach: "God always preserves a remnant. Even in the most severe judgment, hope remains. The holy seed points to God's faithfulness to His promises and ultimately to the Messiah who brings complete restoration."
  }
};

const viewingModes = [
  { id: 'connections', label: 'Seeing Connections' },
  { id: 'life', label: 'How This Helps My Life' },
  { id: 'teaches', label: 'What This Teaches Us' }
];

function App() {
  const [activeMode, setActiveMode] = useState('connections');
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);

  const getCurrentReflection = () => {
    if (!selectedVerse) return '';
    const content = reflectionContent[selectedVerse.number];
    switch (activeMode) {
      case 'connections': return content.seeing;
      case 'life': return content.life;
      case 'teaches': return content.teach;
      default: return content.seeing;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 6 Interactive Study</h1>
          <p className="text-lg text-gray-600 mb-4">Encountering God's Holiness and Divine Commissioning</p>
          
          {/* Viewing Mode Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {viewingModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeMode === mode.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Color Legend */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding the Vision Sequence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((group) => (
                <div key={group} className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded mt-1 flex-shrink-0 ${getColorClass(group)}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">Group {group}: {getGroupName(group)}</div>
                    <div className="text-gray-600 text-xs">{getGroupTransition(group)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Transformation Points */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key transformation points</h3>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">Yellow dots mark moments where everything changes—from uncleanness to cleansing, from silence to service, from judgment to hope.</p>
            </div>
          </div>
        </div>

        {/* Verse Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2 mb-8">
          {verses.map((verse) => (
            <div
              key={verse.number}
              className={`relative ${getColorClass(verse.group)} text-white rounded-lg p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[80px] flex items-center justify-center ${
                hoveredVerse === verse.number ? 'ring-4 ring-yellow-300' : ''
              } ${selectedVerse?.number === verse.number ? 'ring-4 ring-white' : ''}`}
              onMouseEnter={() => setHoveredVerse(verse.number)}
              onMouseLeave={() => setHoveredVerse(null)}
              onClick={() => setSelectedVerse(verse)}
            >
              <div className="text-sm font-bold">6:{verse.number}</div>
              {verse.isHinge && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
              
              {/* Hover Tooltip */}
              {hoveredVerse === verse.number && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-800 text-white p-3 rounded-lg shadow-xl z-50 text-sm">
                  <div className="font-semibold text-yellow-300 mb-1">Isaiah 6:{verse.number}</div>
                  <div className="text-gray-100 mb-2">{verse.text}</div>
                  <div className="text-xs text-yellow-300 mb-1">{getGroupName(verse.group)}</div>
                  <div className="text-xs text-gray-300">{getGroupTransition(verse.group)}</div>
                  {verse.isHinge && (
                    <div className="text-xs text-yellow-300 mt-1">• Key Transformation Point</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Reflection Modal */}
        {selectedVerse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto modal-content">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Isaiah 6:{selectedVerse.number} - {getGroupName(selectedVerse.group)}
                  </h3>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 italic">{selectedVerse.text}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {activeMode === 'connections' && 'Seeing Connections'}
                    {activeMode === 'life' && 'How This Helps My Life'}
                    {activeMode === 'teaches' && 'What This Teaches Us'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{getCurrentReflection()}</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {viewingModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveMode(mode.id)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        activeMode === mode.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
