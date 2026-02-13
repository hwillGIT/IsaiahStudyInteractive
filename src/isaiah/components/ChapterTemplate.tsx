import { useState } from 'react';
import { ChapterNavigation } from './ChapterNavigation';
import { StructureButton } from './StructureButton';
import { useChapterData, type StructureSection, type StructureParallel } from '../hooks/useChapterData';
import { getColorClass, getUniqueHingeTypes } from '../utils/chapterHelpers';
import '../App.css';

interface ChapterTemplateProps {
  chapterNumber: number;
}

const defaultGroupNames: Record<number, string> = {
  1: 'Group 1',
  2: 'Group 2',
  3: 'Group 3',
  4: 'Group 4',
  5: 'Group 5',
  6: 'Group 6',
  7: 'Group 7',
  8: 'Group 8',
  9: 'Group 9'
};

function ChapterTemplate({ chapterNumber }: ChapterTemplateProps) {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [reflectionMode, setReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [modalView, setModalView] = useState<'reflection' | 'connections'>('reflection');

  const { data, loading, error } = useChapterData(chapterNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading Chapter {chapterNumber}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading chapter: {error}</div>
      </div>
    );
  }

  if (!data || !data.verses || data.verses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">No verses found</div>
      </div>
    );
  }

  const { verses, reflections, scriptureConnections, groupMetadata, hingeMetadata } = data;
  const uniqueHingeTypes = getUniqueHingeTypes(verses);
  const groups = Array.from(new Set(verses.map(v => v.group))).sort((a, b) => a - b);

  const getGroupName = (group: number): string => {
    if (groupMetadata && groupMetadata[group]) {
      return groupMetadata[group].name;
    }
    return defaultGroupNames[group] || 'Unknown Group';
  };

  const getGroupTransition = (group: number): string => {
    if (groupMetadata && groupMetadata[group]) {
      return groupMetadata[group].transition;
    }
    return "Transition point in Isaiah's vision";
  };

  const getHingeExplanation = (hingeType: string): string => {
    if (hingeMetadata && hingeMetadata[hingeType]) {
      return hingeMetadata[hingeType].explanation;
    }
    return 'Structural transition point';
  };

  const getHingeColorOverride = (hingeType?: string): string => {
    if (hingeType && hingeMetadata && hingeMetadata[hingeType]) {
      return hingeMetadata[hingeType].color;
    }
    return 'bg-yellow-400';
  };

  const getConnection = (verseNum: number) => scriptureConnections?.[verseNum];
  const getReflection = (verseNum: number) => reflections?.[verseNum];
  const getSelectedVerse = () => verses.find(v => v.number === selectedVerse);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <ChapterNavigation currentChapter={chapterNumber} />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Isaiah Chapter {chapterNumber}</h1>
          <p className="text-xl text-gray-600">{data.subtitle}</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Chapter Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div key={group} className="flex items-start gap-3">
                <div className={`w-4 h-4 ${getColorClass(group)} rounded mt-1 flex-shrink-0`}></div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    <span className="text-gray-400 mr-1">{group}.</span>
                    {getGroupName(group)}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{getGroupTransition(group)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.structureModal !== null && data.structureModal !== undefined && (
          <StructureButton 
            onClick={() => setShowStructureModal(true)}
            subtitle={data.structureSubtitle}
          />
        )}

        {uniqueHingeTypes.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Transformation Points</h3>
            <div className="space-y-2">
              {uniqueHingeTypes.map((hingeType) => (
                <div key={hingeType} className="flex items-start gap-3">
                  <div className={`w-3 h-3 ${getHingeColorOverride(hingeType)} rounded-full mt-1 flex-shrink-0`}></div>
                  <p className="text-sm text-gray-700">{getHingeExplanation(hingeType)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {verses.map((verse) => (
            <div
              key={verse.number}
              onClick={() => setSelectedVerse(verse.number)}
              className={`relative ${getColorClass(verse.group)} text-white p-4 rounded-lg cursor-pointer hover:opacity-80 transition-opacity group`}
            >
              <div className="text-sm font-bold">{chapterNumber}:{verse.number}</div>
              {verse.isHinge && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${getHingeColorOverride(verse.hingeType)} rounded-full animate-pulse`}></div>
              )}
              
              <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded py-2 px-3 z-10">
                <div className="font-bold mb-1">Verse {chapterNumber}:{verse.number}</div>
                <div className="line-clamp-3">{verse.text}</div>
                {verse.isHinge && (
                  <div className="text-xs text-yellow-300 mt-1 flex items-center gap-1">
                    <div className={`w-2 h-2 ${getHingeColorOverride(verse.hingeType)} rounded-full`}></div>
                    Key Turning Point
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedVerse && getSelectedVerse() && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
            <div className="bg-white rounded-lg max-w-2xl w-full my-8 flex flex-col max-h-[90vh] mx-4">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg flex-shrink-0">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Isaiah {chapterNumber}:{selectedVerse}</h3>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-white hover:text-gray-200 text-2xl font-bold ml-4"
                  >
                    ×
                  </button>
                </div>
                <p className="text-lg leading-relaxed">{getSelectedVerse()?.text}</p>
              </div>

              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setModalView('reflection')}
                    className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                      modalView === 'reflection'
                        ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Reflections
                  </button>
                  {getConnection(selectedVerse) && (
                    <button
                      onClick={() => setModalView('connections')}
                      className={`flex-1 px-6 py-3 font-semibold transition-colors ${
                        modalView === 'connections'
                          ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Scripture Connections
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 overflow-y-auto">
                {modalView === 'reflection' && (
                  <div>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <button
                        onClick={() => setReflectionMode('seeing')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          reflectionMode === 'seeing'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Seeing Connections
                      </button>
                      <button
                        onClick={() => setReflectionMode('life')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          reflectionMode === 'life'
                            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        How This Helps My Life
                      </button>
                      <button
                        onClick={() => setReflectionMode('teach')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          reflectionMode === 'teach'
                            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        What This Teaches Us
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {getReflection(selectedVerse)?.[reflectionMode] || 'No reflection available for this verse.'}
                    </p>
                  </div>
                )}

                {modalView === 'connections' && getConnection(selectedVerse) && (
                  <div className="space-y-4">
                    {getConnection(selectedVerse)?.from && getConnection(selectedVerse)!.from!.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <span className="text-blue-600">←</span>
                          What This Verse Builds Upon
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {getConnection(selectedVerse)?.from?.map((ref, idx) => (
                            <li key={idx}>{ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {getConnection(selectedVerse)?.to && getConnection(selectedVerse)!.to!.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <span className="text-green-600">→</span>
                          What This Verse Points Toward
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {getConnection(selectedVerse)?.to?.map((ref, idx) => (
                            <li key={idx}>{ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {getConnection(selectedVerse)?.context && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">How It Fits God's Story</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {getConnection(selectedVerse)?.context}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showStructureModal && data.structureModal && (() => {
          const colorMap: Record<string, { bg: string; text: string; bgLight: string; border: string }> = {
            yellow: { bg: 'bg-yellow-400', text: 'text-yellow-700', bgLight: 'bg-yellow-100', border: 'border-yellow-500' },
            red: { bg: 'bg-red-500', text: 'text-red-700', bgLight: 'bg-red-100', border: 'border-red-500' },
            blue: { bg: 'bg-blue-600', text: 'text-blue-700', bgLight: 'bg-blue-100', border: 'border-blue-500' },
            purple: { bg: 'bg-purple-500', text: 'text-purple-700', bgLight: 'bg-purple-100', border: 'border-purple-500' },
            orange: { bg: 'bg-orange-500', text: 'text-orange-700', bgLight: 'bg-orange-100', border: 'border-orange-500' },
            teal: { bg: 'bg-teal-500', text: 'text-teal-800', bgLight: 'bg-teal-100', border: 'border-teal-500' },
            green: { bg: 'bg-green-500', text: 'text-green-700', bgLight: 'bg-green-100', border: 'border-green-500' },
            gray: { bg: 'bg-gray-600', text: 'text-gray-700', bgLight: 'bg-gray-100', border: 'border-gray-500' },
          };
          const indentClass = ['ml-0', 'ml-4', 'ml-8', 'ml-12'];
          const sm = data.structureModal;
          const centerIndex = sm.sections.findIndex((s: StructureSection) => s.isCenter);

          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto">
              <div className="bg-white rounded-lg max-w-3xl w-full mx-4 my-8 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg flex-shrink-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{sm.title}</h3>
                      {sm.subtitle && <p className="text-sm text-gray-600 mt-1">{sm.subtitle}</p>}
                    </div>
                    <button
                      onClick={() => setShowStructureModal(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto">
                  {sm.intro && <p className="text-sm text-gray-600 mb-4">{sm.intro}</p>}
                  <div className="space-y-1 font-mono text-xs text-gray-700 bg-gray-50 p-4 rounded">
                    {sm.sections.map((section: StructureSection, idx: number) => {
                      const colors = colorMap[section.color] || colorMap.gray;
                      const indent = indentClass[Math.min(section.indent, 3)];
                      const isFirstAfterCenter = centerIndex >= 0 && idx === centerIndex + 1;

                      return (
                        <div key={idx}>
                          {section.isCenter ? (
                            <>
                              <div className={`${indent} ${colors.bgLight} px-2 py-1 rounded border-l-4 ${colors.border} flex items-start gap-2`}>
                                <div className={`w-3 h-3 ${colors.bg} rounded mt-0.5 flex-shrink-0`}></div>
                                <span className={`font-sans ${colors.text} font-bold`}>★ {section.label}: {section.name} — {section.description}</span>
                              </div>
                              {section.centerQuote && (
                                <div className={`${indentClass[Math.min(section.indent + 1, 3)]} ${colors.text} font-sans italic pl-5`}>"{section.centerQuote}"</div>
                              )}
                            </>
                          ) : (
                            <div className={`${isFirstAfterCenter ? 'mt-3 border-t-2 border-gray-300 pt-2 ' : ''}${indent} flex items-start gap-2`}>
                              <div className={`w-3 h-3 ${colors.bg} rounded mt-0.5 flex-shrink-0`}></div>
                              <span>{section.label}: <span className={`font-sans font-semibold ${colors.text}`}>{section.name}</span> — {section.description}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {sm.parallels && sm.parallels.length > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                      <h4 className="font-bold text-gray-800 mb-3">How the Parallels Connect:</h4>
                      <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                        {sm.parallels.map((p: StructureParallel, idx: number) => (
                          <li key={idx}><strong>{p.pair}:</strong> {p.explanation}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sm.closing && <p className="text-sm text-gray-600 mt-4 italic">{sm.closing}</p>}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default ChapterTemplate;
