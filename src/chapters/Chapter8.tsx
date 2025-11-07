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
  { number: 1, text: "Then the LORD said to me, 'Take a large tablet and write on it in common characters, \"Belonging to Maher-shalal-hash-baz.\"'", group: 1 },
  { number: 2, text: "And I will get reliable witnesses, Uriah the priest and Zechariah the son of Jeberechiah, to attest for me.", group: 1 },
  { number: 3, text: "And I went to the prophetess, and she conceived and bore a son. Then the LORD said to me, 'Call his name Maher-shalal-hash-baz;", group: 1 },
  { number: 4, text: "for before the boy knows how to cry \"My father\" or \"My mother,\" the wealth of Damascus and the spoil of Samaria will be carried away before the king of Assyria.'", group: 1 },
  { number: 5, text: "The LORD spoke to me again:", group: 2 },
  { number: 6, text: "'Because this people has refused the waters of Shiloah that flow gently, and rejoices over Rezin and the son of Remaliah,", group: 2, isHinge: true, hingeType: 'rejection' },
  { number: 7, text: "therefore, behold, the Lord is bringing up against them the waters of the River, mighty and many, the king of Assyria and all his glory. And it will rise over all its channels and go over all its banks,", group: 2 },
  { number: 8, text: "and it will sweep on into Judah, it will overflow and pass on, reaching even to the neck, and its outspread wings will fill the breadth of your land, O Immanuel.'", group: 2 },
  { number: 9, text: "Be broken, you peoples, and be shattered; give ear, all you far countries; strap on your armor and be shattered; strap on your armor and be shattered.", group: 3 },
  { number: 10, text: "Take counsel together, but it will come to nothing; speak a word, but it will not stand, for God is with us.", group: 3 },
  { number: 11, text: "For the LORD spoke thus to me with his strong hand upon me, and warned me not to walk in the way of this people, saying:", group: 4 },
  { number: 12, text: "'Do not call conspiracy all that this people calls conspiracy, and do not fear what they fear, nor be in dread.", group: 4 },
  { number: 13, text: "But the LORD of hosts, him you shall honor as holy. Let him be your fear, and let him be your dread.", group: 4 },
  { number: 14, text: "And he will become a sanctuary and a stone of offense and a rock of stumbling to both houses of Israel, a trap and a snare to the inhabitants of Jerusalem.", group: 4, isHinge: true, hingeType: 'sanctuary' },
  { number: 15, text: "And many shall stumble on it. They shall fall and be broken; they shall be snared and taken.'", group: 4 },
  { number: 16, text: "Bind up the testimony; seal the teaching among my disciples.", group: 5 },
  { number: 17, text: "I will wait for the LORD, who is hiding his face from the house of Jacob, and I will hope in him.", group: 5 },
  { number: 18, text: "Behold, I and the children whom the LORD has given me are signs and portents in Israel from the LORD of hosts, who dwells on Mount Zion.", group: 5 },
  { number: 19, text: "And when they say to you, 'Inquire of the mediums and the necromancers who chirp and mutter,' should not a people inquire of their God? Should they inquire of the dead on behalf of the living?", group: 6 },
  { number: 20, text: "To the teaching and to the testimony! If they will not speak according to this word, it is because they have no dawn.", group: 6 },
  { number: 21, text: "They will pass through the land, greatly distressed and hungry. And when they are hungry, they will be enraged and will speak contemptuously against their king and their God, and turn their faces upward.", group: 6 },
  { number: 22, text: "And they will look to the earth, but behold, distress and darkness, the gloom of anguish. And they will be thrust into thick darkness.", group: 6 }
];

