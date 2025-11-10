/**
 * INTERACTIVE BIBLE STUDY APPLICATION TEMPLATE
 * 
 * This component fetches chapter data from the backend API instead of using hardcoded arrays.
 * The backend serves verses, reflections, and scripture connections from JSON files.
 */

import { useState } from 'react';
import { ChapterNavigation } from '../components/ChapterNavigation';
import { StructureButton } from '../components/StructureButton';
import { Chapter6StructureModal } from '../components/Chapter6StructureModal';
import { useChapterData } from '../hooks/useChapterData';
import { getColorClass, getUniqueHingeTypes } from '../utils/chapterHelpers';
import '../App.css';

// Chapter-specific metadata (UI presentation layer)
const getGroupName = (group: number): string => {
  const names: Record<number, string> = {
    1: "God's Holy Throne Room",
    2: 'Confession & Cleansing',
    3: 'Divine Commissioning',
    4: 'The Hardening Message',
    5: 'Scope of Judgment',
    6: 'Remnant & Holy Seed'
  };
  return names[group] || 'Unknown Group';
};

const getGroupTransition = (group: number): string => {
  const transitions: Record<number, string> = {
    1: "Encountering God's throne, seraphim, and holy glory",
    2: "Recognizing uncleanness and receiving purification",
    3: 'Responding to God\'s call with "Here am I; send me"',
    4: "Delivering a message that people won't receive",
    5: "Understanding the extent and duration of discipline",
    6: "Hope for survival through God's faithful remnant"
  };
  return transitions[group] || "Transition point in Isaiah's vision";
};

const getHingeExplanation = (hingeType: string): string => {
  const explanations: Record<string, string> = {
    'turn-conviction': 'Dramatic Turn (v5) — From seeing God\'s glory to recognizing personal uncleanness: "Woe to me! I am ruined!"',
    'hinge': 'Chiastic Center (v7) — The coal touches Isaiah\'s lips: guilt removed, sin atoned, cleansing complete',
    'turn-commission': 'Narrative Transition (v8) — From cleansing to commission: "Here am I. Send me!" marks readiness to serve'
  };
  return explanations[hingeType] || 'Structural transition point';
};

// Override hinge colors for Chapter 6 (different types have different colors)
const getHingeColorOverride = (hingeType?: string): string => {
  const colors: Record<string, string> = {
    'turn-conviction': 'bg-red-500',
    'hinge': 'bg-blue-500',
    'turn-commission': 'bg-yellow-400'
  };
  return hingeType ? colors[hingeType] || 'bg-yellow-400' : 'bg-yellow-400';
};

const viewingModes = [
  { id: 'connections', label: 'Seeing Connections' },
  { id: 'life', label: 'How This Helps My Life' },
  { id: 'teaches', label: 'What This Teaches Us' }
];

