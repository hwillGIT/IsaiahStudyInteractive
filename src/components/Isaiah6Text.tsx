import { useState } from 'react'
import { isaiah6Verses } from '../data/isaiah6'
import './Isaiah6Text.css'

interface Props {
  selectedVerse: number | null
  onVerseSelect: (verse: number | null) => void
}

function Isaiah6Text({ selectedVerse, onVerseSelect }: Props) {
  const [highlightedKeyword, setHighlightedKeyword] = useState<string | null>(null)

  const handleVerseClick = (verseNum: number) => {
    if (selectedVerse === verseNum) {
      onVerseSelect(null)
    } else {
      onVerseSelect(verseNum)
    }
  }

  const handleKeywordClick = (keyword: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (highlightedKeyword === keyword) {
      setHighlightedKeyword(null)
    } else {
      setHighlightedKeyword(keyword)
    }
  }

  const highlightText = (text: string, keywords: string[]) => {
    if (!highlightedKeyword) return text

    const regex = new RegExp(`\\b(${highlightedKeyword})\\w*\\b`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => {
      if (part.toLowerCase().includes(highlightedKeyword.toLowerCase())) {
        return <mark key={index} className="highlight">{part}</mark>
      }
      return part
    })
  }

  return (
    <div className="isaiah-text">
      <div className="chapter-header">
        <h2>Isaiah Chapter 6</h2>
        <p className="instruction">Click on verses to explore keywords and themes</p>
      </div>

      <div className="verses-container">
        {isaiah6Verses.map((verse) => (
          <div
            key={verse.number}
            className={`verse ${selectedVerse === verse.number ? 'selected' : ''} ${
              highlightedKeyword && verse.keywords.includes(highlightedKeyword) ? 'keyword-highlight' : ''
            }`}
            onClick={() => handleVerseClick(verse.number)}
          >
            <span className="verse-number">{verse.number}</span>
            <span className="verse-text">
              {highlightText(verse.text, verse.keywords)}
            </span>
            
            {selectedVerse === verse.number && (
              <div className="keywords-panel">
                <h4>Key Themes in This Verse:</h4>
                <div className="keywords">
                  {verse.keywords.map((keyword) => (
                    <button
                      key={keyword}
                      className={`keyword-tag ${highlightedKeyword === keyword ? 'active' : ''}`}
                      onClick={(e) => handleKeywordClick(keyword, e)}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {highlightedKeyword && (
        <div className="keyword-info">
          <p>
            Highlighting: <strong>{highlightedKeyword}</strong>
          </p>
          <button onClick={() => setHighlightedKeyword(null)} className="clear-btn">
            Clear Highlight
          </button>
        </div>
      )}
    </div>
  )
}

export default Isaiah6Text
