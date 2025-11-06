import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chapter6 from './chapters/Chapter6';
import Chapter9 from './chapters/Chapter9';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chapter-6" replace />} />
        <Route path="/chapter-6" element={<Chapter6 />} />
        <Route path="/chapter-9" element={<Chapter9 />} />
        <Route path="/chapter-2" element={<ComingSoon chapter={2} />} />
        <Route path="/chapter-3" element={<ComingSoon chapter={3} />} />
        <Route path="/chapter-4" element={<ComingSoon chapter={4} />} />
        <Route path="/chapter-5" element={<ComingSoon chapter={5} />} />
        <Route path="/chapter-7" element={<ComingSoon chapter={7} />} />
        <Route path="/chapter-8" element={<ComingSoon chapter={8} />} />
        <Route path="*" element={<Navigate to="/chapter-6" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ComingSoon({ chapter }: { chapter: number }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Isaiah Chapter {chapter}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Coming Soon
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This chapter is being prepared and will be available soon. 
          Use the navigation above to explore other chapters.
        </p>
        <div className="flex gap-2 justify-center">
          <a
            href="/chapter-6"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Chapter 6
          </a>
          <a
            href="/chapter-9"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View Chapter 9
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