function Chapter6() {
  const { data, loading, error } = useChapterData(6);
  const [activeMode, setActiveMode] = useState('connections');
  const [hoveredVerse, setHoveredVerse] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [modalView, setModalView] = useState<'reflections' | 'scripture'>('reflections');
  const [showStructureModal, setShowStructureModal] = useState(false);

  const getCurrentReflection = () => {
    if (!selectedVerse || !data) return '';
    const content = data.reflections[selectedVerse.number];
    if (!content) return '';
    switch (activeMode) {
      case 'connections': return content.seeing;
      case 'life': return content.life;
      case 'teaches': return content.teach;
      default: return content.seeing;
    }
  };

  const hasConnections = (verseNum: number): boolean => {
    if (!data) return false;
    const connection = data.scriptureConnections[verseNum];
    return !!(connection?.from?.length || connection?.to?.length);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading chapter...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Chapter</h2>
          <p className="text-gray-700">{error || 'Failed to load chapter data'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const verses = data.verses || [];
  const uniqueHingeTypes = getUniqueHingeTypes(verses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <ChapterNavigation currentChapter={6} />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{data.subtitle}</p>
          
          {/* Color Legend */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding the Vision Sequence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }, (_, i) => i + 1).map((group) => (
                <div key={group} className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded mt-1 flex-shrink-0 ${getColorClass(group)}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">
                      <span className="text-gray-500 mr-1">{group}.</span>
                      {getGroupName(group)}
                    </div>
                    <div className="text-gray-600 text-xs">{getGroupTransition(group)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <StructureButton 
            onClick={() => setShowStructureModal(true)}
            subtitle={data.structureSubtitle}
          />

          {/* Key Transformation Points */}
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
        </div>

        {/* Verse Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2 mb-8">
          {verses.map((verse) => (
            <div
              key={verse.number}
              className={`relative ${getColorClass(verse.group)} text-white rounded-lg p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg min-h-[80px] flex items-center justify-center ${
                hoveredVerse === verse.number ? 'ring-4 ring-yellow-300' : ''
              } ${selectedVerse?.number === verse.number ? 'ring-4 ring-white' : ''}`}
              onMouseEnter={() => setHoveredVerse(verse.number)}
              onMouseLeave={() => setHoveredVerse(null)}
              onClick={() => {
                setSelectedVerse(verse);
                setModalView('reflections');
              }}
            >
              <div className="text-sm font-bold">6:{verse.number}</div>
              {verse.isHinge && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${getHingeColorOverride(verse.hingeType)} rounded-full animate-pulse`}></div>
              )}
              
              {/* Hover Tooltip */}
              {hoveredVerse === verse.number && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-800 text-white p-3 rounded-lg shadow-xl z-50 text-sm">
                  <div className="font-semibold text-yellow-300 mb-1">Isaiah 6:{verse.number}</div>
                  <div className="text-gray-100 mb-2">{verse.text}</div>
                  <div className="text-xs text-yellow-300 mb-1">{getGroupName(verse.group)}</div>
                  <div className="text-xs text-gray-300">{getGroupTransition(verse.group)}</div>
                  {verse.isHinge && (
                    <div className="text-xs text-yellow-300 mt-1 flex items-center gap-1">
                      <div className={`w-2 h-2 ${getHingeColorOverride(verse.hingeType)} rounded-full`}></div>
                      Key Turning Point
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Modal */}
        {selectedVerse && data.reflections[selectedVerse.number] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden modal-content flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Isaiah 6:{selectedVerse.number} - {getGroupName(selectedVerse.group)}
                  </h3>
                  <button
                    onClick={() => setSelectedVerse(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 italic">{selectedVerse.text}</p>
                </div>

                {/* Main Tab Navigation */}
                <div className="flex gap-2 border-b border-gray-200 -mb-px">
                  <button
                    onClick={() => setModalView('reflections')}
                    className={`px-4 py-2 font-medium transition-all ${
                      modalView === 'reflections'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Reflections
                  </button>
                  {hasConnections(selectedVerse.number) && (
                    <button
                      onClick={() => setModalView('scripture')}
                      className={`px-4 py-2 font-medium transition-all ${
                        modalView === 'scripture'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Scripture Connections
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {modalView === 'reflections' && (
                  <div>
                    {/* Viewing Mode Buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {viewingModes.map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setActiveMode(mode.id)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            activeMode === mode.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>

                    {/* Reflection Content */}
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {getCurrentReflection()}
                      </p>
                    </div>
                  </div>
                )}

                {modalView === 'scripture' && (
                  <div>
                    {(() => {
                      const connection = data.scriptureConnections[selectedVerse.number];
                      if (!connection) return null;

                      return (
                        <div className="space-y-6">
                          {connection.from && connection.from.length > 0 && (
                            <div>
                              <h4 className="font-bold text-lg text-gray-800 mb-3">
                                Building Upon (Earlier Scripture)
                              </h4>
                              <ul className="space-y-2">
                                {connection.from.map((ref, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">→</span>
                                    <span className="text-gray-700">{ref}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {connection.to && connection.to.length > 0 && (
                            <div>
                              <h4 className="font-bold text-lg text-gray-800 mb-3">
                                Pointing Forward (Later Scripture)
                              </h4>
                              <ul className="space-y-2">
                                {connection.to.map((ref, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">→</span>
                                    <span className="text-gray-700">{ref}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {connection.context && (
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                              <h4 className="font-bold text-gray-800 mb-2">Context</h4>
                              <p className="text-gray-700">{connection.context}</p>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Structure Modal */}
        <Chapter6StructureModal 
          show={showStructureModal}
          onClose={() => setShowStructureModal(false)}
        />
      </div>
    </div>
  );
}

export default Chapter6;