const reflectionContent = {
  1: {
    seeing: "God instructs Isaiah to write a prophetic name—'Maher-shalal-hash-baz' (meaning 'Quick to plunder, swift to spoil')—on a large public tablet in plain writing everyone can read.",
    life: "God makes His messages public and clear. He doesn't hide truth in coded language available only to the elite. His word is meant to be seen, read, and understood by all.",
    teach: "Prophetic signs were often made public to demonstrate that God announced events before they occurred. The large tablet with common writing ensures the prophecy is verifiable and undeniable."
  },
  2: {
    seeing: "Isaiah gets reliable witnesses—a priest and a respected man—to officially verify the prophecy. This creates a legal, documented record before events unfold.",
    life: "Truth requires witnesses and verification. God's word is so trustworthy it invites scrutiny and documentation. Don't be afraid to have your faith examined in the light.",
    teach: "Witnesses establish the prophecy's authenticity. When it comes to pass, no one can claim it was written after the fact or attribute it to chance. God's word is provable."
  },
  3: {
    seeing: "Isaiah's wife (the prophetess) conceives and bears a son. God commands the child be named Maher-shalal-hash-baz—that long, awkward name everyone saw written on the tablet.",
    life: "God uses ordinary family events—birth, naming—for extraordinary purposes. Your everyday life can become a living sermon demonstrating God's truth.",
    teach: "Isaiah's son becomes a walking prophecy. Every time someone spoke his name, they declared God's message about coming judgment and deliverance. The child himself is a sign."
  },
  4: {
    seeing: "Before this baby learns to say 'father' or 'mother'—within 1-2 years—Damascus and Samaria will be plundered by Assyria. A specific, short-term prophecy with a living timeline.",
    life: "God's timing is precise. The threats you face today have specific expiration dates. A baby's development marks the countdown to God's deliverance. Trust His perfect timing.",
    teach: "The child serves as a living clock for prophecy's fulfillment. This short timeline proves Isaiah's prophetic authority when it comes to pass exactly as predicted."
  },
  5: {
    seeing: "The LORD speaks again to Isaiah. God has more to say, more warnings to give. His word continues flowing to His prophet.",
    life: "God's communication with His people isn't one-time—it's ongoing. Stay attentive because God may have more to say after His initial message. Keep listening.",
    teach: "Divine revelation often comes in stages. God doesn't give all information at once but reveals truth progressively as people need it."
  },
  6: {
    seeing: "The root problem: Judah has refused the gentle waters of Shiloah (Jerusalem's water supply, representing God's quiet provision) and instead rejoices in alliance with Syria and Ephraim's kings.",
    life: "Do you reject God's gentle provision for the excitement of worldly alliances? Quiet trust in God seems boring compared to dramatic political solutions. But rejecting His gentle care brings harsh consequences.",
    teach: "Shiloah's gentle waters represent God's quiet, faithful provision for Jerusalem. Rejecting this for political alliances shows preference for human solutions over divine care—the core issue behind judgment."
  },
  7: {
    seeing: "Because they refused gentle waters, God brings 'the River'—the mighty Euphrates, representing Assyria. What flows gently they rejected; what floods violently they'll receive. Harsh replacement for gentle provision.",
    life: "What you refuse gently often returns violently. If you reject God's kind invitation, you may face His forceful correction. Accept His gentle waters before the flood comes.",
    teach: "The contrast between Shiloah's gentle stream and the Euphrates' mighty flood illustrates poetic justice. They rejected gentle blessing, so they'll experience overwhelming judgment through the very alliance they trusted."
  },
  8: {
    seeing: "Assyria will sweep into Judah like flood waters, rising to neck level—nearly drowning but not quite. The waters' outspread wings fill 'your land, O Immanuel.' God is present even in judgment.",
    life: "Judgment may rise to your neck, terrifying and overwhelming, but God will not let it fully drown you. Even when waters threaten to cover you, Immanuel—God with us—remains present in the land.",
    teach: "The invading flood reaches the neck—not over the head. This pictures severe but not total destruction. The address 'O Immanuel' reminds that even in judgment, God remains present with His people."
  },
  9: {
    seeing: "A taunt to the nations: Go ahead, prepare for war, strap on your armor—you'll be shattered anyway. Your military might means nothing. Repeated 'be shattered' emphasizes total defeat.",
    life: "Human strength and preparation cannot overcome what God determines. Those who oppose God's purposes will be shattered no matter how well they arm themselves. Choose His side.",
    teach: "This war cry mocks enemy nations' futile opposition to God's plan. Their preparations are useless because God fights for His purposes. Military power cannot overcome divine decree."
  },
  10: {
    seeing: "Enemy nations can strategize and make plans, but their counsel comes to nothing. They can speak, but their words won't stand. Why? Because 'God is with us'—Immanuel. His presence guarantees their failure.",
    life: "When God is with you, every plot against you fails. Human plans cannot overcome divine presence. Take comfort—if God is for you, what stands against you cannot ultimately stand.",
    teach: "Immanuel means God is with us, and His presence nullifies all enemy counsel. This verse shows why the name matters—God's presence with His people guarantees protection and victory."
  },
  11: {
    seeing: "God's strong hand comes upon Isaiah with a warning—don't walk in the way of this people. God physically grips His prophet, directing him away from the crowd's path.",
    life: "Sometimes God must grab you forcefully to redirect you from following the crowd. When everyone around you goes one way, God's strong hand may guide you another. Follow His grip, not the masses.",
    teach: "The strong hand upon Isaiah indicates both the intensity of God's communication and His determination to keep His prophet separate from the people's unfaithfulness. Prophets must walk a different path."
  },
  12: {
    seeing: "Don't call conspiracy what the people call conspiracy. Don't share their fears or dread what they dread. Popular panic isn't prophetic insight. The crowd's terror isn't God's perspective.",
    life: "Don't adopt the world's anxieties and conspiracy theories. What everyone else fears may not be worth fearing at all. God wants you to have different fears—His alone, not the crowd's hysteria.",
    teach: "False perspective on threats leads to misplaced fear. The people see conspiracies everywhere, living in paranoid dread. God calls His prophet to reject this anxious worldview entirely."
  },
  13: {
    seeing: "Instead of fearing what the crowd fears, honor the LORD as holy. Make Him your fear, Him your dread. Reverse the fear—not of circumstances but of God Himself. Right fear replaces wrong fear.",
    life: "The fear of the LORD is the beginning of wisdom. When you fear God rightly, other fears lose their power. What would you dread if you truly held God in awe?",
    teach: "Proper fear of God displaces improper fear of circumstances. Honoring God as holy means recognizing His power and majesty as infinitely greater than any earthly threat. This fear is the cure for all lesser fears."
  },
  14: {
    seeing: "For those who fear Him rightly, God becomes a sanctuary—safe refuge. But for both houses of Israel (north and south), He becomes a stone of offense, rock of stumbling, trap and snare. Same God, opposite experiences.",
    life: "Jesus is either your sanctuary or your stumbling stone. You'll either find refuge in Him or trip over Him. There's no neutral relationship with God—He's either your safety or your downfall.",
    teach: "The hinge verse shows God Himself becomes the dividing point. Those who trust Him find sanctuary; those who reject Him stumble and fall. The same rock saves some and crushes others."
  },
  15: {
    seeing: "Many will stumble on this rock, fall and break themselves on it, be trapped and captured by it. The stone they reject becomes their destruction. What could have been refuge becomes ruin.",
    life: "If you stumble over Jesus, you won't just trip—you'll be broken. What you resist in God will destroy you. Better to run to the rock for refuge than fall on it in rebellion.",
    teach: "The stone imagery intensifies—stumbling, falling, breaking, snaring, taking captive. Those who reject God don't just miss out on blessing; they actively harm themselves on the very One who could have saved them."
  },
  16: {
    seeing: "God instructs to bind up the testimony and seal the teaching among His disciples. The revelation is completed, wrapped up, preserved for the faithful. Darkness is coming; secure the light.",
    life: "In times of spiritual darkness, preserve God's truth carefully. Keep it bound to your heart, sealed in your mind. When error abounds, guarded truth becomes precious treasure.",
    teach: "Binding and sealing the testimony indicates the end of this prophetic message and its preservation for future disciples. When public rejection comes, truth retreats to the faithful few who guard it."
  },
  17: {
    seeing: "Isaiah will wait for the LORD even though God is hiding His face from Israel. Despite divine silence and apparent absence, the prophet hopes in God. Active waiting in seeming abandonment.",
    life: "Sometimes God hides His face, and you must wait in darkness. Keep hoping even when He seems absent. Waiting for God honors Him when everything else suggests giving up.",
    teach: "God hiding His face represents His withdrawal of favor and presence due to judgment. Yet the faithful prophet waits and hopes anyway, demonstrating that true faith persists even through divine silence."
  },
  18: {
    seeing: "Isaiah and his children are living signs and portents in Israel. Their very names—Shear-jashub ('a remnant shall return') and Maher-shalal-hash-baz ('quick to plunder')—declare God's message. Walking prophecies.",
    life: "Your family can be a sign to others. Your life, your children, your relationships can all point to God's truth. You're not just living your life—you're displaying God's message.",
    teach: "Prophetic signs weren't just words but embodied in people's lives and names. Isaiah's family becomes a living sermon from the LORD of hosts who dwells on Zion, constantly declaring His truth through their very existence."
  },
  19: {
    seeing: "When people tell you to consult mediums and spiritists who whisper and mutter, the response is obvious: Shouldn't people ask their God instead? Why consult the dead on behalf of the living? It's absurd.",
    life: "When you're desperate for answers, you'll be tempted to seek guidance from questionable sources. Remember: ask God first, last, and always. Don't consult darkness when you can ask the Light.",
    teach: "The rhetorical questions expose the absurdity of consulting the dead instead of the living God. Mediums and spiritists offered false communication with the dead, a practice God condemned yet people pursued in their desperation."
  },
  20: {
    seeing: "Return to God's teaching and testimony—His revealed word. If people won't speak according to this standard, they have 'no dawn'—no light, no hope, no morning. Only darkness awaits.",
    life: "The Bible is your standard for truth. Anyone whose teaching contradicts God's word dwells in darkness, no matter how enlightened they claim to be. No dawn awaits those who reject His testimony.",
    teach: "Having 'no dawn' means existing in perpetual darkness without hope of morning light. Those who reject God's revealed word as their standard have no true illumination, regardless of other claims to wisdom."
  },
  21: {
    seeing: "People wander through the land distressed and hungry. In their hunger and misery, they rage against their king and God, shaking fists at heaven. Desperation breeds blasphemy.",
    life: "When you're desperate and hungry—physically or spiritually—you're tempted to rage against God and authority. Suffering can produce either faith or fury. Choose worship over rage, even in the wilderness.",
    teach: "This pictures the desperation of those under judgment who rejected God's word. Instead of repenting, they blaspheme, speaking against both earthly king and heavenly God. Suffering without faith produces rage."
  },
  22: {
    seeing: "They look up to heaven—nothing but distress. They look to earth—darkness, anguish, gloom. Everywhere they turn, only thick darkness. No escape, no light, no hope. Total darkness surrounds them.",
    life: "Without God, there's no light anywhere you look—not above, not below, not around. All directions lead to darkness. This is why Jesus matters—He's the light in the darkness, the only hope when all is gloom.",
    teach: "The chapter ends in total darkness—looking upward or earthward reveals only distress and gloom. Those who rejected the light of God's word are thrust into thick darkness with no relief. This sets up chapter 9's stunning contrast: 'The people walking in darkness have seen a great light.'"
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Habakkuk 2:2 - Write the vision; make it plain on tablets", "Deuteronomy 27:8 - Write all the words of this law very plainly"],
    to: ["Revelation 1:19 - Write what you have seen", "Revelation 21:5 - Write this down, for these words are trustworthy"],
    context: "Public, plain writing ensures the prophecy is verifiable. God makes His truth accessible to all, not hidden in mysterious codes. The large tablet testifies that God announced events before they occurred."
  },
  4: {
    from: ["Isaiah 7:16 - Before the boy knows to refuse evil and choose good, the land will be deserted", "2 Kings 15:29 - Assyria took captive to Assyria"],
    to: ["Luke 2:12 - You will find a baby wrapped in swaddling cloths", "Galatians 4:4 - When the fullness of time had come, God sent forth his Son"],
    context: "The child serves as a living timeline for prophecy. Before he can say basic words, Damascus and Samaria fall to Assyria. This short-term fulfillment validates Isaiah's prophetic authority."
  },
  6: {
    from: ["Nehemiah 3:15 - Pool of Shiloah", "John 9:7 - Go, wash in the pool of Siloam"],
    to: ["Jeremiah 2:13 - They have forsaken me, the fountain of living waters", "John 7:37-38 - If anyone thirsts, let him come to me and drink"],
    context: "Shiloah's gentle waters represent God's quiet, faithful provision. Rejecting this for political alliances shows preference for human solutions over divine care—the hinge issue prompting judgment."
  },
  8: {
    from: ["Isaiah 7:14 - Shall call his name Immanuel", "Psalm 46:7 - The LORD of hosts is with us"],
    to: ["Matthew 1:23 - They shall call his name Immanuel (which means, God with us)", "Matthew 28:20 - I am with you always, to the end of the age"],
    context: "The address 'O Immanuel' in the midst of judgment reminds that God remains present with His people even when flood waters threaten. Divine presence doesn't prevent trials but sustains through them."
  },
  10: {
    from: ["Psalm 33:10-11 - The LORD brings the counsel of nations to nothing", "Proverbs 19:21 - Many are the plans in a man's heart, but the LORD's purpose will stand"],
    to: ["Romans 8:31 - If God is for us, who can be against us?", "Acts 5:39 - If it is of God, you will not be able to overthrow them"],
    context: "Immanuel—God with us—guarantees protection. When God's presence is with His people, all enemy counsel fails and all opposing words fall. Divine presence nullifies human opposition."
  },
  13: {
    from: ["Proverbs 9:10 - The fear of the LORD is the beginning of wisdom", "Deuteronomy 10:12 - What does the LORD require of you but to fear the LORD your God"],
    to: ["Luke 12:4-5 - Fear him who has authority to cast into hell", "1 Peter 3:14-15 - Have no fear of them, nor be troubled, but in your hearts honor Christ the Lord as holy"],
    context: "Proper fear of God displaces improper fear of circumstances. Honoring God as holy means recognizing His power as infinitely greater than any earthly threat. This fear is the cure for all lesser fears."
  },
  14: {
    from: ["Exodus 17:6 - Strike the rock, and water will come out", "Deuteronomy 32:4 - The Rock, his work is perfect"],
    to: ["Romans 9:32-33 - They have stumbled over the stumbling stone", "1 Peter 2:6-8 - A stone of offense to those who do not believe"],
    context: "The hinge verse: God Himself becomes the dividing point. Those who trust Him find sanctuary; those who reject Him stumble and fall. The same rock saves some and crushes others—fulfilled in Christ."
  },
  16: {
    from: ["Daniel 12:4 - Shut up the words and seal the book", "Revelation 10:4 - Seal up what the seven thunders have said"],
    to: ["Matthew 13:11 - To you it has been given to know the secrets of the kingdom", "Colossians 2:2-3 - That their hearts may reach all the riches of full assurance and the knowledge of God's mystery, which is Christ"],
    context: "Binding and sealing the testimony preserves truth for faithful disciples when public rejection comes. Truth retreats to the few who guard it, waiting for the day of revelation."
  },
  18: {
    from: ["Exodus 13:9 - It shall be to you as a sign on your hand", "Deuteronomy 6:7-9 - Teach them diligently to your children"],
    to: ["Hebrews 2:13 - Behold, I and the children God has given me", "1 Corinthians 4:9 - God has exhibited us apostles as a spectacle to the world"],
    context: "Isaiah's family becomes a living sermon. Their names constantly declare God's message—'a remnant shall return' and 'quick to plunder.' Prophetic signs embodied in people's lives point to the LORD who dwells on Zion."
  },
  19: {
    from: ["Leviticus 19:31 - Do not turn to mediums or necromancers", "Deuteronomy 18:10-12 - There shall not be found anyone who practices divination or is a medium"],
    to: ["1 Timothy 4:1 - Some will depart from the faith by devoting themselves to deceitful spirits", "Acts 16:16-18 - A slave girl with a spirit of divination"],
    context: "The rhetorical question exposes the absurdity: Why consult the dead when you can ask the living God? Mediums offered false communication with the dead—a practice God condemned but desperate people pursued."
  },
  20: {
    from: ["Psalm 119:105 - Your word is a lamp to my feet and a light to my path", "Isaiah 2:5 - Come, let us walk in the light of the LORD"],
    to: ["2 Peter 1:19 - A lamp shining in a dark place, until the day dawns", "John 12:46 - I have come into the world as light"],
    context: "Having 'no dawn' means perpetual darkness without hope of morning. Those who reject God's word as their standard have no illumination, regardless of other claims to wisdom."
  },
  22: {
    from: ["Amos 5:18-20 - The day of the LORD is darkness, not light", "Joel 2:2 - A day of darkness and gloom"],
    to: ["Isaiah 9:2 - The people who walked in darkness have seen a great light", "Matthew 4:16 - The people dwelling in darkness have seen a great light"],
    context: "The chapter ends in total darkness—looking anywhere reveals only distress and gloom. Those who rejected God's light are thrust into thick darkness. This sets up chapter 9's stunning contrast: 'The people walking in darkness have seen a great light' (Christ)."
  }
};

