import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Chapter1 from './chapters/Chapter1';
import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';
import Chapter6 from './chapters/Chapter6';
import Chapter7 from './chapters/Chapter7';
import Chapter8 from './chapters/Chapter8';
import Chapter9 from './chapters/Chapter9';
import Chapter10 from './chapters/Chapter10';
import Chapter11 from './chapters/Chapter11';
import Chapter12 from './chapters/Chapter12';
import './App.css';

function Home() {
  const [showBookStructure, setShowBookStructure] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showPropheticWorld, setShowPropheticWorld] = useState(false);

  const chapters = [
    { num: 1, title: "The Rebellious Nation and the Invitation to Return", verses: 31, theme: "God's covenant lawsuit centers on the divine invitation: 'Though your sins are like scarlet, they shall be as white as snow'" },
    { num: 2, title: "God's Mountain, Idolatry, and the Day of the LORD", verses: 22, theme: "From exaltation to humiliation: God's mountain above all vs. humanity bowing to idols" },
    { num: 3, title: "Judgment on Leaders and Pride", verses: 25, theme: "When leaders fail, society crumbles—God removes props to expose dependence on Him" },
    { num: 4, title: "The Branch of the LORD and God's Return", verses: 6, theme: "After judgment comes cleansing—God's glory returns to shelter His purified people" },
    { num: 5, title: "The Song of the Vineyard and Six Woes", verses: 30, theme: "God's vineyard produces wild grapes—justice turns to bloodshed, righteousness to cries of distress" },
    { num: 6, title: "Encountering God's Holiness and Divine Commissioning", verses: 13, theme: "Isaiah's throne room vision: conviction, cleansing, commission, and the promise of a holy remnant" },
    { num: 7, title: "The Sign of Immanuel - God With Us", verses: 25, theme: "When human fear meets divine promise, God offers the ultimate sign: Immanuel, God with us" },
    { num: 8, title: "Sanctuary or Stumbling Stone", verses: 22, theme: "The same God becomes either sanctuary for those who trust or stumbling stone for those who fear" },
    { num: 9, title: "The Light in the Darkness and the Prince of Peace", verses: 21, theme: "From deep darkness to great light—the child born to us will establish endless peace and justice" },
    { num: 10, title: "Assyria: God's Rod and the Remnant's Return", verses: 34, theme: "God uses Assyria as His rod of anger, then judges their pride—sovereignly orchestrating history while preserving a faithful remnant" },
    { num: 11, title: "The Messiah's Reign and the Peaceable Kingdom", verses: 16, theme: "From Jesse's stump emerges the Spirit-empowered Messiah bringing righteous judgment, universal peace, and restoration for all nations" },
    { num: 12, title: "Song of Thanksgiving and Praise", verses: 6, theme: "The Book of Immanuel concludes with joyful thanksgiving: drawing from wells of salvation and proclaiming God's deeds among all peoples" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Isaiah Interactive Study</h1>
          <p className="text-xl text-gray-600">Chapters 1-12: Exploring God's Message Through Color-Coded Themes</p>
          <p className="text-sm text-gray-500 mt-2">Click any chapter to begin your study journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <Link
              key={chapter.num}
              to={`/chapter-${chapter.num}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-5 border-l-4 border-purple-500 hover:border-purple-700"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold text-purple-600">Chapter {chapter.num}</h2>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{chapter.verses} verses</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">{chapter.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{chapter.theme}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setShowBookStructure(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all text-left"
          >
            <h3 className="text-xl font-bold mb-2">📖 Understanding the Book of Isaiah</h3>
            <p className="text-sm opacity-90">Discover how chapters 1-39, 40-55, and 56-66 form a unified message across different periods</p>
          </button>

          <button
            onClick={() => setShowPropheticWorld(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all text-left"
          >
            <h3 className="text-xl font-bold mb-2">🌍 Isaiah's Prophetic World</h3>
            <p className="text-sm opacity-90">Explore the culture, calling, and courageous ministry of prophets in ancient Judah</p>
          </button>

          <button
            onClick={() => setShowHowToUse(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all text-left"
          >
            <h3 className="text-xl font-bold mb-2">🎯 How to Use This Study App</h3>
            <p className="text-sm opacity-90">Learn about color-coded themes, three reflection perspectives, and Scripture connections</p>
          </button>
        </div>

        {/* Book Structure Modal */}
        {showBookStructure && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-800">Understanding the Book of Isaiah</h3>
                  <button
                    onClick={() => setShowBookStructure(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Isaiah is the longest prophetic book in the Bible—66 chapters spanning multiple time periods and themes. While traditionally attributed to the prophet Isaiah of Jerusalem (8th century BC), scholars have noticed that the book addresses different historical situations and shows distinct literary styles across its three major sections.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
                    <h4 className="text-lg font-bold text-blue-900 mb-3">First Isaiah (Chapters 1-39): Judgment and Hope</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Historical setting:</strong> Written during the Assyrian crisis (8th century BC) when powerful Assyria threatened Jerusalem. Isaiah calls Judah to trust God rather than political alliances.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Key themes:</strong> God's holiness, the coming Messiah, warnings against idolatry, the faithful remnant, and "Immanuel—God with us."
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>These chapters (1-12):</strong> Form the "Book of Immanuel," opening with God's lawsuit against rebellious Israel, Isaiah's throne room commissioning, the sign of Immanuel ("God with us"), prophecies of the coming Prince of Peace and Messiah's reign, warnings about pride and idolatry, and the promise of a faithful remnant, concluding with songs of thanksgiving for God's salvation.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
                    <h4 className="text-lg font-bold text-purple-900 mb-3">Second Isaiah (Chapters 40-55): Comfort and Restoration</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Historical setting:</strong> Addresses the Jewish exiles in Babylon (6th century BC), roughly 150 years after Isaiah of Jerusalem. The people have experienced judgment and now need hope.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Key themes:</strong> "Comfort, comfort my people," God as sole Creator and Redeemer, the Suffering Servant who bears our sins, Israel's mission to be a light to the nations.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Famous passages:</strong> "They who wait upon the LORD shall renew their strength" (40:31), the Suffering Servant songs (especially chapter 53), and invitations to come to the water freely (55:1).
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
                    <h4 className="text-lg font-bold text-green-900 mb-3">Third Isaiah (Chapters 56-66): New Heaven and New Earth</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Historical setting:</strong> Speaks to the returned exiles rebuilding Jerusalem (late 6th/early 5th century BC). The temple is being rebuilt, but the community faces internal struggles.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Key themes:</strong> True worship vs. empty ritual, justice for the oppressed, inclusion of foreigners and outcasts, and the promise of new heavens and new earth where righteousness dwells.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Climactic vision:</strong> Ends with God creating a new heaven and new earth (65-66), a vision that echoes throughout the New Testament, especially in Revelation.
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500">
                    <h4 className="text-lg font-bold text-yellow-900 mb-3">Why It Matters: Unity in Diversity</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Whether written by one prophet across his lifetime, a prophetic school preserving Isaiah's teaching, or multiple prophets in Isaiah's tradition, the book speaks with remarkable unity. The same God who judges sin also offers forgiveness. The same Holy One who demands justice also provides redemption.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Christians have always read Isaiah as pointing to Jesus—His birth (7:14, 9:6), His suffering (53:4-6), His mission to the poor (61:1-2), and His final victory (65:17-25). The New Testament quotes Isaiah more than any other prophet, showing how central this book is to understanding God's plan of salvation.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-700 leading-relaxed italic">
                      As you study these opening chapters, remember you're reading the beginning of a grand story—God's people have rebelled, judgment is coming, yet God offers stunning mercy: "Though your sins are like scarlet, they shall be as white as snow" (1:18). This tension between holiness and grace runs through all 66 chapters and finds its resolution in the promised Messiah—the Suffering Servant who would bear our sins and bring lasting peace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Use Modal */}
        {showHowToUse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-800">How to Use This Study App</h3>
                  <button
                    onClick={() => setShowHowToUse(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Color-Coded Thematic Groups</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">Each chapter organizes verses into thematic groups with distinct colors, making it easy to see how verses relate to each other and identify major themes at a glance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Three Reflection Perspectives</h4>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">Every verse includes devotional reflections from three angles:</p>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4">
                        <li><strong>Seeing Connections:</strong> Observational insights about what the verse reveals</li>
                        <li><strong>How This Helps My Life:</strong> Personal application for your daily walk</li>
                        <li><strong>What This Teaches Us:</strong> Theological truths about God's character and plan</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Scripture Connections</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">Discover how each verse builds on earlier passages (what it comes from) and points forward to future fulfillment (where it's going), especially in Christ.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Chapter Structure Views</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">Each chapter includes a structure modal explaining the overall pattern and theological framework in everyday language—showing how verses work together to form a complete message.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Transformation Point Markers</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">Look for colored dots marking pivotal moments—places where the chapter turns or where God's invitation becomes especially clear.</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 mt-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>Pro tip:</strong> Start by reading the chapter structure to understand the big picture, then click individual verses to explore deeper meanings. The color coding helps you see how verses cluster around themes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prophetic World Modal */}
        {showPropheticWorld && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-800">Isaiah's Prophetic World</h3>
                  <button
                    onClick={() => setShowPropheticWorld(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      To understand Isaiah's message, it helps to step into his world—8th century BC Judah, where prophets were the moral conscience of society, speaking God's truth to kings and common people alike. Prophets weren't fortune-tellers or mystics; they were God's authorized spokespeople, calling the nation back to covenant faithfulness and proclaiming both judgment and hope.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-600">
                    <h4 className="text-lg font-bold text-blue-900 mb-3">Isaiah's World: Society and Power</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Political setting:</strong> Judah and Israel were small kingdoms caught between superpowers—Assyria, Egypt, and later Babylon. Kings faced constant pressure to form alliances for survival. Society was hierarchical: king, nobles and priests, landowners, peasants, artisans, and slaves.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Religious life:</strong> Worship centered on the Jerusalem Temple with its sacrifices, festivals, and purity rituals managed by priests. Prophets stood outside this system as independent voices, interpreting God's will for the nation's moral and spiritual life.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Social dynamics:</strong> Strong collective identity meant sin and blessing affected the whole community. Public rebuke was shocking in an honor-shame culture, making prophetic ministry particularly courageous and costly.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-600">
                    <h4 className="text-lg font-bold text-green-900 mb-3">What Prophets Did (and Didn't Do)</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>God's spokespeople:</strong> Prophets were called and commissioned by God to deliver His message—not their own opinions or predictions. Think of them as God's microphone or messenger. The Hebrew word for prophet means "one who is called" or "spokesperson."
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Not fortune-tellers:</strong> While prophets sometimes announced future events, that wasn't their main job. Their primary role was calling people back to faithfulness, explaining current crises as moral consequences, and pointing to God's character and purposes.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Covenant lawyers:</strong> Prophets functioned like prosecutors in God's covenant lawsuit—"You agreed to follow God's ways. Here's how you've broken that agreement. Here are the consequences. But here's also the path back to restoration."
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-600">
                    <h4 className="text-lg font-bold text-purple-900 mb-3">Prophets vs. Priests vs. Sages</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Priests:</strong> Focused on temple ritual, sacrifices, and ceremonial purity. Their domain was worship—making sure people followed correct procedures. Think Leviticus and the book of ritual law.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Sages (Wisdom teachers):</strong> Offered practical wisdom for daily life—how to raise children, manage money, build relationships. Their domain was family and community. Think Proverbs and everyday guidance.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Prophets:</strong> Addressed covenant fidelity and public justice. Their domain was national morality and faithfulness to God. Isaiah rebuked empty ritualism: "Stop bringing meaningless offerings! Learn to do right; seek justice" (1:13, 17).
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      All three roles were needed, but prophets uniquely challenged the nation to align worship with justice, ritual with righteousness.
                    </p>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-5 border-l-4 border-teal-600">
                    <h4 className="text-lg font-bold text-teal-900 mb-3">How Prophets Communicated</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Prophets were master communicators, using multiple methods to get God's message across:
                    </p>
                    <ul className="text-gray-700 space-y-2 ml-4">
                      <li><strong>Oracles:</strong> Compact poetic declarations—"Thus says the LORD"—delivered with authority and memorable rhythm</li>
                      <li><strong>Symbolic actions:</strong> Isaiah walked barefoot for three years to prefigure Egypt's humiliation (20:2-4); dramatic acts that people couldn't ignore</li>
                      <li><strong>Songs and laments:</strong> The "Song of the Vineyard" (5:1-7) used familiar imagery to convey heartbreak over Israel's failure</li>
                      <li><strong>Woes and blessings:</strong> Legal-style verdicts announcing consequences—"Woe to those who…" (5:8-23)</li>
                      <li><strong>Vision reports:</strong> Heavenly throne room scenes (chapter 6) that authorized the message with divine authority</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-3">
                      This combination of public performance and moral philosophy moved crowds and confronted kings.
                    </p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-5 border-l-4 border-orange-600">
                    <h4 className="text-lg font-bold text-orange-900 mb-3">Isaiah's Distinctive Profile</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Name meaning:</strong> "Yahweh is salvation"—his very name proclaimed hope even amid judgment.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Unique position:</strong> Isaiah had access to the royal court (advising kings like Ahaz and Hezekiah) while maintaining independent moral critique. He combined court prophet functions with fearless truth-telling.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      <strong>Poetic mastery:</strong> Isaiah's Hebrew is considered among the Bible's finest—vivid imagery, emotional power, theological depth (see the vineyard song in chapter 5 or the invitation in 1:18).
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Universal vision:</strong> While addressing Judah specifically, Isaiah envisioned God's salvation reaching all nations (19:25; 56:6-7), anticipating the gospel's worldwide scope.
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600">
                    <h4 className="text-lg font-bold text-red-900 mb-3">The Cost of Speaking Truth</h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Prophetic ministry was dangerous work. Speaking God's truth to power often meant facing ridicule, exile, imprisonment, or execution. Because prophetic words contradicted royal propaganda and challenged comfortable religion, true prophets were frequently marginalized.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Tradition holds that Isaiah was martyred under King Manasseh (see Hebrews 11:37's reference to prophets "sawn in two"). His courage to speak truth regardless of personal cost makes his message all the more powerful—and challenges us to consider what truths we're called to speak in our own time.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <p className="text-gray-700 leading-relaxed italic">
                      As you read Isaiah's words, remember you're hearing a message delivered at great personal risk by someone who had seen God's holiness firsthand (chapter 6). This prophet spoke to kings and peasants alike, combining poetic beauty with prophetic power, calling God's people to align their worship with justice and their rituals with righteousness. His world was different from ours, but his core message remains: God demands more than religious ceremony—He calls for hearts transformed and lives that reflect His justice and mercy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter-1" element={<Chapter1 />} />
        <Route path="/chapter-2" element={<Chapter2 />} />
        <Route path="/chapter-3" element={<Chapter3 />} />
        <Route path="/chapter-4" element={<Chapter4 />} />
        <Route path="/chapter-5" element={<Chapter5 />} />
        <Route path="/chapter-6" element={<Chapter6 />} />
        <Route path="/chapter-7" element={<Chapter7 />} />
        <Route path="/chapter-8" element={<Chapter8 />} />
        <Route path="/chapter-9" element={<Chapter9 />} />
        <Route path="/chapter-10" element={<Chapter10 />} />
        <Route path="/chapter-11" element={<Chapter11 />} />
        <Route path="/chapter-12" element={<Chapter12 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
