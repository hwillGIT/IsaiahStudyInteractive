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
  { number: 1, text: "In the days of Ahaz the son of Jotham, son of Uzziah, king of Judah, Rezin the king of Syria and Pekah the son of Remaliah the king of Israel came up to Jerusalem to wage war against it, but could not yet mount an attack against it.", group: 1 },
  { number: 2, text: "When the house of David was told, 'Syria is in league with Ephraim,' the heart of Ahaz and the heart of his people shook as the trees of the forest shake before the wind.", group: 1 },
  { number: 3, text: "And the LORD said to Isaiah, 'Go out to meet Ahaz, you and Shear-jashub your son, at the end of the conduit of the upper pool on the highway to the Washer's Field.", group: 1 },
  { number: 4, text: "And say to him, 'Be careful, be quiet, do not fear, and do not let your heart be faint because of these two smoldering stumps of firebrands, because of the fierce anger of Rezin and Syria and the son of Remaliah.", group: 2, isHinge: true, hingeType: 'reassurance' },
  { number: 5, text: "Because Syria, with Ephraim and the son of Remaliah, has devised evil against you, saying,", group: 2 },
  { number: 6, text: "Let us go up against Judah and terrify it, and let us conquer it for ourselves, and set up the son of Tabeel as king in the midst of it,'", group: 2 },
  { number: 7, text: "thus says the Lord GOD: 'It shall not stand, and it shall not come to pass.", group: 2 },
  { number: 8, text: "For the head of Syria is Damascus, and the head of Damascus is Rezin. And within sixty-five years Ephraim will be shattered from being a people.", group: 2 },
  { number: 9, text: "And the head of Ephraim is Samaria, and the head of Samaria is the son of Remaliah. If you are not firm in faith, you will not be firm at all.'\"", group: 2 },
  { number: 10, text: "Again the LORD spoke to Ahaz:", group: 3 },
  { number: 11, text: "\"Ask a sign of the LORD your God; let it be deep as Sheol or high as heaven.\"", group: 3 },
  { number: 12, text: "But Ahaz said, \"I will not ask, and I will not put the LORD to the test.\"", group: 3 },
  { number: 13, text: "And he said, \"Hear then, O house of David! Is it too little for you to weary men, that you weary my God also?", group: 3 },
  { number: 14, text: "Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.", group: 3, isHinge: true, hingeType: 'immanuel' },
  { number: 15, text: "He shall eat curds and honey when he knows how to refuse the evil and choose the good.", group: 4 },
  { number: 16, text: "For before the boy knows how to refuse the evil and choose the good, the land whose two kings you dread will be deserted.", group: 4 },
  { number: 17, text: "The LORD will bring upon you and upon your people and upon your father's house such days as have not come since the day that Ephraim departed from Judah—the king of Assyria!\"", group: 4 },
  { number: 18, text: "In that day the LORD will whistle for the fly that is at the end of the streams of Egypt, and for the bee that is in the land of Assyria.", group: 5 },
  { number: 19, text: "And they will all come and settle in the steep ravines, and in the clefts of the rocks, and on all the thornbushes, and on all the pastures.", group: 5 },
  { number: 20, text: "In that day the Lord will shave with a razor that is hired beyond the River—with the king of Assyria—the head and the hair of the feet, and it will sweep away the beard also.", group: 5 },
  { number: 21, text: "In that day a man will keep alive a young cow and two sheep,", group: 6 },
  { number: 22, text: "and because of the abundance of milk that they give, he will eat curds, for everyone who is left in the land will eat curds and honey.", group: 6 },
  { number: 23, text: "In that day every place where there used to be a thousand vines, worth a thousand shekels of silver, will become briers and thorns.", group: 6 },
  { number: 24, text: "With bow and arrows a man will come there, for all the land will be briers and thorns.", group: 6 },
  { number: 25, text: "And as for all the hills that used to be hoed with a hoe, you will not come there for fear of briers and thorns, but they will become a place where cattle are let loose and where sheep tread.", group: 6 }
];

