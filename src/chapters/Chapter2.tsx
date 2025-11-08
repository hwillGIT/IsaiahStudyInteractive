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
  { number: 1, text: "The word that Isaiah the son of Amoz saw concerning Judah and Jerusalem.", group: 1 },
  { number: 2, text: "It shall come to pass in the latter days that the mountain of the house of the LORD shall be established as the highest of the mountains, and shall be lifted up above the hills; and all nations shall flow to it,", group: 1 },
  { number: 3, text: "and many peoples shall come, and say: 'Come, let us go up to the mountain of the LORD, to the house of the God of Jacob, that he may teach us his ways and that we may walk in his paths.' For out of Zion shall go the law, and the word of the LORD from Jerusalem.", group: 1 },
  { number: 4, text: "He shall judge between the nations, and shall decide disputes for many peoples; and they shall beat their swords into plowshares, and their spears into pruning hooks; nation shall not lift up sword against nation, neither shall they learn war anymore.", group: 1 },
  { number: 5, text: "O house of Jacob, come, let us walk in the light of the LORD.", group: 2, isHinge: true, hingeType: 'invitation' },
  { number: 6, text: "For you have rejected your people, the house of Jacob, because they are full of things from the east and of fortune-tellers like the Philistines, and they strike hands with the children of foreigners.", group: 3 },
  { number: 7, text: "Their land is filled with silver and gold, and there is no end to their treasures; their land is filled with horses, and there is no end to their chariots.", group: 3 },
  { number: 8, text: "Their land is filled with idols; they bow down to the work of their hands, to what their own fingers have made.", group: 3 },
  { number: 9, text: "So man is humbled, and each one is brought low—do not forgive them!", group: 3 },
  { number: 10, text: "Enter into the rock and hide in the dust from before the terror of the LORD, and from the splendor of his majesty.", group: 4 },
  { number: 11, text: "The haughty looks of man shall be brought low, and the lofty pride of men shall be humbled, and the LORD alone will be exalted in that day.", group: 4 },
  { number: 12, text: "For the LORD of hosts has a day against all that is proud and lofty, against all that is lifted up—and it shall be brought low;", group: 4 },
  { number: 13, text: "against all the cedars of Lebanon, lofty and lifted up; and against all the oaks of Bashan;", group: 4 },
  { number: 14, text: "against all the lofty mountains, and against all the uplifted hills;", group: 4 },
  { number: 15, text: "against every high tower, and against every fortified wall;", group: 4 },
  { number: 16, text: "against all the ships of Tarshish, and against all the beautiful craft.", group: 4 },
  { number: 17, text: "And the haughtiness of man shall be humbled, and the lofty pride of men shall be brought low, and the LORD alone will be exalted in that day.", group: 4 },
  { number: 18, text: "And the idols shall utterly pass away.", group: 5 },
  { number: 19, text: "And people shall enter the caves of the rocks and the holes of the ground, from before the terror of the LORD, and from the splendor of his majesty, when he rises to terrify the earth.", group: 5 },
  { number: 20, text: "In that day mankind will cast away their idols of silver and their idols of gold, which they made for themselves to worship, to the moles and to the bats,", group: 5 },
  { number: 21, text: "to enter the caverns of the rocks and the clefts of the cliffs, from before the terror of the LORD, and from the splendor of his majesty, when he rises to terrify the earth.", group: 5 },
  { number: 22, text: "Stop regarding man in whose nostrils is breath, for of what account is he?", group: 5 }
];

