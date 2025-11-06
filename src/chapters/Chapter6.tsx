/**
 * INTERACTIVE BIBLE STUDY APPLICATION TEMPLATE
 * 
 * This is a reusable template for creating interactive Bible study applications.
 * See replit.md for complete template documentation and adaptation instructions.
 * 
 * Key Components:
 * - Color-coded verse grid with thematic grouping
 * - Interactive hover tooltips
 * - Two-level modal navigation (Reflections + Scripture Connections)
 * - Three viewing perspectives for deeper study
 * - Transformation point markers
 * 
 * To adapt for a new chapter:
 * 1. Update verses array with your chapter's content
 * 2. Customize group names and transitions
 * 3. Write reflection content for each verse
 * 4. Add scripture connections (from/to references)
 * 5. Adjust colors for thematic groups
 * 6. Update page title and subtitle
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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
  context: string;
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

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'conviction': 'bg-red-500',
    'cleansing': 'bg-blue-500',
    'commission': 'bg-yellow-400',
    'hope': 'bg-green-500'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'conviction': 'Red dots mark moments of conviction—recognizing our sinfulness in light of God\'s holiness.',
    'cleansing': 'Blue dots mark moments of cleansing—receiving God\'s purification and forgiveness.',
    'commission': 'Yellow dots mark moments of commissioning—responding to God\'s call to service.',
    'hope': 'Green dots mark moments of hope—discovering promise even in judgment.'
  };
  return explanations[hingeType] || '';
};

const getUniqueHingeTypes = (): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
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

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Chapter 1: The vision of Isaiah begins with God's call to see reality from His perspective", "Chapter 5: After the woe judgments, God reveals His throne and holiness"],
    to: ["Chapter 7-8: The sign of Immanuel comes to test faith in God's sovereign presence", "Chapter 9: The vision of the eternal King on David's throne fulfills this glimpse of God's reign"],
    context: "This verse bridges human political transitions to eternal divine sovereignty, showing that earthly kingdoms rise and fall but God's throne endures forever."
  },
  2: {
    from: ["Exodus 25: The cherubim on the ark foreshadow these angelic beings guarding God's holiness", "1 Kings 6: Solomon's temple with its cherubim decorations points to this heavenly reality"],
    to: ["Revelation 4: The living creatures around God's throne continue this pattern of worship"],
    context: "The seraphim reveal that worship in heaven models what worship should be on earth—reverent, humble, and ready to serve."
  },
  3: {
    from: ["Leviticus 19: 'Be holy for I am holy' is the call that Isaiah now sees fulfilled in God's nature", "Psalm 99: 'Holy is He' echoes through the ages to this throne room vision"],
    to: ["John 12:41: John reveals that Isaiah saw Christ's glory", "Revelation 4:8: The four living creatures repeat 'Holy, holy, holy' day and night"],
    context: "This threefold declaration of holiness becomes the foundation for understanding God's character and our need for His grace throughout all Scripture."
  },
  4: {
    from: ["Exodus 19: Mount Sinai shook when God descended to give the Law", "1 Kings 19: Elijah experienced God's powerful presence in the cave"],
    to: ["Matthew 27: The earth shook when Christ died, the temple veil tore", "Hebrews 12: We approach a throne that cannot be shaken"],
    context: "Physical creation responds to God's holiness, demonstrating that His presence is not abstract but powerfully real and transformative."
  },
  5: {
    from: ["Chapter 1: Isaiah pronounced woes on others; now he sees his own uncleanness", "Chapter 5: Six woes to the people, now the seventh woe falls on the prophet himself"],
    to: ["Chapter 53: The unclean lips will prophesy of the Suffering Servant who bears our sins", "Luke 5: Peter's 'Depart from me, I am a sinful man' echoes Isaiah's conviction"],
    context: "Encountering God's holiness always reveals our sinfulness. This is the necessary first step toward cleansing and commissioning."
  },
  6: {
    from: ["Leviticus 16: The altar of sacrifice provides atonement for sin", "Exodus 30: The altar fire burned continually, ready to cleanse"],
    to: ["Chapter 53: The Suffering Servant becomes the ultimate sacrifice from God's altar", "Hebrews 9: Christ's blood cleanses our conscience to serve the living God"],
    context: "The live coal from the altar points to substitutionary atonement—God provides the sacrifice that cleanses us for service."
  },
  7: {
    from: ["Jeremiah 1: God touches Jeremiah's mouth to commission him", "Ezekiel 2: God commands Ezekiel to eat the scroll before speaking"],
    to: ["Acts 2: Tongues of fire rest on the disciples, empowering them to speak God's word", "1 John 1:9: God is faithful to forgive and cleanse from all unrighteousness"],
    context: "Complete cleansing precedes effective service. God touches our specific point of need, preparing us for the calling ahead."
  },
  8: {
    from: ["Exodus 3: Moses at the burning bush resisted God's call with excuses", "Judges 6: Gideon questioned his qualification to serve God"],
    to: ["Jeremiah 20: Jeremiah later regretted saying yes, but remained faithful", "Matthew 28: Jesus commissions disciples with 'Go' after His resurrection"],
    context: "Only after experiencing God's transforming grace can we genuinely say 'Send me!' Willing service flows from experiencing God's love, not from duty or compulsion."
  },
  9: {
    from: ["Chapter 5: The people rejected God's word repeatedly", "Deuteronomy 29: God warned that persistent rebellion leads to hardened hearts"],
    to: ["Matthew 13: Jesus quotes this verse to explain why He speaks in parables", "John 12: Despite miracles, many still did not believe in Jesus", "Acts 28: Paul quotes this to explain Jewish rejection of the gospel"],
    context: "God's word always accomplishes its purpose—it either softens hearts or confirms their hardness. The messenger's job is faithfulness, not results."
  },
  10: {
    from: ["Exodus 7-14: Pharaoh's heart was hardened through persistent rejection", "Proverbs 29:1: Those who remain stiff-necked will suddenly be destroyed"],
    to: ["Romans 11: Paul explains the partial hardening of Israel and God's ultimate plan", "Hebrews 3-4: Warning against hardening hearts through unbelief"],
    context: "Spiritual insensitivity develops progressively through repeated resistance to God's truth. Yet God's goal remains healing and restoration for those who will turn."
  },
  11: {
    from: ["Leviticus 26: God warned of exile and desolation if Israel persisted in disobedience", "Deuteronomy 28: The curses for covenant breaking include devastation of the land"],
    to: ["Chapter 39: The Babylonian exile fulfills this prophecy", "2 Chronicles 36: The land enjoyed its Sabbath rest during 70 years of desolation"],
    context: "God's discipline is thorough because His love is deep. Judgment is not arbitrary but purposefully continues until it accomplishes restoration."
  },
  12: {
    from: ["2 Kings 17: The northern kingdom experienced exile and abandonment", "Jeremiah 4: Desolation and forsaking are inevitable consequences of persistent sin"],
    to: ["Ezra 1: God brings a return from exile after 70 years", "Nehemiah 1: The rebuilding begins as God restores His people"],
    context: "Even in the darkest judgment, God's purpose is ultimately redemptive. He allows us to experience consequences so we'll finally look up and return to Him."
  },
  13: {
    from: ["Chapter 4: The Branch of the LORD will be beautiful and glorious", "Chapter 5: The vineyard that should bear fruit becomes a wasteland"],
    to: ["Chapter 11: The shoot from the stump of Jesse brings hope and restoration", "Chapter 53: The Suffering Servant is like a root out of dry ground", "Romans 11: The remnant chosen by grace represents God's faithfulness"],
    context: "God always preserves a remnant. The holy seed points to God's faithfulness and ultimately to Christ, who brings complete restoration from apparent death."
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
  const [modalView, setModalView] = useState<'reflections' | 'scripture'>('reflections');
  const [showStructureModal, setShowStructureModal] = useState(false);

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
        {/* Chapter Navigation */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 text-sm">
            <span className="text-gray-500">Isaiah Studies:</span>
            <Link to="/chapter-2" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 2</Link>
            <Link to="/chapter-3" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 3</Link>
            <Link to="/chapter-4" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 4</Link>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 6</span>
            <Link to="/chapter-7" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 7</Link>
            <Link to="/chapter-8" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 8</Link>
            <Link to="/chapter-9" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 9</Link>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 6 Interactive Study</h1>
          <p className="text-lg text-gray-600 mb-4">Encountering God's Holiness and Divine Commissioning</p>
          
          {/* Color Legend */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding the Vision Sequence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((group) => (
                <div key={group} className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded mt-1 flex-shrink-0 ${getColorClass(group)}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">
                      <span className="text-gray-500 mr-1">{group}.</span>
                      {getGroupName(group)}
                    </div>
                    <div className="text-gray-600 text-xs">{getGroupTransition(group)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Structure Button */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <button
              onClick={() => setShowStructureModal(true)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              <span className="font-semibold">📖 View Chapter Structure</span>
              <span className="text-sm opacity-90">See the symmetrical pattern</span>
            </button>
          </div>

          {/* Key Transformation Points */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Transformation Points</h3>
            <div className="space-y-2">
              {getUniqueHingeTypes().map((hingeType) => (
                <div key={hingeType} className="flex items-start gap-3">
                  <div className={`w-3 h-3 ${getHingeColor(hingeType)} rounded-full mt-1 flex-shrink-0`}></div>
                  <p className="text-sm text-gray-700">{getHingeExplanation(hingeType)}</p>
                </div>
              ))}
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
              onClick={() => {
                setSelectedVerse(verse);
                setModalView('reflections');
              }}
            >
              <div className="text-sm font-bold">6:{verse.number}</div>
              {verse.isHinge && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${getHingeColor(verse.hingeType)} rounded-full animate-pulse`}></div>
              )}
              
              {/* Hover Tooltip */}
              {hoveredVerse === verse.number && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-800 text-white p-3 rounded-lg shadow-xl z-50 text-sm">
                  <div className="font-semibold text-yellow-300 mb-1">Isaiah 6:{verse.number}</div>
                  <div className="text-gray-100 mb-2">{verse.text}</div>
                  <div className="text-xs text-yellow-300 mb-1">{getGroupName(verse.group)}</div>
                  <div className="text-xs text-gray-300">{getGroupTransition(verse.group)}</div>
                  {verse.isHinge && (
                    <div className="text-xs text-yellow-300 mt-1 flex items-center gap-1">
                      <div className={`w-2 h-2 ${getHingeColor(verse.hingeType)} rounded-full`}></div>
                      Key Turning Point
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Modal with Two-Level Navigation */}
        {selectedVerse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden modal-content flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
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

                {/* Main Tab Navigation */}
                <div className="flex gap-2 border-b border-gray-200 -mb-px">
                  <button
                    onClick={() => setModalView('reflections')}
                    className={`px-4 py-2 font-medium transition-all ${
                      modalView === 'reflections'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Reflections
                  </button>
                  <button
                    onClick={() => setModalView('scripture')}
                    className={`px-4 py-2 font-medium transition-all ${
                      modalView === 'scripture'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Scripture Connections
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                {modalView === 'reflections' ? (
                  /* Reflections View */
                  <div>
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
                          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
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
                ) : (
                  /* Scripture Connections View */
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                      How This Verse Fits Into God's Larger Plan
                    </h4>
                    
                    {scriptureConnections[selectedVerse.number].from && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">FROM</span>
                          <span className="text-sm text-gray-600">Building on these earlier passages:</span>
                        </div>
                        <ul className="space-y-2 ml-4">
                          {scriptureConnections[selectedVerse.number].from!.map((connection, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span className="text-gray-700">{connection}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {scriptureConnections[selectedVerse.number].to && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">TO</span>
                          <span className="text-sm text-gray-600">Pointing forward to these fulfillments:</span>
                        </div>
                        <ul className="space-y-2 ml-4">
                          {scriptureConnections[selectedVerse.number].to!.map((connection, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              <span className="text-gray-700">{connection}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h5 className="font-semibold text-purple-900 mb-2">Theological Context</h5>
                      <p className="text-gray-700 leading-relaxed">
                        {scriptureConnections[selectedVerse.number].context}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Structure Modal */}
        {showStructureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Chapter 6 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
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
                    <span className="font-sans text-teal-800 font-bold">★ D (8): CENTER — Divine Commissioning</span>
                  </div>
                  <div className="ml-16 text-teal-700 font-sans italic pl-5">"Whom shall I send?" — "Here am I; send me!"</div>
                  <div className="mt-3 ml-12 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>C' (9-10): <span className="font-sans font-semibold text-gray-700">Hardening Message</span> — Hearts hardened, not healed</span>
                  </div>
                  <div className="ml-8 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (11a): <span className="font-sans font-semibold text-red-700">Isaiah's Question</span> — "How long, O Lord?"</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
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
        )}
      </div>
    </div>
  );
}

export default App;
