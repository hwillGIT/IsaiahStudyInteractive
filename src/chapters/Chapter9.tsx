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
import { Link } from 'react-router-dom';
import '../App.css';

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

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'darkness-to-light': 'bg-yellow-400',
    'disarmament': 'bg-orange-500',
    'coronation': 'bg-purple-500',
    'eternal-throne': 'bg-blue-500'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'darkness-to-light': 'Yellow dots mark the transition from darkness to light—the great inversion where hope dawns.',
    'disarmament': 'Orange dots mark complete peace—where war equipment becomes fuel for warmth.',
    'coronation': 'Purple dots mark the messianic coronation—the child born with divine titles.',
    'eternal-throne': 'Blue dots mark the establishment of the eternal kingdom—endless government and peace.'
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
  3: {
    from: ["Deuteronomy 16:13-15 - The joy of harvest festivals", "Psalm 126:5-6 - Sowing in tears, reaping with joy"],
    to: ["John 16:20-22 - Sorrow turned to joy", "Revelation 19:6-7 - The wedding supper of the Lamb"],
    context: "The multiplication of joy points to the Messiah's work transforming mourning into celebration. God's salvation creates overflowing joy like a successful harvest."
  },
  4: {
    from: ["Judges 7:1-25 - The day of Midian when Gideon defeated the oppressors", "Exodus 1:11-14 - Israel under the yoke of Egyptian slavery"],
    to: ["Galatians 5:1 - Christ has set us free from the yoke of slavery", "Colossians 2:14-15 - Disarming rulers and authorities"],
    context: "Just as God broke Midian's oppression through Gideon, the Messiah breaks the yoke of sin and death, delivering complete freedom to all who trust Him."
  },
  5: {
    from: ["Psalm 46:8-9 - God makes wars cease to the ends of the earth", "Micah 4:3 - Beating swords into plowshares"],
    to: ["Ephesians 2:14-17 - Christ our peace, destroying the dividing wall", "Colossians 1:20 - Making peace through His blood"],
    context: "The burning of battle gear symbolizes the Messiah's complete victory over conflict. His peace is so thorough that instruments of war become useless."
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
  },
  8: {
    from: ["Isaiah 8:7-8 - God's word of judgment against the northern kingdom", "Amos 3:6-7 - God declares His plans through prophets"],
    to: ["Matthew 23:37-38 - Jesus weeps over Jerusalem's rejection", "Romans 9:6-8 - Not all Israel is true Israel"],
    context: "Even in the midst of messianic promise, God remains faithful to confront rebellion. His word of judgment is as certain as His word of blessing."
  },
  9: {
    from: ["Proverbs 16:18 - Pride goes before destruction", "James 4:6 - God opposes the proud"],
    to: ["Luke 18:9-14 - The proud Pharisee and humble tax collector", "1 Peter 5:5 - Clothe yourselves with humility"],
    context: "Pride and arrogance prevent people from receiving God's grace. The proud heart refuses to acknowledge need, making it impossible to receive God's help."
  },
  10: {
    from: ["Jeremiah 5:3 - They refused to return despite discipline", "Amos 4:6-11 - Repeated judgments without repentance"],
    to: ["Luke 13:3-5 - Unless you repent, you will all perish", "Revelation 9:20-21 - Refusing to repent despite plagues"],
    context: "Self-reliance reveals a heart that trusts in human strength rather than God. True recovery begins with acknowledging dependence on God, not doubling down on our own efforts."
  },
  11: {
    from: ["Deuteronomy 28:49-50 - God raises enemies against disobedient Israel", "Judges 2:14 - The Lord's anger kindled, delivering them into enemies' hands"],
    to: ["Matthew 22:7 - The king sent his armies to destroy those who rejected the invitation", "Romans 1:24 - God gave them over to their sinful desires"],
    context: "When people persist in pride, God allows consequences through their own enemies. This is discipline designed to bring them back, not destroy them permanently."
  },
  12: {
    from: ["Exodus 9:12 - God hardened Pharaoh's heart", "Isaiah 5:25 - God's anger burned against His people"],
    to: ["Romans 2:4-5 - God's patience leads to repentance or stored wrath", "2 Peter 3:9 - God is patient, not wanting any to perish"],
    context: "The repeated refrain shows God's patience even in judgment. His outstretched hand represents both discipline and invitation—calling people to turn back before it's too late."
  },
  13: {
    from: ["Jeremiah 2:30 - They did not receive correction", "Hosea 7:10 - Israel's pride testifies against them, yet they do not return"],
    to: ["Acts 7:51 - You always resist the Holy Spirit", "Hebrews 12:5-11 - Do not make light of the Lord's discipline"],
    context: "Suffering without seeking God hardens the heart further. God's discipline is meant to draw us closer, but pride can turn it into a wall that separates us from Him."
  },
  14: {
    from: ["Jeremiah 23:1-2 - Woe to the shepherds who destroy and scatter", "Ezekiel 34:1-10 - God's judgment on shepherds who feed themselves"],
    to: ["Matthew 23:13-15 - Woe to the teachers of the law and Pharisees", "2 Timothy 4:3 - People will gather teachers to suit their desires"],
    context: "God holds leaders accountable for misleading people. When spiritual leaders corrupt the truth, God removes them and their influence."
  },
  15: {
    from: ["Micah 3:5-7 - Prophets who lead people astray", "Ezekiel 13:1-16 - False prophets who see false visions"],
    to: ["Matthew 7:15 - Beware of false prophets in sheep's clothing", "2 Peter 2:1-3 - False teachers will secretly introduce destructive heresies"],
    context: "False prophets use their position to spread lies rather than truth. God exposes such deception and removes those who misuse spiritual authority."
  },
  16: {
    from: ["Jeremiah 5:31 - Prophets prophesy lies and people love it", "Hosea 4:6 - My people are destroyed for lack of knowledge"],
    to: ["Matthew 15:14 - If the blind lead the blind, both fall into a pit", "2 Thessalonians 2:10-12 - Perishing because they refused to love truth"],
    context: "Following false guidance leads to destruction. Spiritual discernment protects believers from being led astray by those who speak smooth words without truth."
  },
  17: {
    from: ["Psalm 50:21-22 - God rebukes those who think He is like them", "Jeremiah 6:30 - Rejected silver, for the Lord has rejected them"],
    to: ["Romans 1:28 - God gave them over to a depraved mind", "Hebrews 6:4-8 - Impossible to restore those who have fallen away"],
    context: "Persistent godlessness leads to a point where even God's compassion seems withdrawn. This is the tragic result of continually rejecting His grace."
  },
  18: {
    from: ["Proverbs 6:27-28 - Can a man carry fire without being burned?", "James 3:5-6 - The tongue is a fire, corrupting the whole body"],
    to: ["Galatians 6:7-8 - Whatever one sows, that will he also reap", "2 Thessalonians 1:8 - Punishment for those who do not obey the gospel"],
    context: "Sin spreads like wildfire, consuming everything in its path. What begins as a small compromise grows into a destructive force affecting entire communities."
  },
  19: {
    from: ["Jeremiah 12:13 - They have sown wheat but reaped thorns", "Lamentations 4:10 - Compassionate women cooked their own children"],
    to: ["Matthew 24:12 - The love of most will grow cold", "Revelation 16:8-9 - Scorched by fierce heat, yet they cursed God"],
    context: "The ultimate tragedy of sin is that it corrupts everything, even relationships. When God's foundation is removed, society breaks down completely."
  },
  20: {
    from: ["Leviticus 26:29 - In siege you will eat the flesh of your children", "Micah 7:2 - Everyone hunts his brother with a net"],
    to: ["Mark 13:12 - Brother will betray brother to death", "2 Timothy 3:1-5 - People will be lovers of themselves, without love"],
    context: "The final stage of moral breakdown is when family bonds dissolve. This shows what happens when people completely reject God's design for relationships."
  },
  21: {
    from: ["Deuteronomy 32:22 - God's anger burns to the depths of Sheol", "2 Chronicles 28:5-8 - Civil war between Judah and Israel with massive casualties"],
    to: ["Matthew 10:21 - Brother will deliver brother over to death", "Luke 21:16 - You will be betrayed even by parents and brothers"],
    context: "Even in complete breakdown and civil war, God's outstretched hand remains as an invitation. His anger serves His ultimate purpose of restoration, not destruction."
  }
};

