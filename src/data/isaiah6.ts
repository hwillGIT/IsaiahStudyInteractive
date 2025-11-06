export interface Verse {
  number: number
  text: string
  keywords: string[]
}

export const isaiah6Verses: Verse[] = [
  {
    number: 1,
    text: "In the year that King Uzziah died, I saw the Lord, high and exalted, seated on a throne; and the train of his robe filled the temple.",
    keywords: ["vision", "throne", "temple", "glory"]
  },
  {
    number: 2,
    text: "Above him were seraphim, each with six wings: With two wings they covered their faces, with two they covered their feet, and with two they were flying.",
    keywords: ["seraphim", "angels", "worship", "holiness"]
  },
  {
    number: 3,
    text: "And they were calling to one another: 'Holy, holy, holy is the LORD Almighty; the whole earth is full of his glory.'",
    keywords: ["holy", "glory", "worship", "heaven"]
  },
  {
    number: 4,
    text: "At the sound of their voices the doorposts and thresholds shook and the temple was filled with smoke.",
    keywords: ["power", "glory", "presence"]
  },
  {
    number: 5,
    text: "'Woe to me!' I cried. 'I am ruined! For I am a man of unclean lips, and I live among a people of unclean lips, and my eyes have seen the King, the LORD Almighty.'",
    keywords: ["sin", "confession", "unworthiness", "conviction"]
  },
  {
    number: 6,
    text: "Then one of the seraphim flew to me with a live coal in his hand, which he had taken with tongs from the altar.",
    keywords: ["cleansing", "altar", "sacrifice"]
  },
  {
    number: 7,
    text: "With it he touched my mouth and said, 'See, this has touched your lips; your guilt is taken away and your sin atoned for.'",
    keywords: ["forgiveness", "atonement", "cleansing", "grace"]
  },
  {
    number: 8,
    text: "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I. Send me!'",
    keywords: ["call", "mission", "obedience", "commission"]
  },
  {
    number: 9,
    text: "He said, 'Go and tell this people: \"Be ever hearing, but never understanding; be ever seeing, but never perceiving.\"'",
    keywords: ["message", "prophecy", "hardness"]
  },
  {
    number: 10,
    text: "Make the heart of this people calloused; make their ears dull and close their eyes. Otherwise they might see with their eyes, hear with their ears, understand with their hearts, and turn and be healed.",
    keywords: ["judgment", "hardness", "healing"]
  },
  {
    number: 11,
    text: "Then I said, 'For how long, Lord?' And he answered: 'Until the cities lie ruined and without inhabitant, until the houses are left deserted and the fields ruined and ravaged,'",
    keywords: ["judgment", "desolation", "duration"]
  },
  {
    number: 12,
    text: "until the LORD has sent everyone far away and the land is utterly forsaken.",
    keywords: ["exile", "judgment", "forsaken"]
  },
  {
    number: 13,
    text: "And though a tenth remains in the land, it will again be laid waste. But as the terebinth and oak leave stumps when they are cut down, so the holy seed will be the stump in the land.",
    keywords: ["remnant", "hope", "restoration", "promise"]
  }
]

export interface Theme {
  name: string
  description: string
  verses: number[]
  color: string
}

export const themes: Theme[] = [
  {
    name: "God's Holiness & Glory",
    description: "Isaiah encounters the overwhelming holiness and majesty of God, revealing His transcendent nature and glory.",
    verses: [1, 2, 3, 4],
    color: "#FFD700"
  },
  {
    name: "Human Sinfulness",
    description: "In the presence of God's holiness, Isaiah recognizes his own sinfulness and unworthiness.",
    verses: [5],
    color: "#FF6B6B"
  },
  {
    name: "Cleansing & Forgiveness",
    description: "God provides cleansing and atonement for Isaiah's sin through the coal from the altar.",
    verses: [6, 7],
    color: "#4ECDC4"
  },
  {
    name: "Call & Commission",
    description: "After being cleansed, Isaiah responds to God's call and accepts his prophetic mission.",
    verses: [8],
    color: "#95E1D3"
  },
  {
    name: "Difficult Message",
    description: "God commissions Isaiah with a message of judgment and hardening of hearts.",
    verses: [9, 10, 11, 12],
    color: "#A8E6CF"
  },
  {
    name: "Hope & Remnant",
    description: "Despite judgment, God preserves a holy remnant as a seed of future restoration.",
    verses: [13],
    color: "#F38181"
  }
]

export interface StudyNote {
  verse: number
  title: string
  content: string
}

export const studyNotes: StudyNote[] = [
  {
    verse: 1,
    title: "Historical Context",
    content: "King Uzziah's death (around 740 BC) marked a turning point for Judah. He had been a strong, prosperous king who reigned for 52 years. His death left uncertainty about the nation's future, making this vision of God's eternal sovereignty particularly meaningful."
  },
  {
    verse: 1,
    title: "The Vision of God's Throne",
    content: "Isaiah sees God 'high and exalted,' emphasizing His sovereignty and transcendence. The train of His robe filling the temple signifies His glory permeating every space. This contrasts earthly thrones - while earthly kings die, God's throne is eternal."
  },
  {
    verse: 2,
    title: "The Seraphim",
    content: "Seraphim (meaning 'burning ones') appear only here in Scripture. Their six wings show complete devotion: two covering faces (reverence), two covering feet (humility), two for flight (service). Even these holy beings cannot look directly upon God's glory."
  },
  {
    verse: 3,
    title: "Trisagion - 'Holy, Holy, Holy'",
    content: "The threefold repetition emphasizes the superlative nature of God's holiness - He is completely set apart, pure, and perfect. This is the only attribute of God repeated three times in Scripture, highlighting its central importance to His nature."
  },
  {
    verse: 5,
    title: "Isaiah's Response",
    content: "Isaiah's immediate response to God's holiness is conviction of his own sin. 'Unclean lips' may refer to his speech, but represents his entire being. True encounter with God's holiness always reveals our sinfulness and need for cleansing."
  },
  {
    verse: 7,
    title: "Atonement by Fire",
    content: "The live coal from the altar symbolizes purification and atonement. This prefigures Christ's atoning work - just as the coal cleansed Isaiah's lips, Christ's sacrifice cleanses us completely. The altar connection points to substitutionary sacrifice."
  },
  {
    verse: 8,
    title: "The Divine Commission",
    content: "'Here am I. Send me!' Only after cleansing does Isaiah volunteer for service. God's call comes as a question ('Whom shall I send?'), inviting willing response rather than coerced obedience. Cleansing precedes and enables service."
  },
  {
    verse: 8,
    title: "The Plural 'Us'",
    content: "God says 'who will go for us' - the plural may hint at the Trinity or could be a 'royal we.' Regardless, it emphasizes the divine council and God's desire for human partnership in His mission."
  },
  {
    verse: 9,
    title: "A Difficult Message",
    content: "Isaiah's message would produce spiritual hardening in many hearers. This doesn't mean God desires people to reject truth, but that persistent rejection of God's message leads to judicial hardening - a principle Jesus later quoted (Matthew 13:14-15)."
  },
  {
    verse: 13,
    title: "The Holy Seed",
    content: "Despite devastating judgment, God promises a remnant - 'the holy seed.' This points to both the faithful remnant of Israel and ultimately to Christ, the ultimate 'seed' through whom restoration comes. Judgment is never God's final word; hope remains."
  }
]