const reflectionContent = {
  1: {
    seeing: "This opening verse establishes that what follows is not mere human opinion but divine revelation given to Isaiah concerning God's people and their holy city.",
    life: "When you read Scripture, remember you're not reading human wisdom but God's revealed word. This changes how we approach the Bible—with reverence and expectation.",
    teach: "Prophetic revelation comes from God to specific people for specific purposes. Isaiah's vision addresses both immediate circumstances and eternal realities."
  },
  2: {
    seeing: "This verse paints a stunning picture of God's temple mountain becoming the highest point, with nations streaming upward like rivers flowing to their source.",
    life: "What draws you upward toward God? Just as nations will stream to His mountain, we can choose daily to move toward His presence rather than away from it.",
    teach: "God's ultimate plan includes all nations acknowledging Him. The mountain represents God's kingdom established above all earthly powers and authorities."
  },
  3: {
    seeing: "The nations don't just observe from afar—they actively invite each other to learn God's ways. Teaching flows from Zion, and people willingly submit to walk in God's paths.",
    life: "Are you inviting others to learn about God with you? The spirit of 'come, let us go together' creates community in seeking God's wisdom.",
    teach: "God's instruction (Torah) and word originate from Jerusalem, spreading to all peoples. This shows God's plan for universal knowledge of His ways through Israel."
  },
  4: {
    seeing: "God acts as the supreme judge and arbitrator between nations, resolving disputes without warfare. Military equipment is repurposed for agriculture, showing complete transformation from violence to productivity.",
    life: "What 'weapons' in your life could be transformed into tools for growth? God's peace doesn't just end conflict—it transforms destructive patterns into life-giving ones.",
    teach: "True peace comes through God's righteous judgment, not through military might. The conversion of weapons to farm tools symbolizes the Messiah's peaceful eternal reign."
  },
  5: {
    seeing: "This verse serves as the pivot point—having seen God's glorious future, Isaiah calls the present generation to walk in that light now. It's both invitation and challenge.",
    life: "You don't have to wait for the future kingdom to walk in God's light today. Every moment offers a choice to walk in His ways or wander in darkness.",
    teach: "The hinge between promise and warning reminds us that God's future glory should motivate present obedience. Light represents God's truth, guidance, and holiness."
  },
  6: {
    seeing: "The contrast is jarring—from glorious future to rejected present. God's people have filled themselves with foreign practices, fortune-telling, and unholy alliances.",
    life: "What have you 'filled yourself with' that doesn't come from God? When we fill our lives with the world's ways, we crowd out space for God's presence.",
    teach: "Syncretism—mixing God's ways with pagan practices—always leads to rejection of God's people. Spiritual compromise begins with small borrowings from ungodly cultures."
  },
  7: {
    seeing: "Material wealth and military power have become endless pursuits. The repetition of 'filled' and 'no end' shows how accumulation has replaced trust in God.",
    life: "What are you accumulating without end? Wealth and security aren't wrong, but when they become endless pursuits, they replace God as our true source of confidence.",
    teach: "Trusting in material wealth and military strength reveals a heart that doesn't trust God's provision and protection. Abundance without God leads to spiritual poverty."
  },
  8: {
    seeing: "The progression is complete—from foreign practices to wealth to outright idolatry. They bow to things their own hands created, the ultimate foolishness.",
    life: "What have you created that you're tempted to worship? Career, relationships, possessions—anything we make that we then serve becomes an idol.",
    teach: "Idolatry is worshiping what we create rather than our Creator. The absurdity of bowing to human craftsmanship reveals the spiritual blindness of sin."
  },
  9: {
    seeing: "This verse shows the devastating consequence—humanity is humbled and brought low. The prayer 'do not forgive them' reflects the seriousness of persistent idolatry.",
    life: "Pride always leads to a fall. When we exalt ourselves or our creations, God's justice requires humbling. Only in humility can we receive His mercy.",
    teach: "Persistent rebellion eventually reaches a point where judgment becomes necessary. Isaiah's cry for no forgiveness shows how seriously God takes idolatry."
  },
  10: {
    seeing: "The scene shifts to the Day of the LORD—people desperately seeking hiding places from God's terrifying presence and majestic splendor.",
    life: "There's nowhere to hide from God, yet we often try. Better to run to Him in repentance now than to run from Him in terror later.",
    teach: "The Day of the LORD brings terror to the unrepentant and vindication to the faithful. God's majesty, which comforts believers, terrifies those who reject Him."
  },
  11: {
    seeing: "This verse emphasizes that human pride will be completely demolished. Only God will remain exalted when everything else is brought low.",
    life: "What sources of pride need to be brought low in your life? God opposes the proud but gives grace to the humble. Choose humility now before pride brings your fall.",
    teach: "The ultimate purpose of judgment is to exalt God alone. Every competing source of glory and pride must be removed so God's supremacy is undisputed."
  },
  12: {
    seeing: "God has appointed a specific day for judgment against everything proud and lofty. This isn't random chaos but deliberate divine action against arrogance.",
    life: "God doesn't ignore pride indefinitely. There's a day coming when all arrogance will face His judgment. This should motivate humility and repentance today.",
    teach: "The Day of the LORD is God's appointed time for settling accounts with human pride. Nothing lofty will escape His judgment on that day."
  },
  13: {
    seeing: "Even the tallest, most majestic trees—symbols of natural grandeur and strength—will be brought low. Nothing in creation stands above God's judgment.",
    life: "What seems immovable and permanent in your life? The mightiest cedars and oaks can't resist God. Nothing we trust in besides Him will stand.",
    teach: "God's judgment extends to all of creation's proudest examples. Cedars and oaks represent natural strength and longevity that will still fall before Him."
  },
  14: {
    seeing: "Mountains and hills, the earth's highest natural features, will be brought low. Even geography must humble itself before God's majesty.",
    life: "If mountains must bow before God, how much more should we? No obstacle is too high for God to bring down, including the mountains in your life.",
    teach: "Mountains often symbolize obstacles and challenges. God's judgment shows that nothing—natural or spiritual—stands beyond His sovereign authority."
  },
  15: {
    seeing: "Human achievements—towers and walls built for defense and display—will fall. What people build to protect and impress themselves cannot withstand God.",
    life: "What 'towers and walls' have you built for security apart from God? Our human defenses and achievements mean nothing when God acts in judgment.",
    teach: "Human engineering and fortifications represent our attempts at self-protection and self-exaltation. All must fall before God's ultimate authority."
  },
  16: {
    seeing: "Even the glory of international trade and beautiful ships will be judged. Commerce, beauty, and human ingenuity cannot escape the Day of the LORD.",
    life: "Success in business and the pursuit of beauty aren't inherently wrong, but when they become sources of pride apart from God, they face judgment.",
    teach: "Ships of Tarshish represent commercial success and aesthetic achievement. God's judgment spares nothing that competes with His glory."
  },
  17: {
    seeing: "This verse repeats verse 11 almost word-for-word, emphasizing the central message: human pride falls, God alone rises. The repetition hammers home this truth.",
    life: "God is making absolutely sure we understand—pride will be humbled. The repetition isn't for His benefit but for ours, driving home this essential truth.",
    teach: "Biblical repetition signals importance. The doubled declaration of pride's downfall and God's sole exaltation emphasizes the certainty and centrality of this judgment."
  },
  18: {
    seeing: "After all the specific judgments, this verse delivers the bottom line: idols will completely vanish. Not diminished, not reformed—utterly passed away.",
    life: "What idols in your life need to utterly pass away? Half-measures won't work. God's goal is complete elimination of everything that competes with Him.",
    teach: "Idols will not simply be reduced or regulated but completely abolished. God's final victory includes the total eradication of all false worship."
  },
  19: {
    seeing: "People will throw away their idols and flee to caves, seeking any shelter from God's terrifying presence when He rises to shake the earth.",
    life: "In crisis, idols reveal their worthlessness. We cast them aside and seek real refuge. Why wait for crisis? Turn from idols to God now.",
    teach: "When God reveals His majesty, idols lose all appeal and people desperately seek hiding places. This shows idolatry's ultimate futility."
  },
  20: {
    seeing: "The precious materials of silver and gold idols become worthless. People cast them to animals dwelling in darkness—a fitting end for what led them into spiritual darkness.",
    life: "What seemed valuable and worthy of worship becomes trash in God's presence. Real worth is found only in what God values, not what glitters.",
    teach: "Giving idols to moles and bats symbolizes their return to darkness and worthlessness. What people crafted for worship becomes refuse for creatures of the dark."
  },
  21: {
    seeing: "This verse repeats verse 19, emphasizing humanity's desperate flight from God's terrifying presence. The repetition shows waves of people seeking shelter as God arises.",
    life: "The only safe hiding place is in God Himself. Trying to hide from God in caves and cliffs is futile; we must run to Him, not from Him.",
    teach: "The repetition of hiding in caves emphasizes humanity's futile attempts to escape God's presence. Only those who seek Him as refuge find safety."
  },
  22: {
    seeing: "Isaiah concludes with this sobering reminder: humans are mere breath, here today and gone tomorrow. Why trust in such fragile creatures instead of the eternal God?",
    life: "When you're tempted to put ultimate trust in people—including yourself—remember this verse. We're all just breath. Only God endures forever.",
    teach: "This verse demolishes human pride at its foundation. Humanity's frailty and mortality make trusting in people instead of God supremely foolish."
  }
};

