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
  { number: 1, text: "For behold, the Lord GOD of hosts is taking away from Jerusalem and from Judah support and supply, all support of bread, and all support of water;", group: 1 },
  { number: 2, text: "the mighty man and the soldier, the judge and the prophet, the diviner and the elder,", group: 1 },
  { number: 3, text: "the captain of fifty and the man of rank, the counselor and the skillful magician and the expert in charms.", group: 1 },
  { number: 4, text: "And I will make boys their princes, and infants shall rule over them.", group: 2 },
  { number: 5, text: "And the people will oppress one another, every one his fellow and every one his neighbor; the youth will be insolent to the elder, and the despised to the honorable.", group: 2 },
  { number: 6, text: "For a man will take hold of his brother in the house of his father, saying: 'You have a cloak; you shall be our leader, and this heap of ruins shall be under your rule';", group: 2 },
  { number: 7, text: "in that day he will speak out, saying: 'I will not be a healer; in my house there is neither bread nor cloak; you shall not make me leader of the people.'", group: 2 },
  { number: 8, text: "For Jerusalem has stumbled, and Judah has fallen, because their speech and their deeds are against the LORD, defying his glorious presence.", group: 3, isHinge: true, hingeType: 'root-cause' },
  { number: 9, text: "For the look on their faces bears witness against them; they proclaim their sin like Sodom; they do not hide it. Woe to them! For they have brought evil on themselves.", group: 3 },
  { number: 10, text: "Tell the righteous that it shall be well with them, for they shall eat the fruit of their deeds.", group: 3 },
  { number: 11, text: "Woe to the wicked! It shall be ill with them, for what their hands have done shall be done to them.", group: 3 },
  { number: 12, text: "My people—infants are their oppressors, and women rule over them. O my people, your guides mislead you and they have swallowed up the course of your paths.", group: 4 },
  { number: 13, text: "The LORD has taken his place to contend; he stands to judge peoples.", group: 4 },
  { number: 14, text: "The LORD will enter into judgment with the elders and princes of his people: 'It is you who have devoured the vineyard, the spoil of the poor is in your houses.", group: 4 },
  { number: 15, text: "What do you mean by crushing my people, by grinding the face of the poor?' declares the Lord GOD of hosts.", group: 4 },
  { number: 16, text: "The LORD said: Because the daughters of Zion are haughty and walk with outstretched necks, glancing wantonly with their eyes, mincing along as they go, tinkling with their feet,", group: 5 },
  { number: 17, text: "therefore the Lord will strike with a scab the heads of the daughters of Zion, and the LORD will lay bare their secret parts.", group: 5 },
  { number: 18, text: "In that day the Lord will take away the finery of the anklets, the headbands, and the crescents;", group: 5 },
  { number: 19, text: "the pendants, the bracelets, and the scarves;", group: 5 },
  { number: 20, text: "the headdresses, the armlets, the sashes, the perfume boxes, and the amulets;", group: 5 },
  { number: 21, text: "the signet rings and nose rings;", group: 5 },
  { number: 22, text: "the festal robes, the mantles, the cloaks, and the handbags;", group: 5 },
  { number: 23, text: "the mirrors, the linen garments, the turbans, and the veils.", group: 5 },
  { number: 24, text: "Instead of perfume there will be rottenness; and instead of a belt, a rope; and instead of well-set hair, baldness; and instead of a rich robe, a skirt of sackcloth; and branding instead of beauty.", group: 5 },
  { number: 25, text: "Your men shall fall by the sword and your mighty men in battle.", group: 5 },
  { number: 26, text: "And her gates shall lament and mourn; empty, she shall sit on the ground.", group: 5 }
];

