import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

interface Verse {
  number: number;
  text: string;
  group: number;
  isHinge?: boolean;
}

interface Connection {
  from?: string[];
  to?: string[];
  context: string;
}

const verses: Verse[] = [
  { number: 1, text: "And in that day seven women shall take hold of one man, saying, 'We will eat our own bread and wear our own clothes, only let us be called by your name; take away our reproach.'", group: 1 },
  { number: 2, text: "In that day the branch of the LORD shall be beautiful and glorious, and the fruit of the land shall be the pride and honor of the survivors of Israel.", group: 2, isHinge: true },
  { number: 3, text: "And he who is left in Zion and remains in Jerusalem will be called holy, everyone who has been recorded for life in Jerusalem,", group: 2 },
  { number: 4, text: "when the Lord shall have washed away the filth of the daughters of Zion and cleansed the bloodstains of Jerusalem from its midst by a spirit of judgment and by a spirit of burning.", group: 2 },
  { number: 5, text: "Then the LORD will create over the whole site of Mount Zion and over her assemblies a cloud by day, and smoke and the shining of a flaming fire by night; for over all the glory there will be a canopy.", group: 3 },
  { number: 6, text: "There will be a booth for shade by day from the heat, and for a refuge and a shelter from the storm and rain.", group: 3 }
];

const reflectionContent = {
  1: {
    seeing: "This verse describes desperate circumstances—war has decimated the male population, leaving many women competing for one surviving man. Their offer to provide for themselves shows the depth of their shame and desperation.",
    life: "This picture of desperation reminds us what life looks like when we face judgment without God's intervention. Sometimes we must hit bottom before we're ready for God's restoration.",
    teach: "The scene of seven women reflects the consequences of God's judgment described in chapter 3. It sets up the contrast with the restoration that follows, showing humanity's need for divine intervention."
  },
  2: {
    seeing: "This hinge verse dramatically shifts from human desperation to divine beauty. The 'Branch of the LORD' represents the Messiah, bringing glory and fruitfulness where there was only shame and barrenness.",
    life: "When everything seems hopeless, God's intervention changes everything. The Branch brings beauty to replace ashes, honor to replace shame. What looks dead can bloom again through God's power.",
    teach: "The Branch of the LORD is a messianic title appearing throughout the prophets. This represents Christ emerging from the stump of David's fallen dynasty, bringing restoration and glory."
  },
  3: {
    seeing: "Those who survive judgment will be called 'holy'—set apart for God. Being 'recorded for life' shows God's sovereign choice and preservation of His remnant people.",
    life: "Holiness isn't achieved by our effort but by God's preservation and calling. If you belong to Christ, you're recorded for life in His book. This isn't about perfection but about God's gracious choice.",
    teach: "The remnant theology runs throughout Isaiah—not all Israel is lost, but God preserves a faithful remnant. Holiness comes through God's cleansing work, not human achievement."
  },
  4: {
    seeing: "God cleanses through 'a spirit of judgment and burning'—purification that removes filth and bloodstains. This isn't gentle washing but intense purging that burns away impurity.",
    life: "God's cleansing can feel like fire—uncomfortable, even painful. But He burns away what defiles us, removing the stains we cannot remove ourselves. His refining fire is motivated by love.",
    teach: "Divine cleansing precedes divine presence. God must purify His people before dwelling among them. The spirit of burning represents both judgment on sin and purification of the faithful."
  },
  5: {
    seeing: "God recreates the Exodus imagery—cloud by day, fire by night—showing His protective presence over Zion. The 'canopy' suggests both covering and glory, God's shekinah dwelling with His people.",
    life: "Just as God guided Israel through the wilderness with cloud and fire, He promises to be present with His restored people. His presence is both our guide and our protection.",
    teach: "This verse recalls the tabernacle and Exodus journey, but promises something greater—God's permanent dwelling with His purified people. The cloud and fire symbolize divine presence, guidance, and protection."
  },
  6: {
    seeing: "God provides comprehensive shelter—shade from heat, refuge from storms and rain. Every need is met, every threat is countered. This is complete, loving provision from a caring Father.",
    life: "What 'heat,' 'storm,' or 'rain' are you facing? God promises to be your shelter through every difficulty. His presence is both shade in scorching times and refuge in violent storms.",
    teach: "The booth or tabernacle represents God's dwelling among His people, providing complete protection. This points forward to the ultimate fulfillment when God dwells with humanity in the New Jerusalem."
  }
};