const scriptureConnections: Record<number, Connection> = {
  2: {
    from: ["Micah 4:1 - Nearly identical prophecy about the mountain of the LORD", "Daniel 2:35, 44-45 - Stone becomes a mountain filling the whole earth"],
    to: ["Acts 2:5-11 - People from every nation hearing the word from Jerusalem", "Revelation 21:22-27 - Nations walking by the light of the Lamb"],
    context: "God's mountain represents His kingdom established above all earthly kingdoms. This prophecy finds initial fulfillment in the gospel going from Jerusalem, and ultimate fulfillment in the New Jerusalem."
  },
  3: {
    from: ["Deuteronomy 6:6-7 - Parents teaching God's ways to children", "Psalm 25:4-5 - Teach me your paths"],
    to: ["Luke 24:47 - Repentance proclaimed to all nations beginning from Jerusalem", "John 4:22 - Salvation is from the Jews"],
    context: "The Torah going out from Zion anticipated the gospel message spreading from Jerusalem. God's plan always included teaching all nations His ways through Israel."
  },
  4: {
    from: ["Psalm 72:3-4 - May the mountains bear prosperity and peace", "Joel 3:10 - Opposite command during judgment: beat plowshares into swords"],
    to: ["Ephesians 2:14-17 - Christ is our peace, destroying the dividing wall", "Revelation 19:11-16 - Christ judges and makes war in righteousness"],
    context: "Messiah brings peace through righteous judgment. The transformation of weapons represents the complete end of warfare under His eternal reign."
  },
  5: {
    from: ["Psalm 89:15 - Blessed are those who walk in the light of Your presence", "Proverbs 4:18 - The path of the righteous is like the light of dawn"],
    to: ["John 12:35-36 - Walk while you have the light", "1 John 1:7 - If we walk in the light as He is in the light"],
    context: "This hinge verse bridges promise and warning. Walking in God's light means living according to His revealed truth now, not waiting for the future kingdom."
  },
  6: {
    from: ["Deuteronomy 18:9-14 - Do not imitate detestable practices of the nations", "1 Kings 11:1-8 - Solomon's heart turned by foreign wives"],
    to: ["2 Corinthians 6:14-17 - Do not be yoked with unbelievers", "James 4:4 - Friendship with the world is hostility toward God"],
    context: "Spiritual compromise begins with adopting foreign practices and forming ungodly alliances. What seems like cultural exchange becomes spiritual adultery."
  },
  7: {
    from: ["Deuteronomy 17:16-17 - King must not accumulate horses, silver, or gold", "1 Kings 10:23-29 - Solomon's wealth and horses"],
    to: ["Matthew 6:19-21 - Do not store up treasures on earth", "1 Timothy 6:17 - Not to fix hope on the uncertainty of riches"],
    context: "Accumulation without limits reveals misplaced trust. Material wealth and military power become substitutes for depending on God's provision and protection."
  },
  8: {
    from: ["Exodus 20:4-5 - No graven images", "Psalm 115:4-8 - Idols are silver and gold, the work of human hands"],
    to: ["Romans 1:23 - Exchanged the glory of God for images", "1 Corinthians 10:14 - Flee from idolatry"],
    context: "Bowing to what our hands have made is the height of spiritual insanity. Idolatry exchanges the Creator's glory for creation's emptiness."
  },
  9: {
    from: ["Proverbs 6:16-17 - The LORD hates haughty eyes", "Proverbs 16:18 - Pride goes before destruction"],
    to: ["James 4:6 - God opposes the proud but gives grace to the humble", "1 Peter 5:5 - Clothe yourselves with humility"],
    context: "Persistent pride and idolatry eventually exhaust God's patience. Humbling is inevitable—better to humble ourselves than be humbled by God's judgment."
  },
  10: {
    from: ["Revelation 6:15-17 - Everyone hiding in caves from the wrath of the Lamb", "Hosea 10:8 - They will say to mountains, 'Cover us!'"],
    to: ["Luke 23:30 - Then they will begin to say to the mountains, 'Fall on us'", "Hebrews 10:31 - Fearful thing to fall into the hands of the living God"],
    context: "The Day of the LORD brings terror to those who rejected God. Their attempts to hide from His presence demonstrate the futility of unrepentant rebellion."
  },
  11: {
    from: ["Job 40:11-12 - Look on everyone who is proud and bring him low", "Proverbs 29:23 - One's pride will bring him low"],
    to: ["Philippians 2:9-11 - God highly exalted Jesus and every knee shall bow", "Revelation 4:11 - You are worthy, our Lord and God"],
    context: "God's ultimate purpose is His own exaltation. Every competing claim to glory must be demolished so God alone receives the worship and honor He deserves."
  },
  12: {
    from: ["Zephaniah 1:14-18 - The great day of the LORD is near", "Joel 2:1, 11 - The day of the LORD is coming, great and very awesome"],
    to: ["2 Peter 3:10 - Day of the Lord will come like a thief", "1 Thessalonians 5:2 - Day of the Lord comes like a thief in the night"],
    context: "God has appointed a specific day for reckoning with human pride. This day is certain, though its timing remains known only to God."
  },
  17: {
    from: ["Isaiah 2:11 - Earlier statement of the same truth", "Psalm 97:9 - You, LORD, are Most High over all the earth"],
    to: ["Revelation 15:4 - Who will not fear and glorify Your name?", "Revelation 19:6 - The Lord our God, the Almighty, reigns"],
    context: "The repetition emphasizes certainty and importance. When God completes His work, His solitary exaltation will be undeniable and universal."
  },
  18: {
    from: ["Zechariah 13:2 - I will remove the names of the idols from the land", "Ezekiel 36:25 - I will cleanse you from all your idols"],
    to: ["1 Corinthians 8:4 - An idol has no real existence", "Revelation 21:27 - Nothing unclean will ever enter the New Jerusalem"],
    context: "God's final victory includes complete eradication of all idolatry. What people once worshiped will vanish entirely, proving its powerlessness."
  },
  19: {
    from: ["Hosea 10:8 - Say to the mountains, 'Cover us!' and to the hills, 'Fall on us!'", "Nahum 1:5-6 - Who can stand before His indignation?"],
    to: ["Revelation 6:16 - Calling to mountains and rocks, 'Fall on us and hide us'", "Luke 23:30 - They will begin to say to the mountains, 'Fall on us'"],
    context: "When God rises to shake the earth, people desperately seek any shelter from His terrible presence. This demonstrates the futility of opposing God."
  },
  20: {
    from: ["Isaiah 30:22 - You will defile your carved idols of silver", "Ezekiel 7:19 - They will throw their silver into the streets"],
    to: ["Philippians 3:8 - I count everything as loss because of Christ", "Matthew 16:26 - What will it profit a man to gain the world but forfeit his soul"],
    context: "What people treasured and worshiped becomes worthless trash. This shows idolatry's ultimate folly—investing in what has no lasting value."
  },
  22: {
    from: ["Psalm 146:3-4 - Do not trust in princes, in mortal man who cannot save", "Psalm 62:9 - Mankind is but a breath"],
    to: ["James 4:14 - You are a mist that appears briefly", "1 Peter 1:24 - All flesh is like grass"],
    context: "Human frailty makes trusting in people instead of God supremely foolish. This verse demolishes pride by reminding us we're mere breath, here today and gone tomorrow."
  }
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'invitation': 'bg-yellow-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'invitation': 'Yellow dots mark the call to walk in God\'s light—the pivot from promise to present obedience.'
  };
  return explanations[hingeType] || '';
};

