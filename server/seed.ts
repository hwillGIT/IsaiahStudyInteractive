import { db } from './db.js';
import { chapters, groups, verses, reflections, scriptureConnections, structureMarkers } from '../shared/schema.js';

// Chapter 1 data extracted from Chapter1.tsx
const chapter1Data = {
  chapter: { chapterNumber: 1, title: 'Isaiah Chapter 1', subtitle: 'The Rebellious Nation and the Invitation to Return' },
  groupsData: [
    { groupNumber: 1, name: 'Rebellious Children', transition: "God summons heaven and earth to witness Israel's rebellion", colorClass: 'bg-blue-500' },
    { groupNumber: 2, name: 'Devastation & Remnant', transition: 'Consequences of sin bring devastation, yet God preserves a remnant', colorClass: 'bg-orange-500' },
    { groupNumber: 3, name: 'Empty Worship Rejected', transition: 'Religious rituals without justice are worthless to God', colorClass: 'bg-teal-500' },
    { groupNumber: 4, name: 'Call to Justice', transition: 'True worship requires turning from evil and pursuing justice', colorClass: 'bg-gray-500' },
    { groupNumber: 5, name: 'Divine Invitation', transition: 'God offers complete forgiveness despite scarlet sins', colorClass: 'bg-red-500' },
    { groupNumber: 6, name: 'Faithful City Corrupted', transition: 'Once-faithful Jerusalem is corrupted by murderers and bribes', colorClass: 'bg-purple-500' },
    { groupNumber: 7, name: 'Purification Promise', transition: 'God promises to purify His people like refining silver', colorClass: 'bg-green-500' },
    { groupNumber: 8, name: 'Final Verdict', transition: 'Justice will restore the penitent; judgment will consume rebels', colorClass: 'bg-red-700' },
  ],
  versesData: [
    { number: 1, text: "The vision of Isaiah the son of Amoz, which he saw concerning Judah and Jerusalem in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah.", group: 1 },
    { number: 2, text: "Hear, O heavens, and give ear, O earth; for the LORD has spoken: 'Children have I reared and brought up, but they have rebelled against me.'", group: 1 },
    { number: 3, text: "The ox knows its owner, and the donkey its master's crib, but Israel does not know, my people do not understand.", group: 1 },
    { number: 4, text: "Ah, sinful nation, a people laden with iniquity, offspring of evildoers, children who deal corruptly! They have forsaken the LORD, they have despised the Holy One of Israel, they are utterly estranged.", group: 1 },
    { number: 5, text: "Why will you still be struck down? Why will you continue to rebel? The whole head is sick, and the whole heart faint.", group: 1 },
    { number: 6, text: "From the sole of the foot even to the head, there is no soundness in it, but bruises and sores and raw wounds; they are not pressed out or bound up or softened with oil.", group: 1 },
    { number: 7, text: "Your country lies desolate; your cities are burned with fire; in your very presence foreigners devour your land; it is desolate, as overthrown by foreigners.", group: 2 },
    { number: 8, text: "And the daughter of Zion is left like a booth in a vineyard, like a lodge in a cucumber field, like a besieged city.", group: 2 },
    { number: 9, text: "If the LORD of hosts had not left us a few survivors, we should have been like Sodom, and become like Gomorrah.", group: 2, isHinge: true, hingeType: 'transition-preservation' },
    { number: 10, text: "Hear the word of the LORD, you rulers of Sodom! Give ear to the teaching of our God, you people of Gomorrah!", group: 3 },
    { number: 11, text: "'What to me is the multitude of your sacrifices?' says the LORD; 'I have had enough of burnt offerings of rams and the fat of well-fed beasts; I do not delight in the blood of bulls, or of lambs, or of goats.'", group: 3 },
    { number: 12, text: "'When you come to appear before me, who has required of you this trampling of my courts?'", group: 3 },
    { number: 13, text: "'Bring no more vain offerings; incense is an abomination to me. New moon and Sabbath and the calling of convocations—I cannot endure iniquity and solemn assembly.'", group: 3 },
    { number: 14, text: "'Your new moons and your appointed feasts my soul hates; they have become a burden to me; I am weary of bearing them.'", group: 3 },
    { number: 15, text: "'When you spread out your hands, I will hide my eyes from you; even though you make many prayers, I will not listen; your hands are full of blood.'", group: 3 },
    { number: 16, text: "'Wash yourselves; make yourselves clean; remove the evil of your deeds from before my eyes; cease to do evil,'", group: 4 },
    { number: 17, text: "'learn to do good; seek justice, correct oppression; bring justice to the fatherless, plead the widow's cause.'", group: 4, isHinge: true, hingeType: 'turn-to-action' },
    { number: 18, text: "'Come now, let us reason together, says the LORD: though your sins are like scarlet, they shall be as white as snow; though they are red like crimson, they shall become like wool.'", group: 5, isHinge: true, hingeType: 'hinge' },
    { number: 19, text: "'If you are willing and obedient, you shall eat the good of the land;'", group: 5 },
    { number: 20, text: "'but if you refuse and rebel, you shall be eaten by the sword; for the mouth of the LORD has spoken.'", group: 5 },
    { number: 21, text: "How the faithful city has become a whore, she who was full of justice! Righteousness lodged in her, but now murderers.", group: 6 },
    { number: 22, text: "Your silver has become dross, your best wine mixed with water.", group: 6 },
    { number: 23, text: "Your princes are rebels and companions of thieves. Everyone loves a bribe and runs after gifts. They do not bring justice to the fatherless, and the widow's cause does not come to them.", group: 6 },
    { number: 24, text: "Therefore the Lord declares, the LORD of hosts, the Mighty One of Israel: 'Ah, I will get relief from my enemies and avenge myself on my foes.'", group: 7 },
    { number: 25, text: "'I will turn my hand against you and will smelt away your dross as with lye and remove all your alloy.'", group: 7, isHinge: true, hingeType: 'climax-purification' },
    { number: 26, text: "'And I will restore your judges as at the first, and your counselors as at the beginning. Afterward you shall be called the city of righteousness, the faithful city.'", group: 7 },
    { number: 27, text: "Zion shall be redeemed by justice, and those in her who repent, by righteousness.", group: 8 },
    { number: 28, text: "But rebels and sinners shall be broken together, and those who forsake the LORD shall be consumed.", group: 8 },
    { number: 29, text: "For they shall be ashamed of the oaks that you desired; and you shall blush for the gardens that you have chosen.", group: 8 },
    { number: 30, text: "For you shall be like an oak whose leaf withers, and like a garden without water.", group: 8 },
    { number: 31, text: "And the strong shall become tinder, and his work a spark, and both of them shall burn together, with none to quench them.", group: 8 },
  ],
  markers: [
    { hingeType: 'hinge', explanation: "Chiastic Center (v18) — God's invitation to settle the matter and receive complete forgiveness", color: 'bg-yellow-400' },
    { hingeType: 'transition-preservation', explanation: 'Narrative Transition (v9) — From devastation to hope: God preserves a remnant', color: 'bg-yellow-400' },
    { hingeType: 'turn-to-action', explanation: 'Dramatic Turn (v17) — From rejecting empty worship to calling for justice and action', color: 'bg-yellow-400' },
    { hingeType: 'climax-purification', explanation: "Thematic Climax (v25) — God's purifying refining fire removes all impurities", color: 'bg-yellow-400' },
  ]
};