const scriptureConnections: Record<number, Connection> = {
  1: {
    from: ["Isaiah 3:25-26 - Men fallen in battle, gates lamenting", "Leviticus 26:26 - Judgment brings scarcity"],
    to: ["Revelation 2-3 - Seven churches seeking Christ's name", "Luke 14:16-24 - The great banquet and refusal"],
    context: "This verse shows the low point of judgment before restoration begins. The desperation of verse 1 makes the beauty of verse 2's Branch even more glorious."
  },
  2: {
    from: ["Isaiah 11:1 - Branch from the stump of Jesse", "Jeremiah 23:5 - Righteous Branch raised to David", "Zechariah 3:8 - My Servant the BRANCH"],
    to: ["John 15:1 - Jesus as the true vine", "Revelation 22:16 - I am the root and offspring of David"],
    context: "The Branch of the LORD is a messianic title representing Christ's divine origin and humble appearance. He brings beauty and fruitfulness to what seemed dead and barren."
  },
  3: {
    from: ["Exodus 32:32-33 - Book of life", "Psalm 69:28 - Let them be blotted out of the book of the living"],
    to: ["Philippians 4:3 - Whose names are in the book of life", "Revelation 21:27 - Only those written in the Lamb's book of life"],
    context: "Being 'recorded for life' shows God's sovereign preservation of His remnant. Holiness comes not through human effort but through God's cleansing and calling."
  },
  4: {
    from: ["Malachi 3:2-3 - He is like a refiner's fire", "Zechariah 13:9 - Refine them as silver is refined"],
    to: ["1 Corinthians 3:13-15 - Fire will test the quality of each person's work", "1 Peter 1:7 - Refined by fire"],
    context: "God's cleansing burns away impurity through judgment and purification. This painful process is necessary before His holy presence can dwell among His people."
  },
  5: {
    from: ["Exodus 13:21-22 - Pillar of cloud by day, fire by night", "Exodus 40:34-38 - Glory of the LORD filled the tabernacle"],
    to: ["Revelation 21:3 - God's dwelling place is among the people", "Revelation 21:23 - The glory of God gives it light"],
    context: "The recreation of Exodus imagery shows God's permanent presence with His restored people. What was temporary in the wilderness becomes eternal in the redeemed Zion."
  },
  6: {
    from: ["Psalm 27:5 - He will hide me in his shelter", "Psalm 91:1 - He who dwells in the shelter of the Most High"],
    to: ["John 1:14 - The Word became flesh and dwelt (tabernacled) among us", "Revelation 7:15-16 - He will shelter them, and God will wipe away every tear"],
    context: "God's shelter provides comprehensive protection from every threat. This points to the ultimate fulfillment when God dwells with humanity, removing all pain and danger."
  }
};

function Chapter4() {
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reflections' | 'connections'>('reflections');
  const [activeReflectionMode, setActiveReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');

  const getGroupName = (group: number): string => {
    const names = {
      1: "Desperation After Judgment",
      2: "The Branch Brings Restoration",
      3: "God's Glorious Presence Returns"
    };
    return names[group as keyof typeof names] || "";
  };

  const getGroupTransition = (group: number): string => {
    const transitions = {
      1: "Seven women seeking one man - consequences of judgment",
      2: "The Branch of the LORD - Messiah brings beauty and cleansing",
      3: "Cloud and fire return - God's protective presence restored"
    };
    return transitions[group as keyof typeof transitions] || "";
  };

  const getColorClass = (group: number, isHovered: boolean = false): string => {
    const colors = {
      1: isHovered ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600",
      2: isHovered ? "bg-green-600 border-green-700" : "bg-green-500 border-green-600",
      3: isHovered ? "bg-blue-600 border-blue-700" : "bg-blue-500 border-blue-600"
    };
    return colors[group as keyof typeof colors] || "";
  };

  const getReflectionContent = (verseNum: number) => {
    return reflectionContent[verseNum as keyof typeof reflectionContent] || {
      seeing: "This verse contributes to Isaiah's vision of restoration after judgment.",
      life: "Consider how this verse speaks to God's work in your life.",
      teach: "This verse reveals truth about God's character and redemptive plan."
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
            <span className="text-gray-800 font-semibold px-2 py-1 bg-blue-100 rounded">Ch 4</span>
            <Link to="/chapter-5" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 5</Link>
            <Link to="/chapter-6" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 6</Link>
            <Link to="/chapter-7" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 7</Link>
            <Link to="/chapter-8" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 8</Link>
            <Link to="/chapter-9" className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 hover:bg-blue-50 rounded">Ch 9</Link>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Isaiah Chapter 4 Interactive Study</h1>
          <p className="text-lg text-gray-600">The Branch of the LORD and God's Return</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Understanding the Restoration After Judgment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Key transformation points</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full"></span>
            <p>Yellow dot marks the turning point—from desperation to restoration through the Branch</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
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
                <span className="relative z-10">4:{verse.number}</span>
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
                    <h2 className="text-2xl font-bold text-gray-800">Verse 4:{selectedVerse.number}</h2>
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
      </div>
    </div>
  );
}

export default Chapter4;
