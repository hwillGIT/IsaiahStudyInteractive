/**
 * INTERACTIVE BIBLE STUDY APPLICATION TEMPLATE
 * Isaiah Chapter 9: The Prince of Peace
 * 
 * This is an adaptation of the Isaiah 6 template for Isaiah Chapter 9.
 * This demonstrates the complete conversion process for other chapters.
 * 
 * Key Components:
 * - Color-coded verse grid with 6 thematic groups
 * - Interactive hover tooltips
 * - Two-level modal navigation (Reflections + Scripture Connections)
 * - Three viewing perspectives for deeper study
 * - Transformation point markers
 * 
 * Adapted from Isaiah 6 template - see MULTI_CHAPTER_SETUP_GUIDE.md
 */

import { useState } from 'react';
import './App.css';

interface Verse {
  number: number;
  text: string;
  group: number;
  isHinge?: boolean;
  hingeType?: string;
  isRefrain?: boolean;
}

interface Connection {
  from?: string[];
  to?: string[];
  context: string;
}

const verses: Verse[] = [
  { number: 1, text: "But there will be no gloom for her who was in anguish. In the former time he brought into contempt the land of Zebulun and the land of Naphtali, but in the latter time he has made glorious the way of the sea, the land beyond the Jordan, Galilee of the nations.", group: 1 },
  { number: 2, text: "The people who walked in darkness have seen a great light; those who dwelt in a land of deep darkness, on them has light shone.", group: 1, isHinge: true, hingeType: 'darkness-to-light' },
  { number: 3, text: "You have multiplied the nation; you have increased its joy; they rejoice before you as with joy at the harvest, as they are glad when they divide the spoil.", group: 2 },
  { number: 4, text: "For the yoke of his burden, and the staff for his shoulder, the rod of his oppressor, you have broken as on the day of Midian.", group: 2 },
  { number: 5, text: "For every boot of the trampling warrior in battle tumult and every garment rolled in blood will be burned as fuel for the fire.", group: 2, isHinge: true, hingeType: 'disarmament' },
  { number: 6, text: "For to us a child is born, to us a son is given; and the government shall be upon his shoulder, and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace.", group: 3, isHinge: true, hingeType: 'coronation' },
  { number: 7, text: "Of the increase of his government and of peace there will be no end, on the throne of David and over his kingdom, to establish it and to uphold it with justice and with righteousness from this time forth and forevermore. The zeal of the Lord of hosts will do this.", group: 3, isHinge: true, hingeType: 'eternal-throne' },
  { number: 8, text: "The Lord has sent a word against Jacob, and it will fall on Israel;", group: 4 },
  { number: 9, text: "and all the people will know, Ephraim and the inhabitants of Samaria, who say in pride and in arrogance of heart:", group: 4 },
  { number: 10, text: "\"The bricks have fallen, but we will build with dressed stones; the sycamores have been cut down, but we will put cedars in their place.\"", group: 4 },
  { number: 11, text: "But the Lord raises the adversaries of Rezin against him, and stirs up his enemies.", group: 4 },
  { number: 12, text: "The Syrians on the east and the Philistines on the west devour Israel with open mouth. For all this his anger has not turned away, and his hand is stretched out still.", group: 4, isRefrain: true },
  { number: 13, text: "The people did not turn to him who struck them, nor inquire of the Lord of hosts.", group: 5 },
  { number: 14, text: "So the Lord cut off from Israel head and tail, palm branch and reed in one day—", group: 5 },
  { number: 15, text: "the elder and honored man is the head, and the prophet who teaches lies is the tail;", group: 5 },
  { number: 16, text: "for those who guide this people have been leading them astray, and those who are guided by them are swallowed up.", group: 5 },
  { number: 17, text: "Therefore the Lord does not rejoice over their young men, and has no compassion on their fatherless and widows; for everyone is godless and an evildoer, and every mouth speaks folly. For all this his anger has not turned away, and his hand is stretched out still.", group: 5, isRefrain: true },
  { number: 18, text: "For wickedness burns like a fire; it consumes briers and thorns; it kindles the thickets of the forest, and they roll upward in a column of smoke.", group: 6 },
  { number: 19, text: "Through the wrath of the Lord of hosts the land is scorched, and the people are like fuel for the fire; no one spares another.", group: 6 },
  { number: 20, text: "They slice meat on the right, but are still hungry, and they devour on the left, but are not satisfied; each devours the flesh of his own arm,", group: 6 },
  { number: 21, text: "Manasseh devours Ephraim, and Ephraim devours Manasseh; together they are against Judah. For all this his anger has not turned away, and his hand is stretched out still.", group: 6, isRefrain: true }
];

