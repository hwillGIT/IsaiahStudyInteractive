import { useState } from 'react';
import { ChapterNavigation } from '../components/ChapterNavigation';
import { StructureButton } from '../components/StructureButton';
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
  { number: 1, text: "Let me sing for my beloved my love song concerning his vineyard: My beloved had a vineyard on a very fertile hill.", group: 1 },
  { number: 2, text: "He dug it and cleared it of stones, and planted it with choice vines; he built a watchtower in the midst of it, and hewed out a wine vat in it; and he looked for it to yield grapes, but it yielded wild grapes.", group: 1 },
  { number: 3, text: "And now, O inhabitants of Jerusalem and men of Judah, judge between me and my vineyard.", group: 1 },
  { number: 4, text: "What more was there to do for my vineyard, that I have not done in it? When I looked for it to yield grapes, why did it yield wild grapes?", group: 1 },
  { number: 5, text: "And now I will tell you what I will do to my vineyard. I will remove its hedge, and it shall be devoured; I will break down its wall, and it shall be trampled down.", group: 1 },
  { number: 6, text: "I will make it a waste; it shall not be pruned or hoed, and briers and thorns shall grow up; I will also command the clouds that they rain no rain upon it.", group: 1 },
  { number: 7, text: "For the vineyard of the LORD of hosts is the house of Israel, and the men of Judah are his pleasant planting; and he looked for justice, but behold, bloodshed; for righteousness, but behold, an outcry!", group: 1, isHinge: true, hingeType: 'center' },
  { number: 8, text: "Woe to those who join house to house, who add field to field, until there is no more room, and you are made to dwell alone in the midst of the land.", group: 2 },
  { number: 9, text: "The LORD of hosts has sworn in my hearing: 'Surely many houses shall be desolate, large and beautiful houses, without inhabitant.", group: 2 },
  { number: 10, text: "For ten acres of vineyard shall yield but one bath, and a homer of seed shall yield but an ephah.'", group: 2 },
  { number: 11, text: "Woe to those who rise early in the morning, that they may run after strong drink, who tarry late into the evening as wine inflames them!", group: 3 },
  { number: 12, text: "They have lyre and harp, tambourine and flute and wine at their feasts, but they do not regard the deeds of the LORD, or see the work of his hands.", group: 3 },
  { number: 13, text: "Therefore my people go into exile for lack of knowledge; their honored men go hungry, and their multitude is parched with thirst.", group: 3 },
  { number: 14, text: "Therefore Sheol has enlarged its appetite and opened its mouth beyond measure, and the nobility of Jerusalem and her multitude will go down, her revelers and he who exults in her.", group: 3 },
  { number: 15, text: "Man is humbled, and each one is brought low, and the eyes of the haughty are brought low.", group: 3 },
  { number: 16, text: "But the LORD of hosts is exalted in justice, and the Holy God shows himself holy in righteousness.", group: 3 },
  { number: 17, text: "Then shall the lambs graze as in their pasture, and nomads shall eat among the ruins of the rich.", group: 3 },
  { number: 18, text: "Woe to those who draw iniquity with cords of falsehood, who draw sin as with cart ropes,", group: 4 },
  { number: 19, text: "who say: 'Let him be quick, let him speed his work that we may see it; let the counsel of the Holy One of Israel draw near, and let it come, that we may know it!'", group: 4 },
  { number: 20, text: "Woe to those who call evil good and good evil, who put darkness for light and light for darkness, who put bitter for sweet and sweet for bitter!", group: 4 },
  { number: 21, text: "Woe to those who are wise in their own eyes, and shrewd in their own sight!", group: 4 },
  { number: 22, text: "Woe to those who are heroes at drinking wine, and valiant men in mixing strong drink,", group: 5 },
  { number: 23, text: "who acquit the guilty for a bribe, and deprive the innocent of his right!", group: 5 },
  { number: 24, text: "Therefore, as the tongue of fire devours the stubble, and as dry grass sinks down in the flame, so their root will be as rottenness, and their blossom go up like dust; for they have rejected the law of the LORD of hosts, and have despised the word of the Holy One of Israel.", group: 5, isHinge: true, hingeType: 'climax-woes' },
  { number: 25, text: "Therefore the anger of the LORD was kindled against his people, and he stretched out his hand against them and struck them, and the mountains quaked; and their corpses were as refuse in the midst of the streets. For all this his anger has not turned away, and his hand is stretched out still.", group: 5 },
  { number: 26, text: "He will raise a signal for nations far away, and whistle for them from the ends of the earth; and behold, quickly, speedily they come!", group: 6 },
  { number: 27, text: "None is weary, none stumbles, none slumbers or sleeps, not a waistband is loose, not a sandal strap broken;", group: 6 },
  { number: 28, text: "their arrows are sharp, all their bows bent, their horses' hoofs seem like flint, and their wheels like the whirlwind.", group: 6 },
  { number: 29, text: "Their roaring is like a lion, like young lions they roar; they growl and seize their prey; they carry it off, and none can rescue.", group: 6 },
  { number: 30, text: "They will growl over it on that day, like the growling of the sea. And if one looks to the land, behold, darkness and distress; and the light is darkened by its clouds.", group: 6 }
];

