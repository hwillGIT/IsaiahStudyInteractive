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
  { number: 1, text: "The vision concerning Judah and Jerusalem that Isaiah son of Amoz saw during the reigns of Uzziah, Jotham, Ahaz and Hezekiah, kings of Judah.", group: 1 },
  { number: 2, text: "Hear me, you heavens! Listen, earth! For the LORD has spoken: 'I reared children and brought them up, but they have rebelled against me.'", group: 1 },
  { number: 3, text: "The ox knows its master, the donkey its owner's manger, but Israel does not know, my people do not understand.", group: 1 },
  { number: 4, text: "Woe to the sinful nation, a people whose guilt is great, a brood of evildoers, children given to corruption! They have forsaken the LORD; they have spurned the Holy One of Israel and turned their backs on him.", group: 1 },
  { number: 5, text: "Why should you be beaten anymore? Why do you persist in rebellion? Your whole head is injured, your whole heart afflicted.", group: 2 },
  { number: 6, text: "From the sole of your foot to the top of your head there is no soundness—only wounds and welts and open sores, not cleansed or bandaged or soothed with olive oil.", group: 2 },
  { number: 7, text: "Your country is desolate, your cities burned with fire; your fields are being stripped by foreigners right before you, laid waste as when overthrown by strangers.", group: 2 },
  { number: 8, text: "Daughter Zion is left like a shelter in a vineyard, like a hut in a cucumber field, like a city under siege.", group: 2 },
  { number: 9, text: "Unless the LORD Almighty had left us some survivors, we would have become like Sodom, we would have been like Gomorrah.", group: 2, isHinge: true, hingeType: 'transition-preservation' },
  { number: 10, text: "Hear the word of the LORD, you rulers of Sodom; listen to the instruction of our God, you people of Gomorrah!", group: 3 },
  { number: 11, text: "'The multitude of your sacrifices—what are they to me?' says the LORD. 'I have more than enough of burnt offerings, of rams and the fat of fattened animals; I have no pleasure in the blood of bulls and lambs and goats.'", group: 3 },
  { number: 12, text: "When you come to appear before me, who has asked this of you, this trampling of my courts?", group: 3 },
  { number: 13, text: "Stop bringing meaningless offerings! Your incense is detestable to me. New Moons, Sabbaths and convocations—I cannot bear your worthless assemblies.", group: 3 },
  { number: 14, text: "Your New Moon feasts and your appointed festivals I hate with all my being. They have become a burden to me; I am weary of bearing them.", group: 3 },
  { number: 15, text: "When you spread out your hands in prayer, I hide my eyes from you; even when you offer many prayers, I am not listening. Your hands are full of blood!", group: 3 },
  { number: 16, text: "Wash and make yourselves clean. Take your evil deeds out of my sight; stop doing wrong.", group: 4 },
  { number: 17, text: "Learn to do right; seek justice. Defend the oppressed. Take up the cause of the fatherless; plead the case of the widow.", group: 4, isHinge: true, hingeType: 'turn-to-action' },
  { number: 18, text: "Come now, let us settle the matter,' says the LORD. 'Though your sins are like scarlet, they shall be as white as snow; though they are red as crimson, they shall be like wool.'", group: 5, isHinge: true, hingeType: 'hinge' },
  { number: 19, text: "If you are willing and obedient, you will eat the good things of the land;", group: 5 },
  { number: 20, text: "but if you resist and rebel, you will be devoured by the sword.' For the mouth of the LORD has spoken.", group: 5 },
  { number: 21, text: "See how the faithful city has become a prostitute! She once was full of justice; righteousness used to dwell in her—but now murderers!", group: 6 },
  { number: 22, text: "Your silver has become dross, your choice wine is diluted with water.", group: 6 },
  { number: 23, text: "Your rulers are rebels, partners with thieves; they all love bribes and chase after gifts. They do not defend the cause of the fatherless; the widow's case does not come before them.", group: 6 },
  { number: 24, text: "Therefore the Lord, the LORD Almighty, the Mighty One of Israel, declares: 'Ah! I will vent my wrath on my foes and avenge myself on my enemies.'", group: 7 },
  { number: 25, text: "I will turn my hand against you; I will thoroughly purge away your dross and remove all your impurities.", group: 7, isHinge: true, hingeType: 'climax-purification' },
  { number: 26, text: "I will restore your leaders as in days of old, your rulers as at the beginning. Afterward you will be called the City of Righteousness, the Faithful City.", group: 7 },
  { number: 27, text: "Zion will be delivered with justice, her penitent ones with righteousness.", group: 8 },
  { number: 28, text: "But rebels and sinners will both be broken, and those who forsake the LORD will perish.", group: 8 },
  { number: 29, text: "You will be ashamed because of the sacred oaks in which you have delighted; you will be disgraced because of the gardens that you have chosen.", group: 8 },
  { number: 30, text: "You will be like an oak with fading leaves, like a garden without water.", group: 8 },
  { number: 31, text: "The mighty man will become tinder and his work a spark; both will burn together, with no one to quench the fire.", group: 8 }
];