const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-yellow-500',
    2: 'bg-orange-500', 
    3: 'bg-green-600',
    4: 'bg-gray-600',
    5: 'bg-red-600',
    6: 'bg-slate-600'
  };
  return colors[group] || 'bg-gray-400';
};

const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: 'Light in Darkness',
    2: 'Joy and Victory', 
    3: 'Coronation and Government',
    4: 'Judgment I - Pride and Adversaries',
    5: 'Judgment II - Leadership Excision',
    6: 'Judgment III - Social Cannibalism'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: 'Dawn breaks after anguish - great light in Galilee',
    2: 'National joy escalates - harvest celebration and Midianite victory',
    3: 'Royal enthronement - child born with titles, eternal throne established',
    4: 'God confronts pride - adversaries devour, refrain marks persistent judgment',
    5: 'Leadership removed - head and tail cut off, false guides exposed',
    6: 'Social breakdown complete - cannibalism and scorched land'
  };
  return transitions[group] || 'Transition point in the messianic progression';
};

const reflectionContent: Record<number, {seeing: string, life: string, teach: string}> = {
  1: {
    seeing: "This verse announces the great inversion: where there was anguish and contempt, now there is glory. This shows God's pattern of turning our deepest sorrows into His greatest glory, transforming the places that seemed most abandoned by heaven.",
    life: "What areas of your life feel like 'Galilee of the nations'—places that seem forgotten or brought low? God specializes in making glorious what the world considers contemptible. He sees the places you've given up on.",
    teach: "God's glory often shines brightest in the places that were once darkest. The lands brought low become theaters of His grace, showing that no place is too forgotten for God's transforming touch."
  },
  2: {
    seeing: "This verse captures the moment of transformation from walking in darkness to seeing a great light. The reversal is complete—those who were trapped in deep darkness now experience brilliant revelation and joy.",
    life: "Have you experienced that moment when the light of God's truth broke into your darkness? When your burden lifted and hope replaced despair? This verse celebrates that life-changing encounter with God's light.",
    teach: "God's light doesn't just illuminate darkness—it transforms it completely. The great light brings not just visibility but complete transformation of circumstances and hope."
  },
  3: {
    seeing: "This verse shows how God's joy multiplies and increases until it overflows into harvest celebrations and victorious spoils. God's blessing creates national rejoicing that mirrors the joy of successful harvest.",
    life: "When God blesses your life, does your joy overflow into celebration? Sometimes we receive God's gifts but forget to rejoice. This verse calls us to celebrate God's goodness with the same enthusiasm as harvest time.",
    teach: "God's blessing creates joy that multiplies and increases. The overflow of His goodness should result in celebration, gratitude, and shared happiness with others."
  },
  4: {
    seeing: "The imagery of breaking the yoke and staff shows complete deliverance from oppression. The reference to Midian recalls God's historical pattern of delivering His people through decisive victories.",
    life: "What 'yokes' and 'rods' are still oppressing you today? God's power is the same today as when He broke Midian's oppression. He specializes in setting captives free.",
    teach: "God's deliverance is complete and decisive. The same power that broke oppression in biblical times is available today for anyone who calls upon His name."
  },
  5: {
    seeing: "This verse shows the ultimate transformation: implements of war become fuel for peace. What was designed for destruction becomes fuel for warmth and light, representing the complete disarmament of conflict.",
    life: "What 'battle gear' in your life—anger, fear, conflict—could be transformed into something that brings warmth and light? God's transformation is so complete that even our weapons become sources of blessing.",
    teach: "God's peace transforms even our conflicts into sources of strength. What we think are weapons of war become fuel for His fire of love and warmth."
  },
  6: {
    seeing: "This verse presents the heart of messianic hope: a child born, a son given, government on His shoulder, and four names that reveal His character and authority. This is the climactic promise that fulfills all of God's previous declarations.",
    life: "This child who was born for us changes everything. When you feel overwhelmed by circumstances, remember that the government is upon His shoulders. Nothing is beyond His care and authority.",
    teach: "The messianic promise is both human and divine—born as a child, given as a son, carrying government with titles that reveal His perfect character and endless authority."
  },
  7: {
    seeing: "This verse reveals the eternal scope of the messianic kingdom: government and peace increase without end, anchored on David's throne, established with justice and righteousness. The zeal of God guarantees this promise.",
    life: "What hope does this give you? The government that began with a child will increase forever with no end. Your future is secure under a throne established with perfect justice and righteousness.",
    teach: "God's kingdom is characterized by endless increase of peace, anchored in perfect justice. This is not a temporary solution but an eternal government that will never fail."
  },
  8: {
    seeing: "This verse marks a sober transition from celebration to warning. Even in the midst of messianic hope, God remains committed to confronting pride and unrepentance. His anger against evil is just as real as His love for the righteous.",
    life: "Don't let God's love for you make you complacent about sin. His anger against pride and arrogance is real, and it should motivate us to humility and repentance.",
    teach: "God's character includes both love and holy anger. He simultaneously pursues peace with the humble and confronts the proud. This balance reveals His perfect justice."
  },
  9: {
    seeing: "This verse identifies the core problem: pride and arrogance of heart. Even when facing God's judgment, the people refuse to humble themselves and instead elevate themselves with proud speech.",
    life: "What forms of pride are present in your heart? Sometimes our response to difficulty reveals whether we are walking in humility or pride. Pride always hardens the heart against correction.",
    teach: "Pride and arrogance are fundamental barriers to God's blessing. They prevent people from turning to Him even when facing clear consequences of their choices."
  },
  10: {
    seeing: "The people's response shows their self-reliance and pride—they plan to rebuild with better materials rather than turn to God for help. They see destruction as an opportunity for improvement rather than a call to repentance.",
    life: "When God allows destruction in your life, what's your first response? Do you immediately plan to rebuild better, or do you first turn to God for guidance and humility?",
    teach: "Self-reliant rebuilding without seeking God's face is a form of spiritual pride. True restoration begins with humility and dependence on God's wisdom."
  },
  11: {
    seeing: "God responds to their pride by raising up their adversaries against them. Their rebellion against God invites the very enemies they fear to be stirred up by the Lord Himself.",
    life: "When we choose pride over humility, we often find ourselves facing the very circumstances we hoped to avoid. God allows consequences to draw us back to Himself.",
    teach: "God's discipline often comes through the very forces we try to control. His love allows consequences to lead us toward repentance and restoration."
  },
  12: {
    seeing: "This refrain reveals God's persistent anger against pride and the consistent stretching out of His hand for correction. Yet even in judgment, God holds back His full wrath while still pursuing His people.",
    life: "Even in correction, God's hand is stretched out for you, not against you. His anger is always motivated by love and a desire for your ultimate good.",
    teach: "God's patience in judgment shows His desire for repentance rather than destruction. The refrain 'hand stretched out still' reveals ongoing opportunity for turning back to Him."
  },
  13: {
    seeing: "This verse reveals the deeper problem: when people are struck, they don't turn to the One who struck them. This shows a fundamental reversal—they blame God instead of turning to Him.",
    life: "When difficulties come, do you turn toward God or away from Him? It's natural to feel angry when suffering comes, but God permits trials to draw us closer, not push us away.",
    teach: "Turning away from God during difficulties is counterproductive. He allows trials to create opportunities for deeper relationship, not to drive us from His presence."
  },
  14: {
    seeing: "This verse uses harsh imagery of cutting off 'head and tail' to show complete removal of leadership. God's judgment includes removing both the leaders and their enablers when they lead people astray.",
    life: "Who are the 'heads' and 'tails' in your life that might be leading you away from God's ways? Sometimes we need to distance ourselves from influences that draw us toward pride and rebellion.",
    teach: "God holds leaders accountable for their influence. When they lead people astray, He removes their authority and influence, showing His commitment to truth."
  },
  15: {
    seeing: "This verse reveals how God views corrupted leadership: the 'elder and honored man' who should be trustworthy becomes corrupt, and the 'prophet who teaches lies' becomes a symbol of deception.",
    life: "Be careful about who you allow to speak into your life. Even respected voices can become vehicles for deception if they're not grounded in God's truth.",
    teach: "Corruption in spiritual leadership is particularly dangerous because it uses sacred positions to spread lies. God exposes and removes such deception."
  },
  16: {
    seeing: "This verse explains the cycle: leaders guide people astray, and people who follow false guidance get destroyed. The people become victims of the very leaders they trust, showing the tragic consequences of compromised truth.",
    life: "Are you blindly following spiritual, emotional, or intellectual leaders without checking their guidance against God's truth? Spiritual discernment protects us from following lies.",
    teach: "Following false guidance always leads to destruction. Even when following respected leaders, we must test their teachings against God's word to avoid spiritual harm."
  },
  17: {
    seeing: "This refrain shows the progression: God's anger deepens as His people continue to reject correction. His lack of compassion on the vulnerable shows how far the people have fallen from His heart.",
    life: "The more we resist God's correction, the more difficult it becomes to receive His blessing. When a people or person rejects God's love, even God's compassion seems withdrawn.",
    teach: "Persistent rejection of God's love leads to a hardening of heart that makes it harder to experience His grace. This progression shows how serious God is about truth."
  },
  18: {
    seeing: "This verse uses the image of wildfire to represent how wickedness spreads and consumes everything in its path. Sin has a multiplier effect that destroys communities and relationships.",
    life: "Unchecked wickedness in your life spreads like wildfire. It consumes good relationships, spiritual growth, and peace. Left alone, it will destroy everything you value.",
    teach: "Sin is not contained—it spreads and consumes. What begins as a small compromise can grow into a destructive force that affects entire communities and relationships."
  },
  19: {
    seeing: "This verse presents the ultimate tragedy: the land itself becomes scorched and people become fuel for the fire. The consequences of widespread wickedness turn everything, including human relationships, into sources of destruction.",
    life: "When wickedness spreads unchecked, it turns even good things into sources of destruction. Relationships that should bring life become sources of pain and destruction.",
    teach: "The ultimate consequence of persistent wickedness is that everything good becomes corrupted. The very relationships and blessings God gives can become instruments of destruction when corrupted by sin."
  },
  20: {
    seeing: "This verse shows the final stage of moral breakdown: even family members become enemies, consuming each other. The social fabric completely disintegrates when God's truth is rejected.",
    life: "When people reject God's ways, even the closest relationships can become sources of conflict. This is what happens when moral foundations are abandoned.",
    teach: "Rejecting God's truth ultimately destroys the bonds that hold communities together. Without God's foundation, even families turn against each other in the struggle for survival."
  },
  21: {
    seeing: "This final refrain reveals the complete breakdown: brother against brother, tribe against tribe, with God's anger still stretched out. Yet even in this judgment, God calls people back to Himself.",
    life: "Even in your darkest moments of conflict and division, God's hand is still stretched out for you. His anger is not the end of the story—His love is always greater.",
    teach: "Even in complete social breakdown, God's offer of restoration remains. His anger always leads toward an invitation to return to His ways of love and peace."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Isaiah 8:22-23 - The darkness and anguish mentioned here"],
    to: ["Matthew 4:13-16 - Jesus begins His ministry in Galilee, fulfilling this prophecy"],
    context: "This verse bridges the darkness of judgment (Isaiah 8) with the promise of light through the Messiah. What seemed like the most contemptible region becomes the birthplace of God's greatest revelation."
  },
  2: {
    from: ["Psalm 107:10-14 - Those who sat in darkness"],
    to: ["John 1:4-9 - The true light coming into the world", "John 8:12 - Jesus declaring 'I am the light of the world'"],
    context: "The great light promised here finds its ultimate fulfillment in Christ, who came as the light of the world to shine on those dwelling in spiritual darkness."
  },
  6: {
    from: ["2 Samuel 7:12-16 - God's covenant with David about an eternal throne", "Micah 5:2 - The ruler born in Bethlehem"],
    to: ["Luke 2:11 - The birth of Jesus in Bethlehem", "Philippians 2:9-11 - Every knee will bow to His name", "Revelation 19:16 - King of Kings"],
    context: "This is the climactic messianic prophecy connecting David's line to the eternal kingdom. The four names reveal Christ's complete character: Wonderful Counselor (wisdom), Mighty God (deity), Everlasting Father (eternality), Prince of Peace (mission)."
  },
  7: {
    from: ["Genesis 49:10 - The scepter shall not depart from Judah", "2 Samuel 7:16 - David's throne established forever"],
    to: ["Luke 1:32-33 - His kingdom will never end", "Revelation 11:15 - The kingdom of our Lord will last forever"],
    context: "This verse establishes the eternal nature of the Messiah's reign. Unlike human kingdoms that rise and fall, Christ's government increases without end, establishing perfect justice and righteousness."
  }
};