// Due to file size limits, I'll need to create this as a comprehensive seed function
async function seedDatabase() {
  console.log('Starting database seed...');
  
  try {
    // Seed Chapter 1
    console.log('Seeding Chapter 1...');
    const [ch1] = await db.insert(chapters).values(chapter1Data.chapter).returning();
    
    // Seed groups for Chapter 1
    const groupInserts = chapter1Data.groupsData.map(g => ({
      chapterId: ch1.id,
      groupNumber: g.groupNumber,
      name: g.name,
      transition: g.transition,
      colorClass: g.colorClass
    }));
    const ch1Groups = await db.insert(groups).values(groupInserts).returning();
    
    // Seed verses for Chapter 1
    const verseInserts = chapter1Data.versesData.map(v => ({
      chapterId: ch1.id,
      verseNumber: v.number,
      text: v.text,
      groupId: ch1Groups[v.group - 1].id,
      isHinge: v.isHinge || false,
      hingeType: v.hingeType || null
    }));
    const ch1Verses = await db.insert(verses).values(verseInserts).returning();
    
    // Seed structure markers for Chapter 1
    const markerInserts = chapter1Data.markers.map(m => ({
      chapterId: ch1.id,
      hingeType: m.hingeType,
      explanation: m.explanation,
      color: m.color
    }));
    await db.insert(structureMarkers).values(markerInserts);
    
    console.log('Chapter 1 seeded successfully!');
    console.log('\nSeed complete! Database populated with Isaiah study content.');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seedDatabase().then(() => {
  console.log('Seed script completed');
  process.exit(0);
}).catch(error => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