const reflectionContent = {
  1: {
    seeing: "Two enemy kings form an alliance against Jerusalem but can't successfully attack yet. The historical setting shows Judah facing a military crisis that threatens the Davidic throne.",
    life: "You may face threats that seem overwhelming—enemies combining forces against you. Remember that God sees your situation and already knows the outcome. Wait for His word before reacting.",
    teach: "This sets the stage for God's message to King Ahaz. The Syro-Ephraimite War threatened the Davidic line, prompting God's intervention and the famous Immanuel prophecy."
  },
  2: {
    seeing: "Fear grips the royal house and all the people when they hear Syria has allied with Ephraim (northern Israel). They shake like trees in a windstorm—total terror and instability.",
    life: "Fear can shake you like wind shakes trees. But notice God doesn't condemn the fear—He sends a message to address it. Bring your fears to God rather than hiding them.",
    teach: "The house of David represents the messianic line. Threats to this line prompted divine intervention to preserve God's covenant promise that a son of David would reign forever."
  },
  3: {
    seeing: "God sends Isaiah and his son Shear-jashub (meaning 'a remnant shall return') to meet Ahaz at a specific location. Even the son's name is a message from God about the future.",
    life: "God's messages come with precision—specific people, specific places, specific times. Pay attention to how God speaks into your circumstances with detailed care.",
    teach: "The name Shear-jashub carries prophetic significance. Names in Scripture often carry messages, and this child's presence communicates God's plan for a faithful remnant."
  },
  4: {
    seeing: "God's message: Be careful, be quiet, don't fear. These two enemy kings are just 'smoldering stumps'—almost burned out, no real threat. Their fierce anger means nothing.",
    life: "What terrifies you may be just a smoldering stump in God's eyes. His perspective changes everything. Stillness and trust beat panic and hasty action every time.",
    teach: "The hinge verse introduces God's reassurance. 'Smoldering stumps' brilliantly depicts enemies that seem dangerous but are nearly extinguished. Faith requires seeing threats through God's eyes."
  },
  5: {
    seeing: "The enemies have plotted evil against Judah, making plans to attack and conquer. Their conspiracy is real, but God is about to declare it futile.",
    life: "People may devise evil against you, form real plans to harm you. God sees every plot and knows every scheme. Trust that His counter-plan is always superior.",
    teach: "God is never surprised by human conspiracies. He knows every plot before it's executed and can declare its outcome before it begins."
  },
  6: {
    seeing: "The enemy plan is detailed—terrify Judah, conquer it, replace the Davidic king with their puppet ruler (the son of Tabeel). They want to end David's dynasty and control Jerusalem.",
    life: "Your enemies may have specific, detailed plans against you. What threatens God's purposes will never succeed. No human scheme can overthrow what God has established.",
    teach: "The plan to replace David's heir strikes at God's covenant promise. Any attempt to thwart God's redemptive plan is doomed to fail, no matter how detailed or aggressive."
  },
  7: {
    seeing: "God's verdict is simple and absolute: 'It shall not stand, and it shall not come to pass.' No elaboration needed. God's 'no' settles the matter completely.",
    life: "When God says no to an enemy's plan against you, that's the end of it. You don't need to scheme or fight back. His word is final and sufficient.",
    teach: "Divine sovereignty means God can declare outcomes before events unfold. His word determines reality; human plans cannot override His decree."
  },
  8: {
    seeing: "God lays out the hierarchy—Damascus is Syria's capital, Rezin rules Damascus, and within 65 years Ephraim (northern Israel) will be destroyed as a people. Precise prediction and timeline.",
    life: "God sees the future as clearly as the present. What seems permanent and threatening now may be completely gone in God's perfect timing. Trust His perspective on time.",
    teach: "The 65-year prophecy was precisely fulfilled when Assyria deported and resettled the northern kingdom. God's prophecies include specific details and timelines that demonstrate His sovereignty over history."
  },
  9: {
    seeing: "Same pattern for Ephraim—Samaria is the capital, Remaliah's son rules Samaria. Then the crucial condition: 'If you are not firm in faith, you will not be firm at all.' Faith determines stability.",
    life: "Standing firm in life requires standing firm in faith. You can't have stability apart from trusting God. Shaky faith means a shaky life. Firm faith creates firm footing.",
    teach: "The Hebrew wordplay is profound: 'If you do not believe (ta'aminu), you will not be established (te'amenu).' Faith is the foundation of stability and security."
  },
  10: {
    seeing: "God speaks again to Ahaz. The invitation to ask for a sign is coming. God is being patient and gracious, offering proof to strengthen weak faith.",
    life: "God sometimes offers signs to strengthen your faith. He knows you're weak and afraid. Don't be too proud to ask for confirmation when God invites it.",
    teach: "God's gracious offer of a sign shows His patience with human weakness. He doesn't condemn doubt but offers evidence to overcome it."
  },
  11: {
    seeing: "God tells Ahaz to ask for any sign—as deep as Sheol (the grave) or as high as heaven. No limits. God is willing to do anything to confirm His word and build Ahaz's faith.",
    life: "God's resources are unlimited. When He invites you to ask, don't think small or hold back. His power reaches from deepest depth to highest height.",
    teach: "The unlimited scope of the offered sign—Sheol to heaven—demonstrates God's absolute power and willingness to confirm His word through supernatural validation."
  },
  12: {
    seeing: "Ahaz refuses, claiming he won't test God. This sounds pious but is actually rebellion disguised as humility. God invited the sign; refusing it is rejecting God's gracious offer.",
    life: "False humility can mask unbelief. When God invites you to ask, refusing isn't piety—it's pride or fear. True faith accepts God's invitations gratefully.",
    teach: "Ahaz's refusal to ask for a sign, though appearing righteous (based on Deuteronomy 6:16), is actually rejection of God's gracious offer. He's already decided to trust Assyria instead of God."
  },
  13: {
    seeing: "Isaiah rebukes the house of David—it's not enough that they weary people, now they weary God Himself. Their fake piety is exhausting and offensive to God.",
    life: "Spiritual pretense is exhausting to God and others. Honest doubt is better than fake faith. Your religious performances can actually offend God when they mask unbelief.",
    teach: "Wearying God is a serious indictment. Religious formalism without genuine trust grieves God more than open unbelief. God desires authentic relationship, not pious-sounding rejection."
  },
  14: {
    seeing: "Since Ahaz won't ask, God will give a sign anyway—the virgin will conceive and bear Immanuel ('God with us'). This has immediate and ultimate fulfillment in Christ.",
    life: "God's plans don't depend on your cooperation. Even when you refuse His offer, He accomplishes His purposes. The greatest gift—God with us—comes regardless of human response.",
    teach: "The Immanuel prophecy is the hinge—having both immediate fulfillment (a child born in Isaiah's time) and ultimate fulfillment in Christ's virgin birth. God's presence (Immanuel) is the ultimate sign."
  },
  15: {
    seeing: "This child will eat curds and honey—simple food suggesting either humble circumstances or the land's condition. He'll reach the age of moral discernment, knowing right from wrong.",
    life: "God works through simple, humble means. Supernatural birth leads to ordinary childhood. Divine purposes often unfold in unremarkable ways over time.",
    teach: "Curds and honey represent either poverty food (judgment's result) or wilderness food (simplicity). The child's moral development is noted because timing matters for the prophecy's fulfillment."
  },
  16: {
    seeing: "Before this child reaches the age of moral discernment, both threatening kings will be gone—their lands deserted. This gives Ahaz a specific, short timeline for the threat's end.",
    life: "God's deliverance often comes within a specific timeframe. The threats you face today have expiration dates. Trust God's timing even when you can't see the calendar.",
    teach: "This provides the near-term fulfillment—within a few years, both Syria and northern Israel would fall to Assyria. The child born serves as a living timeline of prophecy's fulfillment."
  },
  17: {
    seeing: "But then the warning—the very Assyria that defeats these enemies will become Judah's judge, bringing worse days than when Israel split from Judah under Rehoboam. Wrong alliance brings disaster.",
    life: "The solution you choose apart from God may become your biggest problem. What rescues you today can destroy you tomorrow if it's not God's plan. Trust Him, not human alliances.",
    teach: "Because Ahaz will trust Assyria instead of God, Assyria will become Judah's oppressor. Wrong trust leads to judgment. The greatest danger isn't current enemies but future consequences of faithless choices."
  },
  18: {
    seeing: "God will whistle for Egypt and Assyria like calling insects—the fly from Egypt's streams, the bee from Assyria. He summons nations like a shepherd calls animals. Total sovereignty.",
    life: "God commands nations like you'd call a pet. The superpowers you fear or court are under His complete control. He whistles and they come. Trust the Sovereign, not the servants.",
    teach: "The fly and bee imagery shows God's sovereignty over nations. Flies and bees respond to calls or whistles; similarly, mighty empires are at God's beck and call."
  },
  19: {
    seeing: "These nations will swarm everywhere—ravines, rock clefts, thornbushes, pastures. Every part of the land will be infested with foreign invaders. Complete occupation.",
    life: "When judgment comes, it touches every area—nothing escapes. The thoroughness of consequences should motivate thoroughness in obedience. Don't leave pockets of rebellion.",
    teach: "The comprehensive infestation imagery shows total judgment. Just as insects get everywhere, the invading armies will penetrate every corner of Judah."
  },
  20: {
    seeing: "God will use Assyria (the razor 'hired beyond the River') to shave Judah completely—head, legs, beard. Total humiliation. The very nation Ahaz trusts becomes God's tool of judgment.",
    life: "What you hire for protection God may use for punishment. Wrong alliances backfire spectacularly. The beard's removal represents complete loss of dignity and honor.",
    teach: "Shaving represents utter humiliation in ancient culture. God will use the hired razor (Assyria) to thoroughly humble Judah. Ironic justice—the nation Ahaz trusts brings his shame."
  },
  21: {
    seeing: "After judgment, a man will survive with just one young cow and two sheep—minimal livestock. This pictures poverty and decimation of herds.",
    life: "Judgment reduces abundance to bare survival. What once flourished becomes minimal. Yet even in judgment, God preserves a remnant—survival, however humble, is grace.",
    teach: "The small number of animals shows how thoroughly the land will be devastated. What remains is barely enough for survival, demonstrating judgment's severity."
  },
  22: {
    seeing: "The livestock's milk is abundant relative to need because there are so few people left. Everyone eats curds and honey—not luxuries but poverty food. Fewer people, simple diet.",
    life: "God provides for survivors even in judgment's aftermath. You may lose much but never all if you're in God's remnant. Simple provision beats abundant destruction.",
    teach: "Curds and honey indicate the land has reverted to pastoral simplicity. The abundance of milk relative to population shows how few people remain—judgment has decimated the population."
  },
  23: {
    seeing: "Valuable vineyards—1,000 vines worth 1,000 silver shekels—will become worthless briers and thorns. Agricultural productivity reverses to wilderness. Wealth becomes waste.",
    life: "What took years to cultivate can become worthless wasteland through judgment. Your productive 'vineyards' require God's blessing to remain fruitful. Don't take them for granted.",
    teach: "The reversal from valuable vineyard to worthless thornland shows complete economic collapse. What represented wealth and careful cultivation becomes wild, unusable land."
  },
  24: {
    seeing: "People will need weapons just to travel through the land—bows and arrows for protection from wild animals in the overgrown thornland. Civilization has collapsed to wilderness.",
    life: "When God's order is removed, chaos and danger replace peace and productivity. What was safe becomes threatening. Cherish and protect the order God provides.",
    teach: "Needing weapons to traverse the land shows how thoroughly judgment has reversed civilization. Cultivated land has become dangerous wilderness requiring armed travel."
  },
  25: {
    seeing: "Even the hills that were carefully hoed for crops will be abandoned from fear of thorns. They'll become grazing land for cattle and sheep. Agriculture gives way to wild pasture.",
    life: "Human effort without God's blessing ultimately fails. What you carefully cultivate can be reclaimed by wildness. Our work only prospers through God's sustaining grace.",
    teach: "The chapter ends with complete agricultural collapse. Carefully cultivated hillside terraces are abandoned, reverting to rough pasture. This pictures total judgment on the land's productivity."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["2 Kings 16:5-7 - Historical account of Syro-Ephraimite War", "2 Chronicles 28:5-8 - Ahaz defeated by Syria and Israel"],
    to: ["Matthew 1:9 - Ahaz in Jesus' genealogy", "Luke 1:32 - He will reign on the throne of David forever"],
    context: "The Syro-Ephraimite War threatened the Davidic line, prompting God's intervention. Despite Ahaz's unfaithfulness, God preserved the messianic lineage that would lead to Christ."
  },
  2: {
    from: ["2 Samuel 7:12-16 - God's covenant with David's house", "Psalm 46:1-3 - God is our refuge, we will not fear though the earth gives way"],
    to: ["Luke 21:26 - People fainting with fear", "Hebrews 13:6 - The Lord is my helper; I will not fear"],
    context: "Threats to the house of David triggered divine intervention because God had covenanted to establish David's throne forever. Fear gripped them, but God sent reassurance."
  },
  4: {
    from: ["Exodus 14:13-14 - The LORD will fight for you; you need only to be still", "Psalm 46:10 - Be still and know that I am God"],
    to: ["Matthew 8:26 - Why are you afraid, O you of little faith?", "2 Timothy 1:7 - God gave us not a spirit of fear but of power"],
    context: "The hinge verse introduces God's reassurance. 'Smoldering stumps' depicts enemies that seem dangerous but are nearly extinguished. Faith requires seeing threats through God's perspective."
  },
  7: {
    from: ["Psalm 33:10-11 - The LORD brings the counsel of nations to nothing", "Proverbs 19:21 - Many plans are in the mind of a man, but the LORD's purpose will stand"],
    to: ["Acts 4:25-28 - Herod and Pilate gathered to do what God's plan had predestined", "Revelation 17:17 - God has put it into their hearts to carry out His purpose"],
    context: "Divine sovereignty means God can declare outcomes before events unfold. His word determines reality; human plans cannot override His decree. What God says will not stand, cannot stand."
  },
  9: {
    from: ["Psalm 118:8-9 - Better to take refuge in the LORD than to trust in man", "2 Chronicles 20:20 - Believe in the LORD your God, and you will be established"],
    to: ["Romans 11:20 - They were broken off because of unbelief, but you stand fast through faith", "Hebrews 11:6 - Without faith it is impossible to please God"],
    context: "The Hebrew wordplay is profound: 'If you do not believe (ta'aminu), you will not be established (te'amenu).' Faith is the foundation of stability and security in God's kingdom."
  },
  12: {
    from: ["Deuteronomy 6:16 - You shall not put the LORD your God to the test", "Judges 6:36-40 - Gideon asks for signs from God"],
    to: ["Matthew 4:7 - You shall not put the Lord your God to the test", "John 4:48 - Unless you see signs and wonders you will not believe"],
    context: "Ahaz's refusal appears righteous but masks unbelief. God invited the sign; refusing it rejects God's gracious offer. He'd already decided to trust Assyria instead of God."
  },
  14: {
    from: ["Genesis 3:15 - Seed of the woman will crush the serpent's head", "2 Samuel 7:12-14 - I will raise up your offspring and establish his kingdom forever"],
    to: ["Matthew 1:23 - The virgin will conceive, and they shall call his name Immanuel", "Luke 1:31-35 - You will conceive and bear a son, and call his name Jesus"],
    context: "The Immanuel prophecy is the supreme hinge—having both immediate fulfillment (a child in Isaiah's time) and ultimate fulfillment in Christ's virgin birth. God with us is the ultimate sign."
  },
  17: {
    from: ["1 Kings 12:16-19 - Israel departs from the house of David", "2 Kings 15:29 - Assyria takes captive to Assyria"],
    to: ["2 Kings 18:13 - Sennacherib king of Assyria came against Judah", "Matthew 1:11 - Jechoniah and his brothers at the time of the deportation to Babylon"],
    context: "Because Ahaz trusts Assyria instead of God, Assyria becomes Judah's oppressor. Wrong trust leads to judgment. The greatest danger isn't current enemies but future consequences of faithless choices."
  },
  18: {
    from: ["Isaiah 5:26 - He will whistle for them from the ends of the earth", "Deuteronomy 28:49 - The LORD will bring a nation against you from far away"],
    to: ["Revelation 17:17 - God has put it into their hearts to carry out His purpose", "Acts 4:27-28 - Gathered to do whatever Your hand and plan had predestined"],
    context: "God's sovereignty over nations is absolute—He whistles and empires come like trained animals. The superpowers Ahaz fears or courts are completely under God's control."
  },
  20: {
    from: ["Leviticus 21:5 - They shall not shave off the edges of their beard", "2 Samuel 10:4-5 - David's servants humiliated by having beards shaved off"],
    to: ["Micah 1:16 - Make yourselves bald for your precious children", "Ezra 9:3 - I tore my garment and pulled hair from my head and beard"],
    context: "Shaving represents utter humiliation in ancient culture. God uses the hired razor (Assyria) to thoroughly humble Judah. Ironic justice—the nation Ahaz trusts brings his shame."
  },
  23: {
    from: ["Isaiah 5:6 - I will make it a waste; it shall not be pruned or hoed, briers and thorns shall grow up", "Hosea 2:12 - I will lay waste her vines"],
    to: ["Hebrews 6:7-8 - Land that produces thorns is worthless and near to being cursed", "Luke 8:7 - Some seed fell among thorns, and the thorns grew up and choked it"],
    context: "The reversal from valuable vineyard to worthless thornland shows complete economic collapse. What represented wealth and cultivation becomes wild, unusable land under God's judgment."
  },
  25: {
    from: ["Genesis 3:18 - Thorns and thistles it shall bring forth for you", "Judges 8:7 - I will flail your flesh with thorns of the wilderness"],
    to: ["Matthew 13:7 - Other seeds fell among thorns, and the thorns grew up and choked them", "Hebrews 6:8 - If it bears thorns and thistles, it is worthless and near to being cursed"],
    context: "The chapter ends with complete agricultural collapse. Carefully cultivated hillside terraces are abandoned, reverting to rough pasture. This pictures total judgment on productivity without God's blessing."
  }
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'reassurance': 'bg-blue-400',
    'immanuel': 'bg-green-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'reassurance': 'Blue dots mark God\'s reassurance to Ahaz—"Do not fear these smoldering stumps."',
    'immanuel': 'Green dots mark the Immanuel prophecy—God\'s sign of His presence with His people.'
  };
  return explanations[hingeType] || '';
};