function App() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');

  const getReflectionContent = (verseNum: number) => {
    return reflectionContent[verseNum as keyof typeof reflectionContent] || {
      seeing: "This verse connects to Isaiah 9's message of messianic hope and God's eternal kingdom.",
      life: "Consider how this verse speaks to finding hope in Christ's eternal reign.",
      teach: "This verse contributes to understanding God's plan of salvation through the promised Messiah."
    };
  };

  const getCurrentReflection = () => {
    if (!selectedVerse) return '';
    const content = getReflectionContent(selectedVerse.number);
    switch (activeReflectionMode) {
      case 'seeing': return content.seeing;
      case 'life': return content.life;
      case 'teach': return content.teach;
      default: return content.seeing;
    }
  };

  const getConnection = (verseNum: number): Connection | null => {
    return scriptureConnections[verseNum as keyof typeof scriptureConnections] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 text-sm">
            <span className="text-gray-500">Isaiah Studies:</span>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 2</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 3</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 4</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 5</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 6</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 7</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline px-2 py-1">Ch 8</a>
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 9</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 9 Interactive Study</h1>
          <p className="text-lg text-gray-600 mb-6">The Prince of Peace</p>

          {/* Legend */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Understanding the Messianic Progression</h3>
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

          {/* Transformation Points */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key transformation points</h3>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">Yellow dots mark moments where everything changes—from darkness to light, from war to peace, from limited rule to endless government.</p>
            </div>
          </div>
        </div>

        {/* Verse Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 mb-8">
          {verses.map((verse) => (
            <div
              key={verse.number}
              className={`relative ${getColorClass(verse.group)} text-white rounded-lg p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[60px] flex items-center justify-center ${
                selectedVerse?.number === verse.number ? 'ring-4 ring-white shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredVerse(verse.number)}
              onMouseLeave={() => setHoveredVerse(null)}
              onClick={() => setSelectedVerse(verse)}
            >
              <div className="font-semibold">9:{verse.number}</div>
              {verse.isHinge && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              )}
              {verse.isRefrain && (
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-400 rounded-full"></div>
              )}

              {/* Hover Tooltip */}
              {hoveredVerse === verse.number && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white p-3 rounded-lg shadow-xl z-50 text-left pointer-events-none">
                  <div className="font-semibold text-yellow-300 mb-1">Isaiah 9:{verse.number}</div>
                  <div className="text-xs text-gray-100 mb-2">{verse.text.substring(0, 150)}{verse.text.length > 150 ? '...' : ''}</div>
                  <div className="text-xs text-blue-300">{getGroupName(verse.group)}</div>
                  {verse.isHinge && (
                    <div className="text-xs text-yellow-300 mt-1">⦿ Transformation Point</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedVerse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVerse(null)}>
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Isaiah 9:{selectedVerse.number}</h3>
                    <p className="text-blue-100 text-sm">{getGroupName(selectedVerse.group)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-white hover:text-gray-200 text-2xl font-bold leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('reflections')}
                    className={`flex-1 px-6 py-3 font-medium transition-colors ${
                      activeTab === 'reflections'
                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Reflections
                  </button>
                  <button
                    onClick={() => setActiveTab('connections')}
                    className={`flex-1 px-6 py-3 font-medium transition-colors ${
                      activeTab === 'connections'
                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    Scripture Connections
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
                
                {/* Verse Text */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed">{selectedVerse.text}</p>
                </div>

                {activeTab === 'reflections' && (
                  <>
                    {/* Reflection Mode Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={() => setActiveReflectionMode('seeing')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          activeReflectionMode === 'seeing'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Seeing Connections
                      </button>
                      <button
                        onClick={() => setActiveReflectionMode('life')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          activeReflectionMode === 'life'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        How This Helps My Life
                      </button>
                      <button
                        onClick={() => setActiveReflectionMode('teach')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          activeReflectionMode === 'teach'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        What This Teaches Us
                      </button>
                    </div>

                    {/* Reflection Content */}
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{getCurrentReflection()}</p>
                    </div>
                  </>
                )}

                {activeTab === 'connections' && (
                  <div>
                    {getConnection(selectedVerse.number) ? (
                      <div className="space-y-4">
                        {getConnection(selectedVerse.number)?.from && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <span className="text-blue-600">←</span> This Builds Upon:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {getConnection(selectedVerse.number)!.from!.map((ref, idx) => (
                                <li key={idx} className="text-sm">{ref}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {getConnection(selectedVerse.number)?.to && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <span className="text-blue-600">→</span> This Points Forward To:
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {getConnection(selectedVerse.number)!.to!.map((ref, idx) => (
                                <li key={idx} className="text-sm">{ref}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Theological Context:</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {getConnection(selectedVerse.number)!.context}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-center py-8">
                        <p>Scripture connections for this verse are being developed.</p>
                        <p className="text-sm mt-2">Check back soon for connections to other biblical passages.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