const reflectionContent = {
  1: {
    seeing: "God removes the fundamental supports of society—food, water, and capable leadership. When these basic necessities vanish, the entire social structure collapses.",
    life: "What are you depending on for security? God can remove any earthly support to show us that He alone is our true foundation. Our ultimate security must rest in Him.",
    teach: "Divine judgment often works by removing what people trust instead of God. The removal of bread, water, and leaders demonstrates that no human provision can substitute for God's blessing."
  },
  2: {
    seeing: "God systematically removes every type of leader—military (mighty man, soldier), judicial (judge), religious (prophet), and civic (elder). The complete list shows total leadership vacuum.",
    life: "When godly leadership disappears, society descends into chaos. This reminds us to pray for leaders and to value those who lead with wisdom and integrity.",
    teach: "God's judgment includes removing competent leadership as a consequence of national sin. The exhaustive list emphasizes the comprehensive nature of this judgment."
  },
  3: {
    seeing: "Even the lesser leaders—captains, counselors, and those with specialized skills—are removed. No level of expertise or authority remains. The society is left completely leaderless.",
    life: "Expertise and skill are gifts from God. When we use them for selfish purposes rather than serving others, God can withdraw these resources entirely.",
    teach: "This verse completes the catalog of removed leaders, showing that judgment touches every level of society. God's sovereignty extends over all human institutions."
  },
  4: {
    seeing: "The leadership vacuum is filled with the least qualified—boys and infants. This isn't literal children ruling, but a picture of immature, incompetent leadership taking control.",
    life: "When mature, godly leadership is absent, immature and foolish voices fill the void. This is both judgment and natural consequence of rejecting wisdom.",
    teach: "Incompetent leadership is a sign of God's judgment. When a nation rejects God's wisdom, He allows foolish leaders to arise as both consequence and correction."
  },
  5: {
    seeing: "Social order completely breaks down—people oppress each other, youth disrespect elders, the despised challenge the honorable. All the normal structures of respect and authority collapse.",
    life: "Where are you seeing social breakdown around you? This chaos reflects humanity's need for God's order. Without Him, society descends into oppression and disorder.",
    teach: "The breakdown of social norms and respect for authority is a direct consequence of rejecting God. When people defy God's order, human relationships deteriorate."
  },
  6: {
    seeing: "The desperation is so great that people beg anyone with even a cloak to become their leader. Owning clothing becomes the only qualification for leadership.",
    life: "In times of crisis, we're tempted to follow anyone who seems slightly better off. True leadership requires more than appearances or minimal resources. Seek godly character.",
    teach: "When society lacks true leaders, people grasp at anyone with even minimal resources. This shows the desperation that follows God's judgment on leadership."
  },
  7: {
    seeing: "Even those minimally qualified refuse leadership, recognizing they have nothing to offer. Nobody wants responsibility for the ruins. The leadership crisis is complete.",
    life: "Sometimes the wisest thing to say is 'I can't help.' Don't take on responsibilities you're not equipped for, and don't follow leaders who lack the resources or wisdom to lead well.",
    teach: "The refusal of even minimally qualified people to lead shows the depth of social collapse. When God removes His blessing, no human effort can provide solutions."
  },
  8: {
    seeing: "This verse reveals the root cause—Jerusalem and Judah have fallen because their words and actions defy God's presence. Open rebellion against God brings open judgment.",
    life: "Your words and deeds either honor or defy God's presence. There's no neutral ground. Every choice either acknowledges His authority or rebels against it.",
    teach: "The hinge verse identifies the core problem: deliberate defiance of God's glorious presence. Sin isn't just moral failure but active rebellion against God Himself."
  },
  9: {
    seeing: "Their sin is so brazen they don't even hide it, like Sodom's open wickedness. Their very faces show their guilt. They've brought judgment on themselves.",
    life: "Are you hiding sin or flaunting it? While all sin offends God, brazen, unashamed sin adds rebellion to transgression. Humility and repentance open the door to mercy.",
    teach: "Comparing Judah to Sodom emphasizes the depth of their moral corruption. Unrepentant, public sin brings swift judgment because it openly challenges God's authority."
  },
  10: {
    seeing: "In the midst of judgment, God still distinguishes the righteous. Those who walk with God will experience blessing, eating the fruit of their faithful deeds.",
    life: "Even when judgment falls around you, God sees and rewards faithfulness. Continue doing right even when society crumbles. Your faithful deeds will bear good fruit.",
    teach: "God's judgment is discriminating, not indiscriminate. The righteous are preserved and blessed even when the wicked face consequences. God sees and rewards faithfulness."
  },
  11: {
    seeing: "The wicked face the opposite—what they've done to others will be done to them. Justice is perfectly measured—they receive exactly what their hands have dealt out.",
    life: "You reap what you sow. The harm you cause others has a way of returning to you. This should motivate both caution in how we treat others and repentance for past wrongs.",
    teach: "Perfect justice means the wicked receive exactly what they've given. This lex talionis (law of retaliation) principle shows God's judgment is precisely calibrated to the crime."
  },
  12: {
    seeing: "God laments that His people are oppressed by infants and ruled by women—likely meaning weak, ineffectual leadership. Their guides have led them completely astray.",
    life: "Who are you following? Bad guides don't just fail to lead—they actively mislead, swallowing up the right path entirely. Choose leaders who follow God faithfully.",
    teach: "False guides don't just miss the way—they consume and destroy the correct path. This emphasizes the serious responsibility of those who lead God's people."
  },
  13: {
    seeing: "God stands up in His heavenly courtroom, ready to bring His case. This is formal judicial language—God as prosecutor, judge, and witness is taking His stand.",
    life: "God sees every injustice and will call the powerful to account. If you've been wronged, take comfort—God stands ready to judge. If you've wronged others, repent before He does.",
    teach: "The courtroom imagery shows God's judgment is legal and formal, not arbitrary. He has legitimate charges, evidence, and the authority to render just verdicts."
  },
  14: {
    seeing: "God specifically indicts the leaders for devouring the vineyard (the people) and stealing from the poor. The spoils of their oppression fill their houses.",
    life: "Leaders will be judged for how they treated those under their care. If you have authority—in family, work, or church—use it to serve and protect, not exploit.",
    teach: "The vineyard represents Israel, God's precious planting. Leaders who should have tended it have instead devoured it, consuming what they should have protected."
  },
  15: {
    seeing: "God's rhetorical question devastates: 'What do you mean by crushing my people?' Leaders have ground down the poor like grain. God takes this personally—'my people.'",
    life: "When the powerful crush the weak, they're not just harming people—they're attacking those God calls 'my people.' He takes oppression personally and will defend the defenseless.",
    teach: "God identifies with the oppressed. To crush the poor is to attack God Himself. This reveals God's character as defender of the vulnerable and judge of oppressors."
  },
  16: {
    seeing: "The daughters of Zion walk with proud, stretched necks, flirting eyes, and deliberately seductive gaits, their jewelry tinkling to draw attention. Their body language screams pride and vanity.",
    life: "How do you present yourself? While appearance isn't everything, deliberately seductive or prideful behavior reveals heart issues. True beauty flows from humble character, not vain displays.",
    teach: "The detailed description of prideful behavior shows God notices not just actions but attitudes expressed through body language. Pride manifests in how we carry ourselves."
  },
  17: {
    seeing: "God's judgment will be humiliating—disease will affect their heads, and their private parts will be exposed. What they used for proud display becomes their shame.",
    life: "What you use for prideful display may become your source of shame. Better to humble yourself now than be humiliated later when God exposes what you've hidden.",
    teach: "Divine judgment often involves poetic justice—what people used for pride becomes their humiliation. Public pride leads to public shame."
  },
  18: {
    seeing: "God begins cataloging the finery He'll strip away, starting with anklets, headbands, and crescents. Each item represents wealth, status, and prideful adornment.",
    life: "How much of your identity is tied to possessions and appearance? When God strips these away, what's left? Build your identity on what lasts—character and relationship with God.",
    teach: "The detailed list of luxuries emphasizes how much the women's identity depended on external adornment. God will remove every false source of value and pride."
  },
  19: {
    seeing: "The list continues with pendants, bracelets, and scarves—more jewelry and accessories that displayed wealth and attracted attention. Each item will be taken away.",
    life: "Possessions can become idols when they define our worth. God sometimes removes what we treasure to show us where our true treasure should be.",
    teach: "The extensive catalog shows the depth of materialism and vanity. Each item represented misplaced value—beauty found in things rather than God."
  },
  20: {
    seeing: "Headdresses, armlets, sashes, perfume boxes, amulets—the list grows longer, showing the elaborate attention to luxury and appearance. Nothing escapes God's notice or judgment.",
    life: "The longer the list, the clearer the excess. What accumulations in your life reveal misplaced priorities? Simplicity often brings freedom from the burden of possessions.",
    teach: "The exhaustive inventory demonstrates that God sees every detail of our pride and materialism. Nothing is too small to escape His judgment on vanity."
  },
  21: {
    seeing: "Signet rings and nose rings—even items with potential legitimate use become part of the indictment when used for prideful display and excess.",
    life: "It's not the items themselves but the heart attitude behind them that God judges. The same possession can be neutral or sinful depending on our motivations.",
    teach: "The judgment isn't merely on luxury but on the pride and vanity expressed through these possessions. God judges the heart attitude, not just the external items."
  },
  22: {
    seeing: "Festal robes, mantles, cloaks, handbags—clothing for special occasions and everyday accessories. The catalog seems endless, emphasizing the obsessive focus on appearance.",
    life: "When your list of 'necessities' grows endlessly, examine your heart. Do you own possessions, or do they own you? Contentment comes from God, not accumulation.",
    teach: "The relentless list creates a sense of overwhelming excess. Isaiah piles item upon item to show how far materialism had gone in Jerusalem's elite circles."
  },
  23: {
    seeing: "Mirrors, fine linen, turbans, veils—the list concludes with items ranging from vanity tools to expensive fabrics. Every aspect of proud self-adornment will be stripped away.",
    life: "Mirrors represent self-focus and vanity. When we spend more time on our reflection than on reflecting God's character, we've lost proper priorities.",
    teach: "The complete inventory from verses 18-23 emphasizes total judgment on materialism. Nothing prideful will remain when God's judgment falls."
  },
  24: {
    seeing: "The reversals are devastating and specific—perfume becomes stench, belts become ropes, beautiful hair becomes baldness, rich robes become sackcloth, beauty becomes branding marks.",
    life: "Pride's fall is always harder than humility's rise. What seems glorious now can become shameful later. Choose humble service over proud display while you can.",
    teach: "The point-by-point reversal shows poetic justice—each source of pride becomes its opposite shame. This pattern of reversal emphasizes complete judgment."
  },
  25: {
    seeing: "The final consequence: their men fall in battle. The proud display was meant to attract men, but those men will die in war, leaving the women alone.",
    life: "Everything we trust in besides God can be taken away. Relationships, strength, protection—all can vanish. Only God is an unshakeable foundation.",
    teach: "The chapter that began with removing leaders ends with those leaders falling in battle. The judgment is comprehensive—social, moral, material, and military."
  },
  26: {
    seeing: "Jerusalem's gates, once bustling with life, now mourn empty. The city sits desolate on the ground like a widow. This poetic image shows complete devastation.",
    life: "What seems permanent and secure can become empty and desolate. Don't put ultimate trust in any earthly city, institution, or system. Only God's kingdom endures.",
    teach: "The personification of gates lamenting shows even the inanimate structures grieve the judgment. The image of sitting empty on the ground depicts complete defeat and mourning."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Leviticus 26:26 - Breaking the staff of bread as covenant curse", "Jeremiah 15:2-3 - Four kinds of destroyers coming"],
    to: ["Lamentations 1:1-3 - Jerusalem sits desolate", "Ezekiel 4:16-17 - Breaking the staff of bread in Jerusalem"],
    context: "Removing basic necessities shows God withdrawing His provision as judgment. What people took for granted—bread, water, leadership—demonstrates God's gracious sustaining power."
  },
  8: {
    from: ["Numbers 14:11 - How long will this people despise me?", "Jeremiah 5:1-9 - Jerusalem's defiance of God"],
    to: ["Matthew 23:37-38 - Jerusalem kills the prophets", "Romans 1:18-32 - Suppressing truth by unrighteousness"],
    context: "This hinge verse reveals the root cause of all judgment—deliberate defiance of God's glorious presence. Their rebellion isn't ignorance but willful opposition."
  },
  9: {
    from: ["Genesis 13:13 - Men of Sodom were wicked", "Genesis 19:5-9 - Sodom's brazen sin"],
    to: ["Romans 1:26-27 - Giving up natural relations", "Jude 1:7 - Sodom and Gomorrah as example of punishment"],
    context: "Comparing Judah to Sodom emphasizes shameless, public sin. They've reached the point where they flaunt wickedness rather than hiding it, sealing their judgment."
  },
  10: {
    from: ["Psalm 1:1-3 - Blessed is the man who walks in God's law", "Ecclesiastes 8:12-13 - It will be well with those who fear God"],
    to: ["Matthew 25:21 - Well done, good and faithful servant", "Galatians 6:9 - In due season we will reap"],
    context: "Even in judgment, God distinguishes and preserves the righteous. Their faithful deeds produce good fruit, showing that obedience to God always results in blessing."
  },
  13: {
    from: ["Micah 6:2 - Hear the LORD's indictment", "Psalm 50:4-6 - God summons heaven and earth to witness His judgment"],
    to: ["Revelation 20:11-12 - The great white throne judgment", "Hebrews 9:27 - Appointed to die once, then judgment"],
    context: "The courtroom imagery shows God's judgment is formal and legal. He has legitimate charges, evidence, and authority to render just verdicts against oppressive leaders."
  },
  14: {
    from: ["Jeremiah 2:34 - Blood of innocent poor found on your skirts", "Amos 5:11-12 - You trample the poor and take bribes"],
    to: ["James 5:1-6 - You have fattened yourselves and condemned the righteous", "Matthew 25:45 - As you did not do it to one of the least of these"],
    context: "Leaders who should have protected the vineyard (God's people) have instead devoured it. God holds those in authority accountable for how they treat the vulnerable."
  },
  15: {
    from: ["Exodus 22:21-24 - Do not mistreat the widow or orphan or My anger will burn", "Proverbs 22:22-23 - Do not rob the poor, for the LORD will take up their case"],
    to: ["Luke 16:19-31 - Rich man and Lazarus", "Matthew 23:14 - You devour widows' houses"],
    context: "God personally identifies with the oppressed. To crush the poor is to attack 'my people,' making oppression a direct offense against God Himself."
  },
  16: {
    from: ["Proverbs 16:18 - Pride goes before destruction", "Proverbs 6:16-17 - The LORD hates haughty eyes"],
    to: ["1 Peter 3:3-4 - Beauty should not come from outward adornment", "1 Timothy 2:9-10 - Women should adorn themselves modestly"],
    context: "Prideful body language and deliberate seduction reveal heart issues. God notices not just actions but attitudes expressed through how we carry ourselves."
  },
  24: {
    from: ["Proverbs 11:2 - When pride comes, then comes disgrace", "Isaiah 23:9 - The LORD has purposed it to defile pride"],
    to: ["Luke 14:11 - Everyone who exalts himself will be humbled", "Philippians 3:19 - Their glory is in their shame"],
    context: "The point-by-point reversal shows poetic justice. Each source of pride becomes its opposite shame, demonstrating that God's judgment precisely fits the sin."
  },
  26: {
    from: ["Lamentations 1:1-4 - How lonely sits the city that was full of people", "Lamentations 2:10 - The elders of Zion sit on the ground in silence"],
    to: ["Revelation 18:9-19 - Mourning over fallen Babylon", "Luke 19:41-44 - Jesus weeps over Jerusalem's coming destruction"],
    context: "Personifying Jerusalem's gates as mourning shows even inanimate structures grieve the judgment. Sitting empty on the ground depicts complete defeat, desolation, and mourning."
  }
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'root-cause': 'bg-yellow-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'root-cause': 'Yellow dot marks the hinge—revealing the root cause of judgment'
  };
  return explanations[hingeType] || '';
};