const getUniqueHingeTypes = (): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
};

function Chapter7() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [showStructureModal, setShowStructureModal] = useState(false);

  const getGroupName = (group: number): string => {
    const names = {
      1: "The Syro-Ephraimite Threat",
      2: "God's Reassurance to Ahaz",
      3: "The Immanuel Sign",
      4: "Near and Far Fulfillment",
      5: "Assyria: The Hired Razor",
      6: "The Land Becomes Wilderness"
    };
    return names[group as keyof typeof names] || "";
  };

  const getGroupTransition = (group: number): string => {
    const transitions = {
      1: "Enemy alliance threatens Jerusalem, fear grips the royal house",
      2: "Trust God, not fear - enemies are just smoldering stumps",
      3: "Ahaz refuses a sign, God gives Immanuel anyway",
      4: "Child's timeline reveals immediate deliverance, future judgment",
      5: "Assyria summoned like insects to execute God's judgment",
      6: "Cultivated land becomes thornland, civilization to wilderness"
    };
    return transitions[group as keyof typeof transitions] || "";
  };

  const getColorClass = (group: number, isHovered: boolean = false): string => {
    const colors = {
      1: isHovered ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600",
      2: isHovered ? "bg-blue-600 border-blue-700" : "bg-blue-500 border-blue-600",
      3: isHovered ? "bg-green-600 border-green-700" : "bg-green-500 border-green-600",
      4: isHovered ? "bg-purple-600 border-purple-700" : "bg-purple-500 border-purple-600",
      5: isHovered ? "bg-orange-600 border-orange-700" : "bg-orange-500 border-orange-600",
      6: isHovered ? "bg-gray-700 border-gray-800" : "bg-gray-600 border-gray-700"
    };
    return colors[group as keyof typeof colors] || "";
  };

  const getReflectionContent = (verseNum: number) => {
    return reflectionContent[verseNum as keyof typeof reflectionContent] || {
      seeing: "This verse contributes to Isaiah's message about faith and God's sovereignty.",
      life: "Consider how this verse speaks to trusting God in crisis.",
      teach: "This verse reveals truth about God's faithfulness to His covenant promises."
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
            <Link to="/chapter-2" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 2</Link>
            <Link to="/chapter-3" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 3</Link>
            <Link to="/chapter-4" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 4</Link>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <Link to="/chapter-6" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 6</Link>
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 7</span>
            <Link to="/chapter-8" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 8</Link>
            <Link to="/chapter-9" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 9</Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 7 Interactive Study</h1>
          <p className="text-lg text-gray-600">The Sign of Immanuel - God With Us</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Understanding Faith, Fear, and the Promise</h2>
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
          <span className="text-sm opacity-90">See the flow from threat to promise</span>
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
                <div className={`absolute -top-2 -left-2 w-4 h-4 ${getHingeColor(verse.hingeType)} rounded-full border-2 border-white shadow-md z-10`}></div>
              )}
              <button
                onClick={() => setSelectedVerse(verse)}
                onMouseEnter={() => setHoveredVerse(verse.number)}
                onMouseLeave={() => setHoveredVerse(null)}
                className={`w-full h-24 rounded-lg border-2 ${getColorClass(verse.group, hoveredVerse === verse.number)} text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 relative overflow-hidden`}
              >
                <span className="relative z-10">7:{verse.number}</span>
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
                    <h2 className="text-2xl font-bold text-gray-800">Verse 7:{selectedVerse.number}</h2>
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
                  <h3 className="text-xl font-bold text-gray-800">Chapter 7 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on the Immanuel sign, with prophetic word framing the divine promise:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-9): <span className="font-sans font-semibold text-red-700">Prophetic Reassurance</span> — "Do not fear these smoldering stumps"</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (10-11): <span className="font-sans font-semibold text-blue-700">Invitation to Ask</span> — "Ask for a sign from the LORD"</span>
                  </div>
                  <div className="ml-8 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-green-800 font-bold">★ CENTER (12-14): The Immanuel Sign</span>
                  </div>
                  <div className="ml-12 text-green-700 font-sans italic pl-5">"The virgin shall conceive... God with us"</div>
                  <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (12): <span className="font-sans font-semibold text-blue-700">Refusal to Ask</span> — "I will not ask, nor test the LORD"</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (15-25): <span className="font-sans font-semibold text-purple-700">Prophetic Judgment</span> — Assyrian invasion and desolation</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>A ↔ A':</strong> The chapter opens with Isaiah's prophetic reassurance—"Do not fear" (vv. 1-9)—but closes with prophetic warnings of judgment through Assyria (vv. 15-25). God offers peace, but rejecting His word brings the very disaster He promised to prevent.</li>
                    <li><strong>B ↔ B':</strong> God graciously invites Ahaz to ask for any sign (vv. 10-11), but Ahaz piously refuses (v. 12). This seeming humility is actually faithless rebellion—refusing to trust God's promise by refusing to test it. Faith that won't accept confirmation isn't faith at all.</li>
                    <li><strong>Center (vv. 12-14):</strong> Despite Ahaz's refusal, God gives the sign anyway—Immanuel, "God with us." This is the ultimate promise: God Himself will dwell among His people through a virgin-born son. The sign transcends the immediate crisis, pointing to the Messiah who is both fully divine ("God") and fully present ("with us").</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals that God's grace persists even when rejected. Ahaz refuses the sign, but God gives it anyway—not just for one crisis, but as the eternal answer to all human need. Immanuel stands at the center, God's unshakeable promise despite human faithlessness.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter7;
