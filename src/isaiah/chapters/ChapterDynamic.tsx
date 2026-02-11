import { useParams, Navigate } from 'react-router-dom';
import Chapter1 from './Chapter1';
import Chapter2 from './Chapter2';
import Chapter3 from './Chapter3';
import Chapter4 from './Chapter4';
import Chapter5 from './Chapter5';
import Chapter6 from './Chapter6';
import Chapter7 from './Chapter7';
import Chapter8 from './Chapter8';
import Chapter9 from './Chapter9';
import Chapter10 from './Chapter10';
import Chapter11 from './Chapter11';
import Chapter12 from './Chapter12';
import ChapterTemplate from '../components/ChapterTemplate';

const chapterMap: Record<number, React.ComponentType> = {
  1: Chapter1,
  2: Chapter2,
  3: Chapter3,
  4: Chapter4,
  5: Chapter5,
  6: Chapter6,
  7: Chapter7,
  8: Chapter8,
  9: Chapter9,
  10: Chapter10,
  11: Chapter11,
  12: Chapter12,
};

export default function ChapterDynamic() {
  const params = useParams();
  const chapterNumber = parseInt(params.chapterNumber || '', 10);
  if (!Number.isFinite(chapterNumber) || chapterNumber < 1) {
    return <Navigate to="/" replace />;
  }
  const Existing = chapterMap[chapterNumber];
  if (Existing) return <Existing />;
  return <ChapterTemplate chapterNumber={chapterNumber} />;
}