const getColorClass = (group: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-red-600',
    2: 'bg-orange-500', 
    3: 'bg-gray-600',
    4: 'bg-blue-500',
    5: 'bg-green-600',
    6: 'bg-purple-500',
    7: 'bg-teal-500',
    8: 'bg-pink-600'
  };
  return colors[group] || 'bg-gray-400';
};

const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: 'Rebellious Children',
    2: 'Devastation & Remnant',
    3: 'Empty Worship Rejected',
    4: 'Call to Justice',
    5: 'Divine Invitation',
    6: 'Faithful City Corrupted',
    7: 'Purification Promise',
    8: 'Final Verdict'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: "God summons heaven and earth to witness Israel's rebellion",
    2: "Consequences of sin bring devastation, yet God preserves a remnant",
    3: "Religious rituals without justice are worthless to God",
    4: "True worship requires turning from evil and pursuing justice",
    5: "God offers complete forgiveness despite scarlet sins",
    6: "Once-faithful Jerusalem is corrupted by murderers and bribes",
    7: "God promises to purify His people like refining silver",
    8: "Justice will restore the penitent; judgment will consume rebels"
  };
  return transitions[group] || "Transition point in Isaiah's vision";
};

const getHingeColor = (_hingeType?: string): string => {
  return 'bg-yellow-400';
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'hinge': 'Chiastic Center (v18) — God\'s invitation to settle the matter and receive complete forgiveness',
    'transition-preservation': 'Narrative Transition (v9) — From devastation to hope: God preserves a remnant',
    'turn-to-action': 'Dramatic Turn (v17) — From rejecting empty worship to calling for justice and action',
    'climax-purification': 'Thematic Climax (v25) — God\'s purifying refining fire removes all impurities'
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
    seeing: "This opening verse anchors Isaiah's message in real history—four kings over roughly 60 years. It reminds us that God's word comes to specific people in specific times, yet speaks beyond those moments.",
    life: "God speaks into our actual circumstances, not just abstract ideals. When life feels chaotic, remember that God sees your specific situation and has words of direction for you right now.",
    teach: "Biblical prophecy is rooted in history. God's word addresses real people facing real challenges, making it reliable for our lives today."
  },
  2: {
    seeing: "God calls heaven and earth as witnesses in a courtroom scene. The parent-child relationship makes the rebellion personal—these aren't strangers but children who've turned away from a loving Father.",
    life: "When we drift from God, it's not breaking rules but betraying relationship. Have you felt the weight of disappointing someone who loves you? That's how God feels about our rebellion.",
    teach: "Sin is fundamentally relational—it's not just breaking laws but breaking God's heart. He raised us, cared for us, yet we rebel like ungrateful children."
  },
  3: {
    seeing: "The comparison to livestock is devastating. Even animals know who feeds them, but God's people have less sense than farm animals. This isn't ancient Israel's problem alone—it's universal human stubbornness.",
    life: "Do you recognize the One who provides for you daily? It's embarrassing when we act with less awareness than animals, ignoring the God who sustains our every breath.",
    teach: "Humans possess unique moral capacity yet often display less gratitude than animals. Knowledge alone doesn't produce obedience—hearts must be changed."
  },
  4: {
    seeing: "Four descriptions pile up: sinful nation, guilty people, evil brood, corrupt children. The repetition hammers home how thoroughly sin has infected every level of society, from nation to family.",
    life: "Sin isn't isolated—it spreads through communities and families. When you notice corruption around you, it's a call to check your own heart and break the cycle.",
    teach: "Sin has corporate dimensions. It's not just personal but affects entire societies. The 'Holy One of Israel' is contrasted with those who've turned their backs on Him."
  },
  5: {
    seeing: "God questions the futility of continued punishment. The whole head and heart are afflicted—this isn't about isolated failures but systemic sickness affecting leadership (head) and devotion (heart).",
    life: "When life keeps going wrong, God isn't being cruel—He's asking why we keep choosing the path that leads to pain. Will we finally stop and turn around?",
    teach: "Discipline aims at restoration, not destruction. When punishment doesn't produce change, God questions whether more is needed or whether hearts are simply hardened."
  },
  6: {
    seeing: "The imagery moves from head to toe, showing total sickness. The wounds aren't treated—no cleaning, no bandaging, no soothing oil. This describes a nation that hasn't sought healing.",
    life: "Unaddressed wounds fester. Whether emotional, spiritual, or relational, we need to bring our brokenness to the Healer rather than pretending we're fine.",
    teach: "Sin's effects are comprehensive, touching every part of life. Without God's healing touch, our wounds remain open and infected, getting worse over time."
  },
  7: {
    seeing: "The covenant curses of Deuteronomy have come true—desolation, burning cities, foreigners plundering. What God warned about has happened. This verse describes the Assyrian invasions.",
    life: "Consequences are real. When we ignore God's warnings, we shouldn't be surprised when the predicted outcomes arrive. Prevention is always better than cleanup.",
    teach: "God's warnings aren't empty threats. He tells us the consequences of rebellion so we can avoid them, but when we persist, His word proves true."
  },
  8: {
    seeing: "Jerusalem is compared to a temporary shelter in a field—vulnerable, isolated, under siege. What should be a strong city is fragile as a farmer's hut.",
    life: "When we abandon God's protection, our strongest defenses become as weak as paper. True security comes from Him, not our fortifications.",
    teach: "Apart from God's presence, even the holy city becomes vulnerable. Our strength isn't in buildings or walls but in covenant relationship with the Almighty."
  },
  9: {
    seeing: "This is the first hopeful note—God's mercy preserved a remnant. Without His intervention, Judah would have faced Sodom's total destruction. Mercy interrupts judgment.",
    life: "You're still here because of God's mercy. Whatever you've survived, whatever second chances you've received—that's God preserving you when you deserved destruction.",
    teach: "Grace alone explains survival. The remnant exists not because they were better but because God, in His mercy, chose to preserve a people for Himself."
  },
  10: {
    seeing: "Calling them 'rulers of Sodom' and 'people of Gomorrah' is shocking—these cities represent complete moral collapse. Yet God still says 'hear' and 'listen,' inviting response.",
    life: "No matter how far you've fallen, God still speaks to you. Being compared to Sodom doesn't mean you're beyond hope—God's word still comes to call you back.",
    teach: "God's word pursues even the worst sinners. The invitation to hear and listen shows that judgment isn't God's final word—repentance is still possible."
  },
  11: {
    seeing: "God doesn't want more sacrifices—He's overwhelmed by them. The problem isn't quantity but quality. Religious activity without heart change is meaningless ritual.",
    life: "How much of your religious activity is just going through the motions? God would rather have your heart than your perfect attendance at services.",
    teach: "Ritual divorced from righteousness is repulsive to God. He doesn't need our offerings; He wants our obedience and love. Religion without relationship is empty."
  },
  12: {
    seeing: "God didn't ask for empty court-trampling. The question exposes the disconnect between what people think God wants (impressive temple visits) and what He actually requires (justice and mercy).",
    life: "Are you giving God what He actually wants, or what's easier for you to offer? Showing up isn't enough if your heart and hands remain unchanged.",
    teach: "God examines our motives. Presence without transformation, worship without obedience—these insult rather than honor the One we claim to serve."
  },
  13: {
    seeing: "Strong words: 'meaningless,' 'detestable,' 'worthless.' The religious calendar continues perfectly—New Moons, Sabbaths, assemblies—but God can't bear them because they're paired with injustice.",
    life: "Your Sunday worship means nothing if you exploit people Monday through Saturday. God sees the whole week, not just your religious performances.",
    teach: "Sacred times and gatherings become profane when worshipers' lives contradict their worship. God desires consistency between our rituals and our character."
  },
  14: {
    seeing: "God doesn't just dislike empty religion—He hates it with His whole being. The festivals designed to bring joy have become a burden to Him. What should delight has become drudgery.",
    life: "When religious obligation replaces relationship, even our best efforts weary God. He wants a loving family, not dutiful employees going through the motions.",
    teach: "God's hatred of hypocritical worship shows how seriously He takes covenant relationship. What's meant to express love becomes mockery when hearts are far from Him."
  },
  15: {
    seeing: "Spread hands indicate passionate prayer, many prayers suggest persistence, but God hides His eyes and doesn't listen. Why? Blood-stained hands—violence and oppression disqualify worship.",
    life: "You can't pray effectively while harming others. Want God to hear your prayers? Start by examining how you treat the people around you, especially the vulnerable.",
    teach: "Unconfessed sin blocks prayer. Hands full of blood symbolize violence, oppression, and injustice. These must be cleansed before worship can be acceptable."
  },
  16: {
    seeing: "The command shifts from what to stop (vv. 10-15) to what to start. First step: wash and cleanse. The progression is clear: stop evil, remove it from sight, cease wrongdoing.",
    life: "Change requires both stopping bad and starting good. What specific evil do you need to wash away? What wrong do you need to cease today?",
    teach: "Repentance is active, not passive. It involves deliberate turning—removing evil, cleansing oneself, stopping destructive patterns. God commands action, not just emotion."
  },
  17: {
    seeing: "After the negative commands comes the positive call: learn right, seek justice, defend the oppressed, help orphans and widows. True religion protects the vulnerable, not just performs rituals.",
    life: "Who are the fatherless and widows in your world—the powerless, the marginalized, the forgotten? Justice isn't abstract; it's defending specific people in need.",
    teach: "God's idea of righteousness is intensely practical and social. Learning to do right means championing the cause of those who can't defend themselves."
  },
  18: {
    seeing: "The central invitation! 'Come, let us settle the matter'—God initiates dialogue. The scarlet-to-snow metaphor is stunning: permanently stained sins made permanently white. This is the gospel in the Old Testament.",
    life: "No sin is too deep for God to cleanse. What feels permanently stained in your life? God promises transformation so complete it's like turning scarlet into snow—impossible, except with Him.",
    teach: "Divine forgiveness is total. Scarlet and crimson were ancient dyes that couldn't be removed, yet God promises to make them white as snow and wool. What's impossible for us is routine for God."
  },
  19: {
    seeing: "The first outcome of accepting God's invitation: willing obedience leads to eating the good of the land. Blessing flows from relationship, from hearts aligned with God's will.",
    life: "When you're willing and obedient, God provides abundantly. This isn't earning His love but receiving the overflow that comes from living in His will.",
    teach: "Obedience opens the door to blessing. God doesn't withhold good from His children—He offers it freely to those who align with His ways."
  },
  20: {
    seeing: "The alternative: resistance and rebellion bring the sword. 'The mouth of the LORD has spoken' adds weight—this isn't a threat but a promise. Choices have consequences.",
    life: "You choose your path and its consequences. God lays out both options clearly—blessing or curse, life or death. What will you choose today?",
    teach: "God's warnings prove His love. He doesn't want anyone devoured by the sword, so He clearly outlines the path to life and the path to destruction."
  },
  21: {
    seeing: "The lament begins: from faithful city to prostitute, from justice to murderers. The past-present contrast is heartbreaking. What once was beautiful has become ugly through corruption.",
    life: "Have you watched something good become corrupted? A relationship, a community, a personal commitment? It's painful, but recognizing the loss is the first step toward restoration.",
    teach: "Spiritual adultery—replacing God with other loves—transforms beauty into horror. What should be the faithful bride becomes a prostitute when loyalties shift from the true Husband."
  },
  22: {
    seeing: "Two metaphors for corruption: silver becoming dross (worthless residue) and wine diluted with water. What should have value and strength has been contaminated and weakened.",
    life: "When you compromise, you dilute your effectiveness. Like watered-down wine, a compromised faith loses its power and taste. What's diluting your commitment to God?",
    teach: "Corruption doesn't happen instantly but gradually. Pure silver becomes dross through impurities; choice wine loses potency through dilution. Small compromises lead to total corruption."
  },
  23: {
    seeing: "The specific charges: rulers partner with thieves, love bribes, chase gifts, abandon orphans and widows. Those meant to administer justice are the primary source of injustice.",
    life: "When leaders fail their responsibility to the vulnerable, whole societies collapse. Whether in government, church, or community, leadership demands integrity and care for the weak.",
    teach: "God holds leaders especially accountable. Rulers who exploit rather than protect, who accept bribes rather than defend the powerless, betray their sacred calling."
  },
  24: {
    seeing: "God announces His intention to deal with His enemies—but notice they're not foreign nations but His own people who've become His foes through rebellion. His wrath will be vented.",
    life: "When we oppose God's ways, we make ourselves His enemies. This is sobering: religious people can become God's foes if their lives contradict His justice.",
    teach: "Divine judgment begins with God's own household. Those who claim His name but live in opposition to His character face His wrath, not His favor."
  },
  25: {
    seeing: "The turning point: 'I will turn my hand against you'—but notice the purpose. Not destruction but purification. Purging dross and removing impurities is the language of refining precious metal.",
    life: "God's discipline is purposeful, not punitive. When He turns His hand against you, it's to remove what corrupts, not to destroy what's valuable. You are the silver He's refining.",
    teach: "God disciplines those He loves. The purification process is painful but necessary, designed to remove impurities and restore what was meant to be precious and pure."
  },
  26: {
    seeing: "The promise of restoration: leaders like the old days, rulers like the beginning. The result: new names that reflect reality—City of Righteousness, Faithful City. Identity follows transformation.",
    life: "God doesn't just forgive; He restores. What's broken can be rebuilt even better than before. Your future identity isn't defined by your past failures but by God's power to restore.",
    teach: "Restoration involves both structural change (new leaders) and identity change (new names). God doesn't patch up the old but creates something genuinely new from purified material."
  },
  27: {
    seeing: "Zion's deliverance comes through justice and righteousness. Penitent ones—those who repent—are the ones redeemed. This isn't universal salvation but salvation for those who turn back to God.",
    life: "Want deliverance? Practice justice and righteousness, and approach God with genuine repentance. Redemption is available, but it requires turning from sin toward God.",
    teach: "Salvation and justice are inseparable. God doesn't redeem people to leave them in their sin but to transform them into agents of His righteousness in the world."
  },
  28: {
    seeing: "The contrast couldn't be clearer: the penitent are redeemed (v. 27), but rebels and sinners are broken and perish. Those who forsake the LORD face destruction, not restoration.",
    life: "There's no third option. You're either turning toward God in repentance or away from Him in rebellion. The neutral ground many seek doesn't exist—only two paths, two destinies.",
    teach: "Final judgment is real. While God offers amazing grace to the repentant, those who persist in forsaking Him will perish. Love and justice coexist in God's character."
  },
  29: {
    seeing: "Sacred oaks and chosen gardens were places of idolatrous worship. What once delighted will bring shame. The things people trusted instead of God become sources of disgrace.",
    life: "What are you trusting besides God? Your career, relationships, possessions? They might bring temporary pleasure, but they'll ultimately disappoint if they replace God in your heart.",
    teach: "Idols always disappoint. What we delight in apart from God becomes our shame. Created things make terrible gods—only the Creator deserves our worship and trust."
  },
  30: {
    seeing: "The imagery reverses expectations: instead of strong oaks and well-watered gardens (symbols of life), you get fading leaves and no water. Trusting false gods leads to withering, not flourishing.",
    life: "When you try to live without God, you might look strong on the outside, but you're dying inside—like a tree with fading leaves or a garden without water. You need His life.",
    teach: "Apart from God, we wither. What appears strong becomes weak, what seems alive dies. Only connection to the source of living water produces lasting life and fruitfulness."
  },
  31: {
    seeing: "The final warning: the mighty man and his work both become fuel for unquenchable fire. Strength apart from God leads to self-destruction. What's trusted for security becomes the instrument of judgment.",
    life: "Whatever you build apart from God will eventually burn, taking you with it. True security isn't in your strength or achievements but in surrendering to the One who can't be consumed.",
    teach: "Human strength without divine connection leads to destruction. The fire that can't be quenched represents final judgment—both the person and their godless works are consumed together."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Amos 1:1-2 (prophetic witness format)", "Hosea 1:1 (dating prophecy by kings)"],
    to: ["Luke 3:2 (God's word comes in history)", "Hebrews 1:1-2 (God spoke through prophets)"],
    context: "Isaiah establishes that God's word enters real history, addressing specific times and places. This pattern continues in Jesus, who came 'in the fullness of time' to a specific place and people."
  },
  2: {
    from: ["Deuteronomy 32:1 (heaven and earth as witnesses)", "Hosea 11:1-4 (God as parent to Israel)"],
    to: ["Romans 8:14-17 (adopted as God's children)", "Luke 15:11-32 (prodigal son parable)"],
    context: "The courtroom scene with cosmic witnesses echoes covenant lawsuit patterns. God's fatherly relationship makes rebellion personal, not just legal—a theme Jesus develops in the prodigal son story."
  },
  3: {
    from: ["Jeremiah 8:7 (even birds know their times)", "Deuteronomy 32:6 (Is this how you repay the LORD?)"],
    to: ["John 1:10-11 (He came to His own, but they didn't receive Him)", "Romans 1:21 (knowing God but not glorifying Him)"],
    context: "The scandal of ungrateful humanity knowing less than animals points forward to humanity rejecting Jesus, their Creator. Natural revelation makes rejection inexcusable."
  },
  4: {
    from: ["Genesis 6:5 (every inclination evil continually)", "Exodus 32:9 (stiff-necked people)"],
    to: ["Matthew 23:37 (how often I longed to gather you)", "Romans 3:10-18 (none righteous, not even one)"],
    context: "The comprehensive description of sin's infection shows humanity's total depravity. This sets up the need for the Savior who would deal with sin's root, not just symptoms."
  },
  5: {
    from: ["Jeremiah 2:30 (discipline had no effect)", "Hosea 5:13 (wounds that cannot heal)"],
    to: ["John 5:6 (Do you want to get well?)", "Hebrews 12:5-11 (God disciplines those He loves)"],
    context: "God questions whether continued punishment will produce repentance, showing discipline's purpose is restoration. Jesus asks the same question: do you want to be healed?"
  },
  6: {
    from: ["Deuteronomy 28:35 (sores from sole to crown)", "Jeremiah 8:22 (Is there no balm in Gilead?)"],
    to: ["Luke 10:30-37 (Good Samaritan binding wounds)", "1 Peter 2:24 (by His wounds we are healed)"],
    context: "The untreated wounds picture humanity's desperate condition. Jesus comes as the Good Samaritan binding wounds, and His own wounds become our healing."
  },
  7: {
    from: ["Deuteronomy 28:49-52 (siege warfare promised)", "Leviticus 26:31-33 (covenant curses realized)"],
    to: ["Luke 21:20-24 (Jerusalem surrounded by armies)", "Romans 11:22 (God's kindness and sternness)"],
    context: "Covenant curses prove God's faithfulness to His word. The pattern of warned judgment arriving repeats in Jesus' generation when Jerusalem falls in AD 70."
  },
  8: {
    from: ["Lamentations 1:1 (how deserted the city sits)", "Jeremiah 4:29 (every town deserted)"],
    to: ["Matthew 23:37-38 (your house is left desolate)", "Luke 13:34-35 (how often I longed to gather you)"],
    context: "The vulnerability of Jerusalem without God's protection foreshadows later desolation. Jesus weeps over the city that rejects protection under His wings."
  },
  9: {
    from: ["Genesis 18:32 (would spare for ten righteous)", "Deuteronomy 29:23 (like Sodom and Gomorrah)"],
    to: ["Romans 9:29 (if the Lord had not left us seed)", "Luke 12:32 (fear not, little flock)"],
    context: "The remnant exists only because of God's mercy—a theme Paul applies to Jewish and Gentile believers in Christ. God always preserves a faithful few."
  },
  10: {
    from: ["Genesis 19:24-25 (overthrow of Sodom)", "Ezekiel 16:48-49 (Sodom's arrogance and lack of care for poor)"],
    to: ["Matthew 10:14-15 (more tolerable for Sodom)", "2 Peter 2:6 (example of what is coming)"],
    context: "Comparing Jerusalem to Sodom shows how far God's people have fallen. Jesus uses Sodom the same way—as a warning to those who know better but don't respond."
  },
  11: {
    from: ["1 Samuel 15:22 (obedience better than sacrifice)", "Psalm 50:8-13 (I have no need of bulls from your stalls)"],
    to: ["Matthew 9:13 (I desire mercy, not sacrifice)", "Hebrews 10:5-7 (sacrifice and offering You did not desire)"],
    context: "God's rejection of empty ritual points to Christ, who replaces the entire sacrificial system. Jesus emphasizes mercy over sacrifice, fulfilling what Isaiah begins."
  },
  12: {
    from: ["Amos 5:21-24 (I hate your feasts)", "Micah 6:6-8 (what does the LORD require?)"],
    to: ["John 4:23-24 (worship in spirit and truth)", "Matthew 15:8-9 (lips honor me but hearts are far)"],
    context: "God questions the motive behind worship. Jesus confronts the same issue—worship that honors with lips while hearts remain distant is worthless."
  },
  13: {
    from: ["Amos 5:21 (I despise your religious festivals)", "Malachi 1:10 (shut the temple doors!)"],
    to: ["Mark 7:6-8 (teaching human traditions)", "Colossians 2:16-17 (these are shadows)"],
    context: "Detestable worship that maintains form while abandoning substance becomes the pattern Jesus confronts in Pharisees. Religious activity without heart change offends God."
  },
  14: {
    from: ["Proverbs 15:8 (sacrifice of wicked detestable)", "Jeremiah 6:20 (your offerings are not acceptable)"],
    to: ["Matthew 23:23 (neglected justice, mercy, faithfulness)", "Romans 12:1-2 (living sacrifice, true worship)"],
    context: "God's hatred of hypocritical festivals shows His demand for integrated faith. Paul defines true worship as transformed lives, not religious performances."
  },
  15: {
    from: ["Psalm 66:18 (if I regard iniquity, He won't hear)", "Proverbs 28:9 (prayer detestable if turning from law)"],
    to: ["Matthew 5:23-24 (reconcile before offering gift)", "James 4:3 (asking with wrong motives)"],
    context: "Blood-stained hands block prayer—unconfessed sin and unrepented injustice create barriers. Jesus and James both teach that relationship condition affects prayer effectiveness."
  },
  16: {
    from: ["Psalm 51:2 (wash me thoroughly from iniquity)", "Ezekiel 36:25 (I will sprinkle clean water on you)"],
    to: ["Ephesians 5:26 (washing with water through the word)", "Titus 3:5 (washing of rebirth and renewal)"],
    context: "The command to wash oneself points forward to God's promise to cleanse His people. In the New Covenant, the Spirit washes through the word and rebirth."
  },
  17: {
    from: ["Deuteronomy 10:18 (defends cause of fatherless and widow)", "Micah 6:8 (do justice, love mercy)"],
    to: ["Matthew 25:31-46 (whatever you did for the least)", "James 1:27 (pure religion: care for orphans and widows)"],
    context: "Justice for the vulnerable is God's consistent demand. Jesus makes care for 'the least of these' the measure of authentic faith, echoing Isaiah's call."
  },
  18: {
    from: ["Psalm 51:7 (wash me, I will be whiter than snow)", "Ezekiel 36:25-27 (I will cleanse you, give you new heart)"],
    to: ["1 John 1:7-9 (blood of Jesus purifies from all sin)", "Revelation 7:14 (washed robes white in the blood)"],
    context: "The scarlet-to-snow promise finds fulfillment in Christ's blood. What seemed impossible—permanent stains removed—happens through the Lamb's sacrifice."
  },
  19: {
    from: ["Deuteronomy 28:1-14 (blessings for obedience)", "Leviticus 26:3-13 (if you walk in My statutes)"],
    to: ["John 15:10 (if you keep my commands, remain in my love)", "James 1:25 (blessed in what they do)"],
    context: "Willing obedience unlocks blessing—a principle consistent across Scripture. Jesus connects obedience to abiding in His love, showing obedience flows from relationship."
  },
  20: {
    from: ["Deuteronomy 28:15-68 (curses for disobedience)", "Leviticus 26:14-39 (if you reject my decrees)"],
    to: ["Galatians 6:7-8 (reaping what you sow)", "Romans 6:23 (wages of sin is death)"],
    context: "The mouth of the LORD has spoken—His word is reliable for blessing and judgment. The New Testament affirms the same principle: choices have consequences."
  },
  21: {
    from: ["Jeremiah 3:1-3 (you have the brazen look of a prostitute)", "Ezekiel 16:15-22 (you trusted your beauty, became a prostitute)"],
    to: ["Revelation 17:1-5 (great prostitute who sits on many waters)", "2 Corinthians 11:2-3 (presenting you as pure virgin to Christ)"],
    context: "Spiritual adultery transforms God's bride into a prostitute. This imagery peaks in Revelation's harlot Babylon, contrasted with Christ's pure bride, the Church."
  },
  22: {
    from: ["Ezekiel 22:18-22 (they have become dross to me)", "Jeremiah 6:28-30 (the refining has proven useless)"],
    to: ["Matthew 5:13 (salt loses saltiness)", "1 Corinthians 3:12-15 (work tested by fire)"],
    context: "Corruption makes what should be valuable worthless. Jesus warns about losing distinctiveness, and Paul about building with materials that won't survive judgment's fire."
  },
  23: {
    from: ["Jeremiah 5:26-28 (wicked men trap people for profit)", "Micah 3:1-3 (rulers who hate good and love evil)"],
    to: ["Matthew 23:13-36 (woes to scribes and Pharisees)", "James 5:1-6 (judgment on rich who defrauded workers)"],
    context: "Leaders exploiting the vulnerable face God's wrath. Jesus pronounces woes on religious leaders who fail to protect sheep, and James warns wealthy oppressors of coming judgment."
  },
  24: {
    from: ["Ezekiel 5:13 (I will spend my wrath)", "Nahum 1:2 (The LORD takes vengeance on His foes)"],
    to: ["Romans 12:19 (vengeance is Mine, I will repay)", "2 Thessalonians 1:6-8 (God will repay with affliction)"],
    context: "God reserves the right to vengeance. His enemies—even among His professing people—will face His wrath. Paul quotes this to encourage persecuted believers."
  },
  25: {
    from: ["Malachi 3:2-3 (He will sit as refiner of silver)", "Zechariah 13:9 (I will refine them like silver)"],
    to: ["1 Peter 1:6-7 (faith refined by fire)", "Hebrews 12:10-11 (disciplines us for our good)"],
    context: "God's purification process is like refining precious metal—painful but purposeful. Peter and Hebrews apply this to Christian suffering that produces holiness."
  },
  26: {
    from: ["Zechariah 8:3 (Jerusalem will be called City of Truth)", "Jeremiah 31:23 (Righteous Dwelling, Sacred Mountain)"],
    to: ["Revelation 21:2 (new Jerusalem coming down)", "Philippians 3:20 (our citizenship is in heaven)"],
    context: "Restored Jerusalem with new names points to the ultimate city of God. The New Jerusalem fulfills what Isaiah glimpses—a city of perfect righteousness."
  },
  27: {
    from: ["Psalm 130:7-8 (He will redeem Israel from all iniquities)", "Micah 7:18-19 (delights to show mercy)"],
    to: ["Luke 1:68 (He has redeemed His people)", "Titus 2:14 (redeem us from all lawlessness)"],
    context: "Redemption through justice and righteousness becomes reality in Christ, who redeems us from lawlessness. Zion's deliverance foreshadows the Church's redemption."
  },
  28: {
    from: ["Psalm 1:6 (way of the wicked will perish)", "Proverbs 11:21 (the wicked will not go unpunished)"],
    to: ["Matthew 7:21-23 (not everyone who says 'Lord, Lord')", "2 Thessalonians 1:8-9 (punishment of eternal destruction)"],
    context: "Those who forsake the LORD face destruction, regardless of religious profession. Jesus warns that not all who claim Him will enter the kingdom—only those who do the Father's will."
  },
  29: {
    from: ["Deuteronomy 12:2-3 (destroy their sacred groves)", "2 Kings 17:10 (set up sacred stones and Asherah poles)"],
    to: ["Romans 1:25 (exchanged truth for a lie)", "Colossians 2:18-19 (disqualified by worship of angels)"],
    context: "Idolatrous worship in sacred places brings shame. Paul warns that exchanging God's truth for created things leads to dishonor and loss."
  },
  30: {
    from: ["Jeremiah 17:5-6 (cursed is one who trusts in man, will be like bush in wastelands)", "Psalm 1:3-4 (contrast: tree by streams vs. chaff)"],
    to: ["John 15:4-6 (apart from Me you can do nothing, withered branches)", "Colossians 2:7 (rooted and built up in Him)"],
    context: "Trees without water wither—a picture of life apart from God. Jesus uses vine-branch imagery to show that disconnection from Him means death."
  },
  31: {
    from: ["Nahum 1:10 (consumed like dry stubble)", "Malachi 4:1 (day coming, burning like furnace)"],
    to: ["Matthew 3:12 (burn chaff with unquenchable fire)", "2 Thessalonians 1:9 (punished with everlasting destruction)"],
    context: "Unquenchable fire represents final judgment. John the Baptist and Paul both warn of consuming fire for those who reject God—building on Isaiah's foundation."
  }
};

