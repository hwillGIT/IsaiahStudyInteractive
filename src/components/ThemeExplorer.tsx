import { useState } from 'react'
import { themes, isaiah6Verses } from '../data/isaiah6'
import './ThemeExplorer.css'

interface Props {
  onVerseSelect: (verse: number | null) => void
}

function ThemeExplorer({ onVerseSelect }: Props) {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null)

  const handleThemeClick = (index: number) => {
    if (selectedTheme === index) {
      setSelectedTheme(null)
    } else {
      setSelectedTheme(index)
    }
  }

  return (
    <div className="theme-explorer">
      <div className="theme-header">
        <h2>Major Themes in Isaiah 6</h2>
        <p>Explore the rich theological themes woven throughout this chapter</p>
      </div>

      <div className="themes-grid">
        {themes.map((theme, index) => (
          <div
            key={theme.name}
            className={`theme-card ${selectedTheme === index ? 'expanded' : ''}`}
            onClick={() => handleThemeClick(index)}
            style={{ borderLeftColor: theme.color }}
          >
            <div className="theme-header-content">
              <div 
                className="theme-color-indicator" 
                style={{ backgroundColor: theme.color }}
              />
              <h3>{theme.name}</h3>
            </div>
            
            <p className="theme-description">{theme.description}</p>
            
            <div className="verse-tags">
              {theme.verses.map((verseNum) => (
                <span key={verseNum} className="verse-tag">
                  v. {verseNum}
                </span>
              ))}
            </div>

            {selectedTheme === index && (
              <div className="theme-verses">
                <h4>Related Verses:</h4>
                {theme.verses.map((verseNum) => {
                  const verse = isaiah6Verses.find(v => v.number === verseNum)
                  return verse ? (
                    <div 
                      key={verseNum} 
                      className="theme-verse"
                      onClick={(e) => {
                        e.stopPropagation()
                        onVerseSelect(verseNum)
                      }}
                    >
                      <span className="mini-verse-num">{verseNum}</span>
                      <span className="mini-verse-text">{verse.text}</span>
                    </div>
                  ) : null
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThemeExplorer
