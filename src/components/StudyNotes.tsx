import { useState, useEffect } from 'react'
import { studyNotes, isaiah6Verses } from '../data/isaiah6'
import './StudyNotes.css'

interface Props {
  selectedVerse: number | null
}

function StudyNotes({ selectedVerse }: Props) {
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (selectedVerse !== null) {
      setExpandedNotes(prev => new Set([...prev, selectedVerse]))
    }
  }, [selectedVerse])

  const toggleNote = (verse: number) => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(verse)) {
        newSet.delete(verse)
      } else {
        newSet.add(verse)
      }
      return newSet
    })
  }

  const groupedNotes = studyNotes.reduce((acc, note) => {
    if (!acc[note.verse]) {
      acc[note.verse] = []
    }
    acc[note.verse].push(note)
    return acc
  }, {} as Record<number, typeof studyNotes>)

  return (
    <div className="study-notes">
      <div className="notes-header">
        <h2>Study Notes & Commentary</h2>
        <p>Deep insights into the text, context, and meaning</p>
      </div>

      <div className="notes-container">
        {Object.entries(groupedNotes).map(([verseNum, notes]) => {
          const verse = isaiah6Verses.find(v => v.number === parseInt(verseNum))
          const isExpanded = expandedNotes.has(parseInt(verseNum))
          
          return (
            <div 
              key={verseNum}
              className={`note-section ${isExpanded ? 'expanded' : ''} ${
                selectedVerse === parseInt(verseNum) ? 'highlighted' : ''
              }`}
            >
              <div 
                className="note-header"
                onClick={() => toggleNote(parseInt(verseNum))}
              >
                <div className="verse-preview">
                  <span className="note-verse-num">Verse {verseNum}</span>
                  {verse && (
                    <span className="note-verse-text">
                      "{verse.text.substring(0, 80)}..."
                    </span>
                  )}
                </div>
                <button className="expand-btn">
                  {isExpanded ? '−' : '+'}
                </button>
              </div>

              {isExpanded && (
                <div className="note-content">
                  {notes.map((note, index) => (
                    <div key={index} className="note-card">
                      <h4>{note.title}</h4>
                      <p>{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="study-tips">
        <h3>Study Tips</h3>
        <ul>
          <li>Read the entire chapter multiple times to understand the flow</li>
          <li>Pay attention to the progression: vision → conviction → cleansing → commission</li>
          <li>Consider how this chapter relates to other biblical themes of holiness and calling</li>
          <li>Reflect on your own response to God's holiness and call</li>
        </ul>
      </div>
    </div>
  )
}

export default StudyNotes
