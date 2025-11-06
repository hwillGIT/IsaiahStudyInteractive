import { useState } from 'react'
import './App.css'
import Isaiah6Text from './components/Isaiah6Text'
import ThemeExplorer from './components/ThemeExplorer'
import StudyNotes from './components/StudyNotes'

function App() {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'text' | 'themes' | 'notes'>('text')

  return (
    <div className="app">
      <header className="header">
        <h1>Isaiah 6: Interactive Study</h1>
        <p className="subtitle">Explore the Vision of the Lord's Glory</p>
      </header>

      <nav className="nav-tabs">
        <button 
          className={`tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Scripture
        </button>
        <button 
          className={`tab ${activeTab === 'themes' ? 'active' : ''}`}
          onClick={() => setActiveTab('themes')}
        >
          Themes
        </button>
        <button 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Study Notes
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'text' && (
          <Isaiah6Text 
            selectedVerse={selectedVerse} 
            onVerseSelect={setSelectedVerse} 
          />
        )}
        {activeTab === 'themes' && (
          <ThemeExplorer onVerseSelect={setSelectedVerse} />
        )}
        {activeTab === 'notes' && (
          <StudyNotes selectedVerse={selectedVerse} />
        )}
      </main>
    </div>
  )
}

export default App
