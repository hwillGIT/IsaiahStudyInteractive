import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';
import Chapter6 from './chapters/Chapter6';
import Chapter7 from './chapters/Chapter7';
import Chapter8 from './chapters/Chapter8';
import Chapter9 from './chapters/Chapter9';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chapter-6" replace />} />
        <Route path="/chapter-2" element={<Chapter2 />} />
        <Route path="/chapter-3" element={<Chapter3 />} />
        <Route path="/chapter-4" element={<Chapter4 />} />
        <Route path="/chapter-5" element={<Chapter5 />} />
        <Route path="/chapter-6" element={<Chapter6 />} />
        <Route path="/chapter-7" element={<Chapter7 />} />
        <Route path="/chapter-8" element={<Chapter8 />} />
        <Route path="/chapter-9" element={<Chapter9 />} />
        <Route path="*" element={<Navigate to="/chapter-6" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