function Chapter1() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');

  const getCurrentReflection = (): string => {
    if (!selectedVerse) return '';
    const content = reflectionContent[selectedVerse.number];
    return content ? content[activeReflectionMode] : '';
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
        <ChapterNavigation currentChapter={1} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 1</h1>
          <p className="text-gray-600 text-lg">The Rebellious Nation and the Invitation to Return</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thematic Groups</h2>
              <p className="text-sm text-gray-600">Click any verse to explore deeper reflections and connections</p>
            </div>
            <StructureButton 
              onClick={() => setShowStructureModal(true)}
              subtitle="See how the lawsuit transforms into invitation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {Array.from(new Set(verses.map(v => v.group))).map(group => (
              <div key={group} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-4 h-4 ${getColorClass(group)} rounded mt-0.5 flex-shrink-0`}></div>
                <div>
                  <div className="font-semibold text-gray-800">{getGroupName(group)}</div>
                  <div className="text-sm text-gray-600">{getGroupTransition(group)}</div>
                </div>
              </div>
            ))}
          </div>

          {getUniqueHingeTypes().length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-yellow-600">★</span> Structural Transition Points
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {verses.map((verse) => (
              <button
                key={verse.number}
                onClick={() => setSelectedVerse(verse)}
                className={`relative p-3 rounded-lg ${getColorClass(verse.group)} text-white hover:opacity-90 transition-all transform hover:scale-105 group`}
              >
                <div className="font-bold text-lg">{verse.number}</div>
                {verse.isHinge && (
                  <div className="absolute -top-1 -right-1">
                    <div className={`w-3 h-3 ${getHingeColor(verse.hingeType)} rounded-full border-2 border-white`}></div>
                  </div>
                )}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-normal w-64 z-10">
                  {verse.text}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedVerse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 ${getColorClass(selectedVerse.group)} text-white rounded-full text-sm font-semibold`}>
                        Verse {selectedVerse.number}
                      </span>
                      {selectedVerse.isHinge && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold flex items-center gap-1">
                          <span>★</span> Transformation Point
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 italic">"{selectedVerse.text}"</p>
                  </div>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex gap-2 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('reflections')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === 'reflections'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Reflections
                  </button>
                  {hasConnections(selectedVerse.number) && (
                    <button
                      onClick={() => setActiveTab('connections')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === 'connections'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
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
                            <span className="text-blue-600">←</span> Building Upon
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {getConnection(selectedVerse.number)?.from?.map((ref, idx) => (
                              <li key={idx}>{ref}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {getConnection(selectedVerse.number)?.to && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="text-green-600">→</span> Pointing Forward
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {getConnection(selectedVerse.number)?.to?.map((ref, idx) => (
                              <li key={idx}>{ref}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {getConnection(selectedVerse.number)?.context && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">How It Fits God's Story</h4>
                          <p className="text-gray-700 leading-relaxed">
                            {getConnection(selectedVerse.number)?.context}
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

        {showStructureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-3xl w-full my-8">
              <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">Chapter 1 Structure</h3>
                  <button
                    onClick={() => setShowStructureModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">This chapter displays a symmetrical pattern centered on God's invitation to reason together, framed by rebellion and restoration:</p>
                <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A (2-9): <span className="font-sans font-semibold text-red-700">Rebellion & Devastation</span> — Ungrateful children, wounded nation, remnant spared</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-gray-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B (10-15): <span className="font-sans font-semibold text-gray-700">Empty Worship</span> — Sacrifices and prayers God refuses to hear</span>
                  </div>
                  <div className="ml-8 flex items-start gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>C (16-17): <span className="font-sans font-semibold text-blue-700">Call to Justice</span> — Wash, do right, defend the oppressed</span>
                  </div>
                  <div className="ml-12 bg-green-100 px-2 py-1 rounded border-l-4 border-green-600 flex items-start gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span className="font-sans text-green-800 font-bold">★ CENTER (18-20): Divine Invitation</span>
                  </div>
                  <div className="ml-16 text-green-700 font-sans italic pl-5">"Though your sins are like scarlet, they shall be as white as snow"</div>
                  <div className="mt-3 ml-8 border-t-2 border-gray-300 pt-2 flex items-start gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>C' (21-23): <span className="font-sans font-semibold text-purple-700">Corruption Exposed</span> — Faithful city becomes prostitute, leaders love bribes</span>
                  </div>
                  <div className="ml-4 flex items-start gap-2">
                    <div className="w-3 h-3 bg-teal-500 rounded mt-0.5 flex-shrink-0"></div>
                    <span>B' (24-26): <span className="font-sans font-semibold text-teal-700">Purification Promise</span> — God will refine away dross, restore righteous judges</span>
                  </div>
                  <div className="ml-0 flex items-start gap-2">
                    <div className="w-3 h-3 bg-pink-600 rounded mt-0.5 flex-shrink-0"></div>
                    <span>A' (27-31): <span className="font-sans font-semibold text-pink-700">Redemption & Judgment</span> — Penitent delivered, rebels consumed by fire</span>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                  <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <li><strong>A ↔ A':</strong> The chapter opens with Israel's rebellion and devastation (vv. 2-9) and closes with the final verdict separating the redeemed from rebels (vv. 27-31). Both sections address the consequences of choices—God preserves a remnant at the start, and at the end divides between penitent and persistent rebels. What begins with mercy for survivors ends with justice for those who refuse to turn.</li>
                    <li><strong>B ↔ B':</strong> God's rejection of empty worship (vv. 10-15) finds its answer in His promise to purify and restore (vv. 24-26). The same God who won't accept blood-stained sacrifices promises to remove the dross and restore righteous judges. Worship is meaningless until purification happens—then true worship can resume.</li>
                    <li><strong>C ↔ C':</strong> The call to wash and pursue justice (vv. 16-17) stands in stark contrast to the corruption exposed (vv. 21-23). God commands them to defend orphans and widows, but the reality is leaders love bribes and ignore the vulnerable. The gap between what God requires and what His people practice is the crisis the chapter addresses.</li>
                    <li><strong>Center (vv. 18-20):</strong> At the heart stands God's stunning invitation: "Come, let us reason together." Despite scarlet sins, God offers snow-white cleansing. This isn't automatic—there's a choice: willing obedience brings blessing, rebellion brings the sword. The entire chapter pivots on this gracious offer of forgiveness that requires a response.</li>
                  </ul>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 italic">The symmetrical pattern reveals that God's invitation to forgiveness stands at the center of everything. Rebellion and empty religion frame one side; on the other, God promises purification and a divided outcome. The choice is ours: will we accept the invitation to be cleansed, or persist in rebellion until judgment arrives?</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chapter1;