const reflectionContent = {
  1: {
    seeing: "Isaiah begins with a love song about a vineyard. This gentle opening masks the devastating message to come—God's tender care for Israel contrasts with their terrible failure.",
    life: "God has invested deeply in your life. Like a careful gardener, He's cleared obstacles, planted you in the best soil, and protected you. How are you responding to His loving care?",
    teach: "The vineyard metaphor runs throughout Scripture representing Israel as God's special planting. The love song format makes the indictment even more powerful."
  },
  2: {
    seeing: "Every detail shows meticulous care—digging, clearing stones, choice vines, watchtower, wine vat. God did everything possible. Yet instead of good grapes, the vineyard produced wild, worthless fruit.",
    life: "God has given you every spiritual blessing. The question isn't what more He could do, but what fruit your life is producing. Are you yielding good fruit or wild grapes?",
    teach: "Wild grapes were bitter, useless, possibly poisonous. Despite perfect conditions and care, the vineyard failed. This shows sin isn't from lack of blessing but willful rebellion."
  },
  3: {
    seeing: "God invites the very people under judgment to judge between Him and the vineyard. This legal appeal shows the justice of His case—even they must acknowledge His fairness.",
    life: "Can you honestly judge God as unfair? When we examine His care and our response, the verdict is clear. Self-examination prevents self-deception about who's at fault.",
    teach: "By inviting Israel to judge the case, God demonstrates the absolute justice of His complaints. No one can accuse Him of unfairness or neglect."
  },
  4: {
    seeing: "God's rhetorical question devastates: What more could I have done? The answer is nothing. He exhausted every possibility. The failure is entirely the vineyard's, not the gardener's.",
    life: "When things go wrong spiritually, don't blame God. He's done everything necessary for your growth. If you're producing wild grapes, examine your choices, not His provision.",
    teach: "This verse demolishes any excuse. God gave perfect conditions, perfect care, perfect resources. The wild grapes prove the problem is the vineyard's nature, not the gardener's neglect."
  },
  5: {
    seeing: "God announces His judgment—removing protection (hedge), breaking down the wall. What He built, He'll tear down. The vineyard will be trampled and devoured.",
    life: "God's protection isn't automatic or permanent. When we persistently reject Him, He may remove His hedge and let us experience the consequences of our rebellion.",
    teach: "Divine protection is a gracious gift, not a guaranteed right. When the vineyard fails despite perfect care, God withdraws protection and allows natural consequences."
  },
  6: {
    seeing: "The judgment intensifies—no pruning, no hoeing, overgrown with thorns and briers. Even the rain will be withheld. Complete abandonment to desolation.",
    life: "Without God's active care, spiritual life deteriorates rapidly. What looks productive today becomes a wasteland tomorrow when His sustaining grace is withdrawn.",
    teach: "God's judgment includes both active destruction (trampling) and passive neglect (no rain, no care). Both the removal of protection and the withdrawal of blessing bring ruin."
  },
  7: {
    seeing: "The reveal—the vineyard is Israel, Judah is His pleasant planting. The Hebrew wordplay stings: He expected mishpat (justice) but got mispah (bloodshed); sedaqah (righteousness) but se'aqah (outcry).",
    life: "God expects His people to reflect His character—justice and righteousness. When we produce bloodshed and outcry instead, we've completely failed our purpose.",
    teach: "The hinge verse reveals the parable's meaning. The wordplay in Hebrew emphasizes how close they came to the right fruit while producing the exact opposite."
  },
  8: {
    seeing: "First woe: greedy land-grabbers joining house to house, field to field until they own everything and live isolated in the midst of their possessions.",
    life: "Accumulation can lead to isolation. When you gather more and more, pushing others out, you end up alone with your possessions. Generosity creates community; greed creates loneliness.",
    teach: "This woe condemns violating the Jubilee laws that prevented permanent land consolidation. Greed that accumulates at others' expense brings divine judgment."
  },
  9: {
    seeing: "God swears the judgment—those great houses will stand empty. The very possessions they accumulated through greed will be desolate, without inhabitants.",
    life: "What you gain through injustice won't bring lasting joy. Houses acquired by pushing others out will ultimately stand empty. Better a small home with clear conscience than a mansion with guilty one.",
    teach: "God's oath emphasizes the certainty of judgment. The poetic justice is clear—they wanted to dwell alone in great houses, and that's exactly what they'll get—alone in desolation."
  },
  10: {
    seeing: "Agricultural failure will be catastrophic—ten acres yielding only a tiny amount, seed returning almost nothing. Their fields will fail as badly as their character.",
    life: "You reap what you sow, and sometimes far less. When we build on greed and injustice, even our legitimate work produces pitiful returns. Sow righteousness; reap blessing.",
    teach: "The judgment matches the crime—they hoarded land, so their land will fail them. A bath and ephah were tiny amounts compared to the acres and seed invested."
  },
  11: {
    seeing: "Second woe: those who start drinking early and continue late into the night. Their entire day revolves around getting drunk. Alcohol has become their pursuit and passion.",
    life: "What consumes your day? If substance or pleasure is your first thought in the morning and last at night, it's become your master. Choose pursuits worthy of your time.",
    teach: "This woe condemns not just drunkenness but making it life's central pursuit. Rising early and staying late for strong drink shows alcohol has replaced God as their focus."
  },
  12: {
    seeing: "Their feasts have every entertainment—music, instruments, wine—but they ignore God's deeds and works. They celebrate but never acknowledge the One who gives all blessings.",
    life: "You can fill your life with good things yet miss the best thing—God Himself. Entertainment and pleasure aren't wrong, but when they crowd out awareness of God, they become deadly distractions.",
    teach: "The indictment isn't against feasts or music but against using them to ignore God. Pleasure that distracts from recognizing God's work becomes sinful escapism."
  },
  13: {
    seeing: "Exile comes from lack of knowledge—not academic ignorance but willful refusal to acknowledge God. Even the honored and multitudes will suffer hunger and thirst.",
    life: "Ignorance of God isn't bliss—it's disaster. When you refuse to know and acknowledge God, you go into spiritual exile even while physically present. Know Him while you can.",
    teach: "Knowledge here means intimate awareness and acknowledgment of God, not mere information. Their exile results directly from choosing not to regard God's works."
  },
  14: {
    seeing: "Sheol (the grave) opens wide its mouth to swallow Jerusalem's nobility and revelers. Death has enlarged its appetite because so many are coming. A terrible, vivid image.",
    life: "Death is never satisfied and always hungry. But those who live for feasting and revelry feed it the most. Choose life in God rather than the living death of godless pleasure.",
    teach: "Sheol personified as a ravenous beast emphasizes the magnitude of coming death. The very ones who exulted in earthly pleasures will descend into the grave."
  },
  15: {
    seeing: "Humanity is brought low, the haughty humbled. This echoes chapter 2's theme—human pride will be demolished so only God remains exalted.",
    life: "Pride precedes a fall. You can humble yourself now or be humbled later. One preserves dignity; the other destroys it. Choose voluntary humility over forced humiliation.",
    teach: "This verse connects to the broader Isaiah theme of God bringing down human pride. Judgment serves to demonstrate that God alone deserves exaltation."
  },
  16: {
    seeing: "Contrast: while humanity is brought low, the LORD is exalted through His just judgment. His holiness is displayed through righteous acts. His glory shines when He judges rightly.",
    life: "God's judgments aren't cruel but just. They reveal His holiness and righteousness. When you see judgment, remember it displays God's perfect character and vindicates His name.",
    teach: "God is exalted precisely through executing justice. His righteous judgments demonstrate His holiness. The same acts that humble humanity exalt God."
  },
  17: {
    seeing: "After judgment, lambs graze peacefully where the rich once lived. Nomads eat among ruins. Nature and simple people reclaim what greed had hoarded. A picture of reversal.",
    life: "What you grasp tightly may slip away entirely. The estates they clutched will become pasture for sheep. Better to share generously than lose everything to judgment.",
    teach: "This verse depicts the complete reversal—wealth accumulated through greed becomes grazing land for sheep and food for wandering nomads. Total loss and reversal."
  },
  18: {
    seeing: "Third woe: those who drag iniquity along with cords and sin with cart ropes. They're so committed to sin they work hard to pull it along, as if it were valuable cargo.",
    life: "What are you pulling along through life? Some people work harder at sin than at righteousness. Examine what you're dragging with effort—is it worth the labor?",
    teach: "The image of dragging sin with ropes shows deliberate, sustained effort to pursue wickedness. They're not stumbling into sin but actively transporting it."
  },
  19: {
    seeing: "They mock God, challenging Him to hurry up and show His work so they can see it. This is brazen defiance disguised as skepticism—they don't believe He'll actually judge.",
    life: "Don't mistake God's patience for permission or His silence for absence. Those who taunt God to prove Himself will eventually see—and regret what they demanded to witness.",
    teach: "Mocking God's apparent delay reveals hardened unbelief. They dare God to act, not believing He will. This supreme arrogance guarantees judgment."
  },
  20: {
    seeing: "Fourth woe: those who completely invert moral categories—calling evil good, good evil, darkness light, light darkness, bitter sweet, sweet bitter. Total moral confusion.",
    life: "Culture increasingly calls good evil and evil good. Don't be deceived by moral relativism. Truth doesn't change based on popular opinion. Hold fast to God's unchanging standards.",
    teach: "This describes complete moral inversion and corruption. When society systematically reverses God's values, judgment is imminent. Calling evil good shows profound spiritual blindness."
  },
  21: {
    seeing: "Fifth woe: those wise in their own eyes, shrewd in their own sight. Self-assessed wisdom that ignores God's wisdom is actually foolishness disguised as insight.",
    life: "The moment you think you're wise without God, you've proven you're foolish. True wisdom begins with fearing the LORD. Your own assessment of your wisdom means nothing.",
    teach: "Wisdom in one's own eyes is the epitome of folly. True wisdom acknowledges God; self-assessed wisdom that bypasses God is condemned folly."
  },
  22: {
    seeing: "Sixth woe: heroes at drinking, valiant at mixing drinks. They boast in their tolerance for alcohol, treating drunkenness as an achievement worthy of honor.",
    life: "What are you a hero at? If your claim to fame is drinking capacity or tolerance for vice, you've misunderstood heroism. True valor serves others and honors God.",
    teach: "The sarcasm bites—calling drunkards 'heroes' and 'valiant men' mocks their misplaced pride. They glory in what should shame them."
  },
  23: {
    seeing: "The real crime emerges—these drinking 'heroes' are corrupt judges who acquit the guilty for bribes and deny justice to the innocent. Drunkenness and corruption go together.",
    life: "Substance abuse often accompanies other sins. Those who dull their consciences with drink find it easier to take bribes and pervert justice. Guard your integrity at every point.",
    teach: "The connection between drunkenness (v.22) and judicial corruption (v.23) shows how one sin enables another. Drunk judges can't render righteous verdicts."
  },
  24: {
    seeing: "Judgment comes like fire consuming stubble—their root rots, their blossom becomes dust. Why? They rejected God's law and despised His word. Complete destruction from the root up.",
    life: "When you reject God's word, you destroy your own foundation. Like a plant with rotten roots, you may look alive briefly, but you're already dead. Build on God's word or collapse entirely.",
    teach: "The imagery shows total destruction—rotting roots (foundation) and dust blossoms (what was visible). Rejecting God's law ensures complete collapse."
  },
  25: {
    seeing: "God's anger burns, His hand is stretched out striking them. Mountains quake, corpses litter streets like garbage. Yet His anger isn't finished—His hand remains stretched out still.",
    life: "God's patience has limits. When judgment comes, it can be devastating. Yet even in wrath, there's warning—His hand stretched out suggests more may come if there's no repentance.",
    teach: "The refrain 'his hand is stretched out still' appears throughout Isaiah, showing ongoing judgment. Past judgment doesn't exhaust God's wrath if sin continues."
  },
  26: {
    seeing: "God signals distant nations—He whistles and they come quickly. He's summoning the invading army, controlling even Israel's enemies to execute His judgment.",
    life: "God is sovereign over all nations, even those who don't acknowledge Him. He can use anyone to accomplish His purposes, including your enemies. Submit to His sovereignty.",
    teach: "God's signal and whistle to distant nations shows His absolute sovereignty. The invading army thinks they act independently, but God summons them as His instrument."
  },
  27: {
    seeing: "The invading army is perfectly prepared—no weariness, no stumbling, no sleeping, every belt tight, every sandal strap secure. They're an unstoppable, tireless force.",
    life: "When God sends judgment, it comes with precision and power. The time to repent is now, while there's opportunity, not when the unstoppable army is at your gates.",
    teach: "The detailed description of the army's readiness emphasizes judgment's certainty and thoroughness. Nothing will stop what God has set in motion."
  },
  28: {
    seeing: "Sharp arrows, bent bows, horses' hooves like flint, wheels like whirlwind—every detail emphasizes speed, strength, and deadly efficiency. This is a terrifying military machine.",
    life: "God's judgments are precise and powerful. What He determines will be accomplished with perfect efficiency. Better to align with God than face what He sends against rebellion.",
    teach: "The military imagery intensifies—this army is equipped, prepared, and unstoppable. They represent God's judgment executed with devastating effectiveness."
  },
  29: {
    seeing: "They roar like lions seizing prey. No one can rescue from their grasp. The image is of predator and helpless prey—Israel will be devoured with none to save them.",
    life: "Without God as your defender, you're prey for every predator. The only safety is in Him. Don't wait until the lion has you in its jaws to cry out to God.",
    teach: "Lion imagery emphasizes the army's ferocity and Israel's helplessness. When God removes His protection, His people become prey with no deliverer."
  },
  30: {
    seeing: "They growl like the sea over their prey. Looking anywhere reveals only darkness and distress. Even light is darkened by clouds. This is complete, overwhelming catastrophe with no escape or hope.",
    life: "Sin leads to darkness and distress. When judgment comes in full, there's no light, no escape, no hope—only overwhelming darkness. Turn to the light while it's still day.",
    teach: "The chapter ends in total darkness—the final result of rejecting God's light. The imagery of darkened light and distress emphasizes judgment's comprehensive, inescapable nature."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Psalm 80:8-16 - You brought a vine out of Egypt", "Song of Solomon 8:11-12 - Solomon's vineyard imagery"],
    to: ["Matthew 21:33-46 - Parable of the tenants", "John 15:1-8 - Jesus as the true vine"],
    context: "The vineyard represents Israel as God's special planting. This love song format makes the coming indictment even more powerful, showing God's tender care contrasted with Israel's failure."
  },
  2: {
    from: ["Deuteronomy 32:32-33 - Their vine is from the vine of Sodom", "Jeremiah 2:21 - I planted you a choice vine, wholly of pure seed"],
    to: ["Romans 11:17-24 - Branches broken off and grafted in", "Galatians 5:22-23 - The fruit of the Spirit"],
    context: "Despite perfect conditions and care, the vineyard produced wild, worthless grapes. This shows sin isn't from lack of blessing but willful rebellion against God's goodness."
  },
  7: {
    from: ["Micah 6:8 - What does the LORD require? To do justice, love kindness", "Amos 5:24 - Let justice roll down like waters"],
    to: ["Matthew 23:23 - You have neglected justice and mercy", "James 2:13 - Judgment is without mercy to one who has shown no mercy"],
    context: "The hinge verse reveals the parable's meaning. God expected justice (mishpat) but got bloodshed (mispah); righteousness (sedaqah) but outcry (se'aqah). The Hebrew wordplay stings."
  },
  8: {
    from: ["Leviticus 25:23-28 - Land Jubilee laws", "Micah 2:2 - They covet fields and seize them, houses and take them"],
    to: ["Luke 12:15-21 - Parable of the rich fool", "1 Timothy 6:9-10 - Love of money is a root of all kinds of evils"],
    context: "Greed that accumulates at others' expense violates God's Jubilee design. Those who push others out to dwell alone will ultimately find their great houses desolate."
  },
  11: {
    from: ["Proverbs 20:1 - Wine is a mocker, strong drink a brawler", "Proverbs 23:29-35 - Who has woe? Those who tarry long over wine"],
    to: ["Ephesians 5:18 - Do not get drunk with wine but be filled with the Spirit", "1 Peter 4:3-5 - The time that is past suffices for living in sensuality and drunkenness"],
    context: "Making alcohol life's central pursuit shows it has replaced God. Rising early and staying late for strong drink demonstrates complete mispriority and coming judgment."
  },
  13: {
    from: ["Hosea 4:6 - My people are destroyed for lack of knowledge", "Jeremiah 8:9 - They have rejected the word of the LORD, so what wisdom is in them?"],
    to: ["2 Thessalonians 1:8 - Inflicting vengeance on those who do not know God", "John 17:3 - This is eternal life, that they know you"],
    context: "Knowledge means intimate awareness and acknowledgment of God, not mere information. Exile results from willful refusal to regard God's works and deeds."
  },
  16: {
    from: ["Ezekiel 28:22 - I will be glorified in your midst when I execute judgments", "Exodus 14:4 - I will get glory over Pharaoh and his army"],
    to: ["Romans 3:25-26 - God put forward Christ to show His righteousness", "Revelation 15:3-4 - Just and true are your ways, O King of the nations"],
    context: "God is exalted precisely through executing justice. His righteous judgments demonstrate His holiness. The same acts that humble humanity exalt God's glory."
  },
  20: {
    from: ["Proverbs 17:15 - He who justifies the wicked and condemns the righteous, both are an abomination", "Malachi 2:17 - You have wearied the LORD with your words, saying everyone who does evil is good"],
    to: ["Romans 1:32 - Though they know God's decree, they not only do them but give approval", "2 Timothy 4:3-4 - People will accumulate teachers to suit their own passions"],
    context: "Complete moral inversion shows profound spiritual blindness. When society systematically reverses God's values—calling evil good and good evil—judgment is imminent and certain."
  },
  24: {
    from: ["Isaiah 1:31 - The strong shall become tinder", "Job 18:16 - His roots dry up beneath, his branches wither above"],
    to: ["Matthew 3:10 - Every tree that does not bear good fruit is cut down and thrown into fire", "Jude 1:12 - Fruitless trees in late autumn, twice dead, uprooted"],
    context: "Rejecting God's law ensures complete collapse from the foundation up. Like a plant with rotting roots, what looks alive briefly is already dead and destined for fire."
  },
  26: {
    from: ["Deuteronomy 28:49 - The LORD will bring a nation against you from far away", "Jeremiah 5:15 - I am bringing against you a nation from afar"],
    to: ["Matthew 22:7 - The king sent his troops and destroyed those murderers", "Luke 19:43-44 - Your enemies will surround you and tear you down"],
    context: "God's signal and whistle to distant nations shows His absolute sovereignty. The invading army thinks they act independently, but God summons them as His instrument of judgment."
  },
  30: {
    from: ["Amos 5:18-20 - The day of the LORD is darkness, not light", "Joel 2:2 - A day of darkness and gloom"],
    to: ["Matthew 8:12 - Cast into outer darkness where there will be weeping", "Jude 1:13 - For whom the gloom of utter darkness has been reserved"],
    context: "Sin leads to darkness and distress. The chapter ends in total darkness—the final result of rejecting God's light. Even light itself is darkened by judgment's clouds."
  }
};