const getUniqueHingeTypes = (): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
};

function Chapter2() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [showStructureModal, setShowStructureModal] = useState(false);

  const getGroupName = (group: number): string => {
    const names = {
      1: "Future Glory",
      2: "Call to Walk in Light",
      3: "Present Darkness",
      4: "Coming Judgment",
      5: "Idols Abolished"
    };
    return names[group as keyof typeof names] || "";
  };

  const getGroupTransition = (group: number): string => {
    const transitions = {
      1: "Mountain exalted - nations streaming to learn God's ways",
      2: "Hinge point - invitation to walk in God's light now",
      3: "Idolatry and pride - God's people filled with foreign ways",
      4: "Day of the LORD - all pride brought low, God alone exalted",
      5: "Final abolition - idols worthless, humanity revealed as mere breath"
    };
    return transitions[group as keyof typeof transitions] || "";
  };

  const getColorClass = (group: number, isHovered: boolean = false): string => {
    const colors = {
      1: isHovered ? "bg-yellow-500 border-yellow-600" : "bg-yellow-400 border-yellow-500",
      2: isHovered ? "bg-orange-500 border-orange-600" : "bg-orange-400 border-orange-500",
      3: isHovered ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600",
      4: isHovered ? "bg-purple-600 border-purple-700" : "bg-purple-500 border-purple-600",
      5: isHovered ? "bg-gray-700 border-gray-800" : "bg-gray-600 border-gray-700"
    };
    return colors[group as keyof typeof colors] || "";
  };

  const getReflectionContent = (verseNum: number) => {
    return reflectionContent[verseNum as keyof typeof reflectionContent] || {
      seeing: "This verse contributes to Isaiah's vision of God's future glory and present warning.",
      life: "Consider how this verse speaks to your daily walk with God.",
      teach: "This verse reveals important truth about God's character and plan."
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

  const uniqueGroups = Array.from(new Set(verses.map(v => v.group))).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2 text-sm">
            <span className="text-gray-500">Isaiah Studies:</span>
            <Link to="/chapter-1" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 1</Link>
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 2</span>
            <Link to="/chapter-3" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 3</Link>
            <Link to="/chapter-4" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 4</Link>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <Link to="/chapter-6" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 6</Link>
            <Link to="/chapter-7" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 7</Link>
            <Link to="/chapter-8" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 8</Link>
            <Link to="/chapter-9" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 9</Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 2 Interactive Study</h1>
          <p className="text-lg text-gray-600">The Mountain of the LORD and the Day of the LORD</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Understanding God's Future Glory and Present Warning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueGroups.map(groupNum => (
              <div key={groupNum} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <div className={`w-4 h-4 rounded mt-1 flex-shrink-0 ${getColorClass(groupNum)}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-gray-400 text-sm">{groupNum}.</span>
                    <h3 className="font-semibold text-gray-800">{getGroupName(groupNum)}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{getGroupTransition(groupNum)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowStructureModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md p-4 mb-6 hover:shadow-lg transition-shadow flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <span className="font-semibold">View Chapter Structure</span>
          </span>
          <span className="text-sm opacity-90">See the symmetrical pattern</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Key Transformation Points</h3>
          <div className="space-y-2">
            {getUniqueHingeTypes().map(hingeType => (
              <div key={hingeType} className="flex items-start gap-3">
                <div className={`w-3 h-3 ${getHingeColor(hingeType)} rounded-full mt-1 flex-shrink-0`}></div>
                <p className="text-sm text-gray-700">{getHingeExplanation(hingeType)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {verses.map((verse) => (
            <div key={verse.number} className="relative">
              {verse.isHinge && (
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow-md z-10"></div>
              )}
              <button
                onClick={() => setSelectedVerse(verse)}
                onMouseEnter={() => setHoveredVerse(verse.number)}
                onMouseLeave={() => setHoveredVerse(null)}
                className={`w-full h-24 rounded-lg border-2 ${getColorClass(verse.group, hoveredVerse === verse.number)} text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 relative overflow-hidden`}
              >
                <span className="relative z-10">2:{verse.number}</span>
                {hoveredVerse === verse.number && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center p-2">
                    <span className="text-xs text-white text-center line-clamp-3">{verse.text.substring(0, 60)}...</span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {selectedVerse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedVerse(null)}>
            <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Verse 2:{selectedVerse.number}</h2>
                    <p className="text-sm text-gray-500 mt-1">{getGroupName(selectedVerse.group)}</p>
                  </div>
                  <button onClick={() => setSelectedVerse(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                </div>
                <p className="text-gray-700 leading-relaxed italic">{selectedVerse.text}</p>
              </div>

              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('reflections')}
                    className={`flex-1 py-3 px-4 font-semibold transition-colors ${activeTab === 'reflections' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Reflections
                  </button>
                  <button
                    onClick={() => setActiveTab('connections')}
                    className={`flex-1 py-3 px-4 font-semibold transition-colors ${activeTab === 'connections' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    Scripture Connections
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'reflections' && (
                  <div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <button onClick={() => setActiveReflectionMode('seeing')} className={`px-4 py-2 rounded-full font-medium transition-colors ${activeReflectionMode === 'seeing' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        Seeing Connections
                      </button>
                      <button onClick={() => setActiveReflectionMode('life')} className={`px-4 py-2 rounded-full font-medium transition-colors ${activeReflectionMode === 'life' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        How This Helps My Life
                      </button>
                      <button onClick={() => setActiveReflectionMode('teach')} className={`px-4 py-2 rounded-full font-medium transition-colors ${activeReflectionMode === 'teach' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        What This Teaches Us
                      </button>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{getCurrentReflection()}</p>
                    </div>
                  </div>
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
                  <h3 className="text-xl font-bold text-gray-800">Chapter 2 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern contrasting future glory with present pride, both leading to God's terrifying judgment:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-5): <span className="font-sans font-semibold text-yellow-700">Mountain Exalted</span> — Nations stream to Zion for God's word</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (6-11): <span className="font-sans font-semibold text-red-700">Pride and Idolatry</span> — People filled with foreign ways</span>
                  </div>
                  <div className="ml-8 bg-orange-100 px-2 py-1 rounded border-l-4 border-orange-500 flex items-start gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-orange-800 font-bold">★ CENTER (10-11): Terror of the LORD — Enter the rock, hide in the dust</span>
                  </div>
                  <div className="ml-12 text-orange-700 font-sans italic pl-5">"The LORD alone will be exalted in that day"</div>
                  <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (12-17): <span className="font-sans font-semibold text-purple-700">All Pride Abased</span> — Day of the LORD against every high thing</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (18-22): <span className="font-sans font-semibold text-gray-700">Idols Abolished</span> — Stop trusting mere humans</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>A ↔ A':</strong> The vision opens with the LORD's mountain exalted above all (vv. 1-5) but closes with idols completely abolished (vv. 18-22). God's glory rising means all false gods must fall—only one can be supreme.</li>
                    <li><strong>B ↔ B':</strong> Human pride and idolatry in Israel (vv. 6-11) finds its answer in God bringing low every proud thing (vv. 12-17). The very things people trust—silver, gold, horses, alliances—become targets of divine judgment.</li>
                    <li><strong>Center (vv. 10-11):</strong> The repeated phrase "terror of the LORD" appears at the center, showing that God's holiness is both awesome and terrifying. When confronted with His glory, humanity must hide or be humbled—there is no middle ground.</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern teaches that God's exaltation requires humanity's humbling. In the day of the LORD, every source of human pride will be brought low so that the LORD alone is lifted high.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter2;
