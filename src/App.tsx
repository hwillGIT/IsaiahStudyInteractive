import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Chapter1 from './chapters/Chapter1';
import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';
import Chapter6 from './chapters/Chapter6';
import Chapter7 from './chapters/Chapter7';
import Chapter8 from './chapters/Chapter8';
import Chapter9 from './chapters/Chapter9';
import './App.css';

function Home() {
  const chapters = [
    { num: 1, title: "The Rebellious Nation and the Invitation to Return", verses: 31, theme: "God's covenant lawsuit centers on the divine invitation: 'Though your sins are like scarlet, they shall be as white as snow'" },
    { num: 2, title: "God's Mountain, Idolatry, and the Day of the LORD", verses: 22, theme: "From exaltation to humiliation: God's mountain above all vs. humanity bowing to idols" },
    { num: 3, title: "Judgment on Leaders and Pride", verses: 25, theme: "When leaders fail, society crumbles—God removes props to expose dependence on Him" },
    { num: 4, title: "The Branch of the LORD and God's Return", verses: 6, theme: "After judgment comes cleansing—God's glory returns to shelter His purified people" },
    { num: 5, title: "The Song of the Vineyard and Six Woes", verses: 30, theme: "God's vineyard produces wild grapes—justice turns to bloodshed, righteousness to cries of distress" },
    { num: 6, title: "Encountering God's Holiness and Divine Commissioning", verses: 13, theme: "Isaiah's throne room vision: conviction, cleansing, commission, and the promise of a holy remnant" },
    { num: 7, title: "The Sign of Immanuel - God With Us", verses: 25, theme: "When human fear meets divine promise, God offers the ultimate sign: Immanuel, God with us" },
    { num: 8, title: "Sanctuary or Stumbling Stone", verses: 22, theme: "The same God becomes either sanctuary for those who trust or stumbling stone for those who fear" },
    { num: 9, title: "The Light in the Darkness and the Prince of Peace", verses: 21, theme: "From deep darkness to great light—the child born to us will establish endless peace and justice" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Isaiah Interactive Study</h1>
          <p className="text-xl text-gray-600">Chapters 1-9: Exploring God's Message Through Color-Coded Themes</p>
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

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">How to Use This Study App</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">→</span>
              <span><strong>Color-coded themes:</strong> Each chapter organizes verses into thematic groups with distinct colors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">→</span>
              <span><strong>Three perspectives:</strong> Every verse includes devotional reflections from three angles—Seeing Connections, How This Helps My Life, and What This Teaches Us</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">→</span>
              <span><strong>Scripture connections:</strong> Discover how each verse builds on earlier passages and points forward to future fulfillment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">→</span>
              <span><strong>Chapter structure:</strong> View each chapter's overall pattern and theological framework in everyday language</span>
            </li>
          </ul>
        </div>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
