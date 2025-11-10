/**
 * Chapter 2: God's Mountain, Idolatry, and the Day of the LORD
 * 
 * This component fetches chapter data from the backend API instead of using hardcoded arrays.
 * The backend serves verses, reflections, and scripture connections from JSON files.
 */

import { useState } from 'react';
import { ChapterNavigation } from '../components/ChapterNavigation';
import { StructureButton } from '../components/StructureButton';
import { Chapter2StructureModal } from '../components/Chapter2StructureModal';
import { useChapterData } from '../hooks/useChapterData';
import { getColorClass, getUniqueHingeTypes } from '../utils/chapterHelpers';
import '../App.css';

// Chapter-specific metadata (UI presentation layer)
const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: 'Mountain Exalted',
    2: 'Invitation to Walk',
    3: 'Pride & Idolatry',
    4: 'Day of Reckoning',
    5: 'Terror & Flight'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: "Future vision: God's mountain above all, nations streaming to learn His ways",
    2: "Present call: Walk in God's light now in response to the promised future",
    3: "Current corruption: Israel filled with idols, wealth, and foreign practices",
    4: "Coming judgment: The Day of the LORD against all human pride and arrogance",
    5: "Final outcome: People fleeing to caves, idols cast away as worthless"
  };
  return transitions[group] || "Transition point in Isaiah's vision";
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'hinge': 'Chiastic Center (v5) — Walk in the light of the LORD now',
    'turn-judgment': 'Dramatic Turn (v11) — From present corruption to future judgment'
  };
  return explanations[hingeType] || 'Structural transition point';
};

// Chapter 2 uses standard yellow for all hinges
const getHingeColorOverride = (_hingeType?: string): string => {
  return 'bg-yellow-400';
};

function Chapter2() {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [reflectionMode, setReflectionMode] = useState<'seeing' | 'life' | 'teach'>('seeing');
  const [modalView, setModalView] = useState<'reflection' | 'connections'>('reflection');

  // Fetch data from backend
  const { data, loading, error } = useChapterData(2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading Chapter 2...</div>
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

  const { verses, reflections, scriptureConnections } = data;
  const uniqueHingeTypes = getUniqueHingeTypes(verses);
  const groups = Array.from(new Set(verses.map(v => v.group))).sort((a, b) => a - b);

  const getConnection = (verseNum: number) => scriptureConnections?.[verseNum];
  const getReflection = (verseNum: number) => reflections?.[verseNum];
  const getSelectedVerse = () => verses.find(v => v.number === selectedVerse);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <ChapterNavigation currentChapter={2} />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Isaiah Chapter 2</h1>
          <p className="text-xl text-gray-200">God's Mountain, Idolatry, and the Day of the LORD</p>
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

        <StructureButton 
          onClick={() => setShowStructureModal(true)}
          subtitle={data.structureSubtitle}
        />

        {uniqueHingeTypes.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-lg p-6 mb-6 border-l-4 border-yellow-400">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>⭐</span>
              <span>Transformation Points</span>
            </h2>
            <div className="space-y-3">
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
              <div className="text-sm font-bold">2:{verse.number}</div>
              {verse.isHinge && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${getHingeColorOverride(verse.hingeType)} rounded-full animate-pulse`}></div>
              )}
              
              <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded py-2 px-3 z-10">
                <div className="font-bold mb-1">Verse 2:{verse.number}</div>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-2xl w-full my-8">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Isaiah 2:{selectedVerse}</h3>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-white hover:text-gray-200 text-2xl font-bold"
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

              <div className="p-6">
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

        <Chapter2StructureModal 
          isOpen={showStructureModal} 
          onClose={() => setShowStructureModal(false)} 
        />
      </div>
    </div>
  );
}

export default Chapter2;