function App() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [showStructureModal, setShowStructureModal] = useState(false);
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
            <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium">Introduction:</Link>
            <Link to="/chapter-1" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 1</Link>
            <Link to="/chapter-2" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 2</Link>
            <Link to="/chapter-3" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 3</Link>
            <Link to="/chapter-4" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 4</Link>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <Link to="/chapter-6" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 6</Link>
            <Link to="/chapter-7" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 7</Link>
            <Link to="/chapter-8" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 8</Link>
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

          {/* Transformation Points */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Transformation Points</h3>
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
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${getHingeColor(verse.hingeType)} rounded-full animate-pulse`}></div>
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
                      {getConnection(selectedVerse.number)?.context && (
                        <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Theological Context:</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {getConnection(selectedVerse.number)!.context}
                          </p>
                        </div>
                      )}
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
                  <h3 className="text-xl font-bold text-gray-800">Chapter 9 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-4">This chapter displays two symmetrical patterns—the first section (1-7) shows promise from darkness to light, while the second (8-21) shows judgment's refrain:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded mb-4">
                  <div className="text-xs font-bold text-blue-600 mb-1">PART 1: FROM DARKNESS TO LIGHT (1-7)</div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-2): <span className="font-sans font-semibold text-yellow-700">Darkness Transformed</span> — People in darkness see great light</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (3-5): <span className="font-sans font-semibold text-orange-700">Joy and Liberation</span> — Yoke broken, weapons burned</span>
                  </div>
                  <div className="ml-8 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-green-800 font-bold">★ CENTER (6-7): The Child King</span>
                  </div>
                  <div className="ml-12 text-green-700 font-sans italic pl-5">"Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace"</div>
                  <div className="mt-2 ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (6b): <span className="font-sans font-semibold text-orange-700">Government & Peace</span> — Endless reign from David's throne</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (7): <span className="font-sans font-semibold text-yellow-700">Zeal Established</span> — LORD's zeal accomplishes this</span>
                  </div>
                </div>

                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="text-xs font-bold text-red-600 mb-1">PART 2: JUDGMENT REFRAIN (8-21)</div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>C (8-12): <span className="font-sans font-semibold text-gray-700">Pride Judged</span> — "His anger is not turned away"</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>D (13-17): <span className="font-sans font-semibold text-red-700">Leaders Judged</span> — "His anger is not turned away"</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-slate-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>E (18-21): <span className="font-sans font-semibold text-slate-700">Wickedness Judged</span> — "His anger is not turned away"</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>Part 1 - A ↔ A':</strong> The transformation from darkness to light (vv. 1-2) is guaranteed by the LORD's zeal (v. 7). What seems impossible—light piercing deep darkness—is certain because God Himself will accomplish it.</li>
                    <li><strong>Part 1 - B ↔ B':</strong> The joy and liberation from oppression (vv. 3-5) finds its fulfillment in the child's eternal government (v. 6b-7). The broken yoke and burned weapons point to a king who brings lasting peace, not just temporary relief.</li>
                    <li><strong>Part 1 - Center (vv. 6-7):</strong> The four throne names—Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace—are the answer to everything. This child is both fully divine and the perfect king, bringing wisdom, power, care, and peace forever.</li>
                    <li><strong>Part 2 - Refrain Pattern:</strong> The repeated phrase "His anger is not turned away, His hand is still raised to strike" (vv. 12, 17, 21) shows God's sustained judgment against pride, corrupt leadership, and wickedness. The refrain structure emphasizes that sin brings inevitable, ongoing consequences.</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">The two-part structure creates a stark contrast: while the promised child brings light, joy, and endless peace (1-7), those who reject Him face repeated judgment (8-21). The Prince of Peace is the only escape from God's righteous anger.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