const getHingeColor = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'rejection': 'bg-yellow-400',
    'sanctuary': 'bg-yellow-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'rejection': 'Yellow dot marks the hinge—rejecting God\'s gentle waters brings judgment',
    'sanctuary': 'Yellow dot marks the hinge—God becomes sanctuary or stumbling stone'
  };
  return explanations[hingeType] || '';
};

const getUniqueHingeTypes = (): string[] => {
  const types = verses
    .filter(v => v.isHinge && v.hingeType)
    .map(v => v.hingeType as string);
  return Array.from(new Set(types));
};

function Chapter8() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [showStructureModal, setShowStructureModal] = useState(false);

  const getGroupName = (group: number): string => {
    const names = {
      1: "The Sign of Maher-shalal-hash-baz",
      2: "Refusing Gentle Waters",
      3: "Immanuel: God With Us",
      4: "Sanctuary or Stumbling Stone",
      5: "Waiting for the Hidden God",
      6: "Thick Darkness Before the Light"
    };
    return names[group as keyof typeof names] || "";
  };

  const getGroupTransition = (group: number): string => {
    const transitions = {
      1: "Child's name prophesies swift plunder of Syria and Israel",
      2: "Rejecting God's gentle provision brings Assyria's flood",
      3: "Despite judgment, God remains with His land",
      4: "God becomes either sanctuary or stumbling stone",
      5: "Isaiah waits while God hides His face from Israel",
      6: "Rejecting God's word leads to total darkness"
    };
    return transitions[group as keyof typeof transitions] || "";
  };

  const getColorClass = (group: number, isHovered: boolean = false): string => {
    const colors = {
      1: isHovered ? "bg-teal-600 border-teal-700" : "bg-teal-500 border-teal-600",
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
      seeing: "This verse contributes to Isaiah's message about prophecy and God's presence.",
      life: "Consider how this verse speaks to trusting God's word.",
      teach: "This verse reveals truth about God's sovereignty and human response."
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
            <Link to="/chapter-3" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 3</Link>
            <Link to="/chapter-4" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 4</Link>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <Link to="/chapter-6" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 6</Link>
            <Link to="/chapter-7" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 7</Link>
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 8</span>
            <Link to="/chapter-9" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 9</Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 8 Interactive Study</h1>
          <p className="text-lg text-gray-600">Sanctuary or Stumbling Stone</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Understanding the Choice Between Light and Darkness</h2>
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
          <span className="text-sm opacity-90">See the flow from sign to darkness</span>
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
                <span className="relative z-10">8:{verse.number}</span>
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
                    <h2 className="text-2xl font-bold text-gray-800">Verse 8:{selectedVerse.number}</h2>
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
                  <h3 className="text-xl font-bold text-gray-800">Chapter 8 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on "God with us," showing how the same God becomes either sanctuary or stumbling stone:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-teal-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-4): <span className="font-sans font-semibold text-teal-700">Testimony & Witnesses</span> — Prophetic sign recorded</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (5-8): <span className="font-sans font-semibold text-blue-700">Waters Overflow</span> — Assyrian flood threatens</span>
                  </div>
                  <div className="ml-8 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-green-800 font-bold">★ CENTER (9-10): Immanuel - God With Us</span>
                  </div>
                  <div className="ml-12 text-green-700 font-sans italic pl-5">"For God is with us"</div>
                  <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (11-15): <span className="font-sans font-semibold text-purple-700">Sanctuary or Stumbling Stone</span> — God becomes trap or refuge</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (16-20): <span className="font-sans font-semibold text-orange-700">Testimony Sealed</span> — Record preserved among disciples</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>A ↔ A':</strong> The chapter opens with testimony and witnesses recorded (vv. 1-4) and closes with the testimony sealed and preserved among disciples (vv. 16-20). God's word is documented and protected—whether people believe it or not, the truth stands forever.</li>
                    <li><strong>B ↔ B':</strong> The Assyrian flood threatens to overwhelm (vv. 5-8), but God Himself becomes either sanctuary (protection from the flood) or stumbling stone (causing people to fall into it) in verses 11-15. The same disaster that destroys some preserves others—the difference is their response to God.</li>
                    <li><strong>Center (vv. 9-10):</strong> At the heart stands the proclamation "Immanuel—God is with us." No matter what enemies plot or how overwhelming the threats, God's presence with His people guarantees their survival. This central truth answers all fear: if God is with us, who can stand against us?</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals a profound truth: God's presence (center) determines everything. The same God who preserves His testimony (outer frame) and confronts His people with disaster (inner frame) becomes either refuge or ruin based entirely on how we respond to Him. Immanuel is the answer—but only for those who make Him their sanctuary.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter8;