function Chapter5() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [showStructureModal, setShowStructureModal] = useState(false);

  const getGroupName = (group: number): string => {
    const names = {
      1: "Song of the Vineyard",
      2: "Woe to the Greedy",
      3: "Woe to Drunkards",
      4: "Woe to Mockers and Moral Confusion",
      5: "Woe to Corrupt Judges",
      6: "The Invading Army"
    };
    return names[group as keyof typeof names] || "";
  };

  const getGroupTransition = (group: number): string => {
    const transitions = {
      1: "God's perfect care produces wild grapes - justice becomes bloodshed",
      2: "Land-grabbers who accumulate without end face desolation",
      3: "Those who pursue drunkenness ignore God's works and face exile",
      4: "Mocking God and inverting morality brings certain judgment",
      5: "Corrupt judges who take bribes will be consumed like stubble",
      6: "God summons distant nations as His unstoppable army"
    };
    return transitions[group as keyof typeof transitions] || "";
  };

  const getColorClass = (group: number, isHovered: boolean = false): string => {
    const colors = {
      1: isHovered ? "bg-purple-600 border-purple-700" : "bg-purple-500 border-purple-600",
      2: isHovered ? "bg-orange-600 border-orange-700" : "bg-orange-500 border-orange-600",
      3: isHovered ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600",
      4: isHovered ? "bg-yellow-600 border-yellow-700" : "bg-yellow-500 border-yellow-600",
      5: isHovered ? "bg-pink-600 border-pink-700" : "bg-pink-500 border-pink-600",
      6: isHovered ? "bg-gray-700 border-gray-800" : "bg-gray-600 border-gray-700"
    };
    return colors[group as keyof typeof colors] || "";
  };

  const getReflectionContent = (verseNum: number) => {
    return reflectionContent[verseNum as keyof typeof reflectionContent] || {
      seeing: "This verse contributes to Isaiah's song of the vineyard and woe oracles.",
      life: "Consider how this verse speaks to your walk with God.",
      teach: "This verse reveals truth about God's justice and human rebellion."
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

  const hasConnections = (verseNum: number): boolean => {
    const connection = getConnection(verseNum);
    return !!(connection?.from?.length || connection?.to?.length);
  };

  const getHingeColor = (hingeType?: string): string => {
    const colors: Record<string, string> = {
      'verdict': 'bg-yellow-400'
    };
    return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
  };

  const getHingeExplanation = (hingeType: string): string => {
    const explanations: Record<string, string> = {
      'center': 'Chiastic Center (v7) — The verdict exposed: God expected justice but found bloodshed, righteousness but heard cries',
      'climax-woes': 'Thematic Climax (v24) — The fiery conclusion: rejection of God\'s law brings consuming judgment like stubble in flame'
    };
    return explanations[hingeType] || 'Structural transition point';
  };

  const getUniqueHingeTypes = (): string[] => {
    const types = verses
      .filter(v => v.isHinge && v.hingeType)
      .map(v => v.hingeType as string);
    return Array.from(new Set(types));
  };

  const uniqueGroups = Array.from(new Set(verses.map(v => v.group))).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        <ChapterNavigation currentChapter={5} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 5 Interactive Study</h1>
          <p className="text-lg text-gray-600">The Song of the Vineyard and Six Woes</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Understanding God's Care and Israel's Failure</h2>
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

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={() => setShowStructureModal(true)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <span className="font-semibold">📖 View Chapter Structure</span>
            <span className="text-sm opacity-90">See the vineyard parable and woe pattern</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Key Transformation Points</h3>
          <div className="space-y-2">
            {getUniqueHingeTypes().map((hingeType) => (
              <div key={hingeType} className="flex items-start gap-3 justify-center">
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
                <span className="relative z-10">5:{verse.number}</span>
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
                    <h2 className="text-2xl font-bold text-gray-800">Verse 5:{selectedVerse.number}</h2>
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
                  {hasConnections(selectedVerse.number) && (
                    <button
                      onClick={() => setActiveTab('connections')}
                      className={`flex-1 py-3 px-4 font-semibold transition-colors ${activeTab === 'connections' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      Scripture Connections
                    </button>
                  )}
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-3xl w-full my-8">
              <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">Chapter 5 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">This chapter shows a vineyard parable followed by five woe pronouncements, with verse 7 as the hinge revealing the vineyard's identity:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (1-7): <span className="font-sans font-semibold text-purple-700">Song of the Vineyard</span> — God's perfect care produces wild grapes</span>
                  </div>
                  <div className="ml-4 bg-yellow-100 px-2 py-1 rounded border-l-4 border-yellow-400 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-yellow-800 font-bold">★ TURNING POINT (7): VERDICT — The vineyard is Israel</span>
                  </div>
                  <div className="ml-8 text-yellow-700 font-sans italic pl-5">"He looked for justice, but behold, bloodshed"</div>
                  <div className="mt-3 ml-4 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (8-10): <span className="font-sans font-semibold text-orange-700">Woe #1 - The Greedy</span> — Land-grabbers face desolation</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>C (11-17): <span className="font-sans font-semibold text-red-700">Woe #2 - Drunkards</span> — Those who ignore God's works face exile</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>D (18-21): <span className="font-sans font-semibold text-yellow-700">Woe #3 - Mockers</span> — Inverting good and evil</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>E (22-25): <span className="font-sans font-semibold text-pink-700">Woe #4 - Corrupt Judges</span> — Bribery and injustice consumed like stubble</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>F (26-30): <span className="font-sans font-semibold text-gray-700">Woe #5 - The Invading Army</span> — God summons distant nations as judgment</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How This Unfolds:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>Before the Turning Point (vv. 1-6):</strong> The vineyard parable presents a puzzle—God did everything right for His vineyard, but it produced only wild grapes. The imagery is beautiful but perplexing. Who is this disappointing vineyard?</li>
                    <li><strong>Turning Point (v. 7):</strong> The stunning revelation: "The vineyard of the LORD of hosts is the house of Israel." God expected justice but found bloodshed; He expected righteousness but heard cries of distress. The wordplay emphasizes the tragic irony—what sounds similar (justice/bloodshed) reveals how close Israel came, yet how far they fell.</li>
                    <li><strong>After the Turning Point (vv. 8-30):</strong> The five woes detail exactly how Israel produced "wild grapes." Each woe expands on a specific failure: greed (#1), drunken indifference (#2), mocking God (#3), moral confusion (#4), and corrupt leadership (#5). The final section (vv. 26-30) shows God's response—summoning foreign armies as judgment.</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">The structure moves from mystery to revelation to specification. The vineyard parable asks "What went wrong?" The turning point answers "Israel failed." The woes detail "Here's exactly how they failed." Together, they paint a comprehensive picture of a nation that received everything but returned nothing.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter5;