const getUniqueHingeTypes = (): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
};

function Chapter3() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [showStructureModal, setShowStructureModal] = useState(false);

  const getGroupName = (group: number): string => {
    const names = {
      1: "Leaders Removed",
      2: "Social Collapse",
      3: "Root Cause: Defying God",
      4: "God's Courtroom",
      5: "Pride and Vanity Judged"
    };
    return names[group as keyof typeof names] || "";
  };

  const getGroupTransition = (group: number): string => {
    const transitions = {
      1: "God removes all competent leadership as judgment",
      2: "Society descends into chaos and oppression",
      3: "Revealed: open defiance of God's presence brought this",
      4: "God formally prosecutes oppressive leaders",
      5: "Daughters of Zion's pride turned to shame"
    };
    return transitions[group as keyof typeof transitions] || "";
  };

  const getColorClass = (group: number, isHovered: boolean = false): string => {
    const colors = {
      1: isHovered ? "bg-orange-600 border-orange-700" : "bg-orange-500 border-orange-600",
      2: isHovered ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600",
      3: isHovered ? "bg-yellow-600 border-yellow-700" : "bg-yellow-500 border-yellow-600",
      4: isHovered ? "bg-purple-600 border-purple-700" : "bg-purple-500 border-purple-600",
      5: isHovered ? "bg-pink-600 border-pink-700" : "bg-pink-500 border-pink-600"
    };
    return colors[group as keyof typeof colors] || "";
  };

  const getReflectionContent = (verseNum: number) => {
    return reflectionContent[verseNum as keyof typeof reflectionContent] || {
      seeing: "This verse contributes to Isaiah's message about judgment on leaders and pride.",
      life: "Consider how this verse speaks to your walk with God and treatment of others.",
      teach: "This verse reveals truth about God's justice and human responsibility."
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
            <Link to="/chapter-2" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 2</Link>
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 3</span>
            <Link to="/chapter-4" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 4</Link>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <Link to="/chapter-6" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 6</Link>
            <Link to="/chapter-7" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 7</Link>
            <Link to="/chapter-8" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 8</Link>
            <Link to="/chapter-9" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 9</Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 3 Interactive Study</h1>
          <p className="text-lg text-gray-600">Judgment on Leaders and Pride</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Understanding the Collapse of Society</h2>
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
          <span className="text-sm opacity-90">See the flow from leadership to judgment</span>
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
                <span className="relative z-10">3:{verse.number}</span>
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
                    <h2 className="text-2xl font-bold text-gray-800">Verse 3:{selectedVerse.number}</h2>
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
                  <h3 className="text-xl font-bold text-gray-800">Chapter 3 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-4">This chapter shows the progression from leadership removal to societal collapse, revealing the root cause and culminating in judgment:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-3): <span className="font-sans font-semibold text-orange-700">Leaders Removed</span> — God removes all competent leadership</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (4-7): <span className="font-sans font-semibold text-red-700">Social Collapse</span> — Society descends into chaos and oppression</span>
                  </div>
                  <div className="ml-8 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-500 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-yellow-800 font-bold">★ C (8): CENTRAL TURNING POINT — Root Cause</span>
                  </div>
                  <div className="ml-12 text-yellow-700 font-sans italic pl-5">"Defying his glorious presence"</div>
                  <div className="mt-3 ml-8 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>C' (9-11): <span className="font-sans font-semibold text-yellow-700">Consequences Declared</span> — Sodom-like sin brings self-inflicted judgment</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (12-15): <span className="font-sans font-semibold text-purple-700">God's Courtroom</span> — The LORD formally prosecutes oppressive leaders</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (16-26): <span className="font-sans font-semibold text-pink-700">Pride and Vanity Judged</span> — Daughters of Zion's pride turned to shame</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">The central revelation (verse 8) identifies why judgment falls—deliberate defiance of God's glorious presence is the root cause of all societal breakdown.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter3;
