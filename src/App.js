// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchSongs } from './services/api';
import SongList from './components/SongList';
import Player from './components/Player';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('For You');
const [backgroundColor, setBackgroundColor] = useState('#181818'); // Default background color


  useEffect(() => {
    const loadSongs = async () => {
      const songsData = await fetchSongs();
      console.log(songsData);
      setSongs(songsData);
      if (songsData.length > 0) {
        setCurrentSong(songsData[0]); // Set the first song as the current song by default
      }
    };
    loadSongs();
  }, []);

useEffect(() => {
  if (currentSong && currentSong.accent) {
    setBackgroundColor(currentSong.accent);
  }
}, [currentSong]);


   // Filtered songs based on search term
  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const getSongsForCurrentTab = () => {
    switch (currentTab) {
      case 'For You':
        return filteredSongs; 
      case 'Top Picks':
        return filteredSongs.filter(song => song.top_track); 
      default:
        return filteredSongs;
    }
  };

  const songsForCurrentTab = getSongsForCurrentTab();

  // Reset the application to the original state
  const resetApp = () => {
    setCurrentTab('For You');
    setSearchTerm('');
    setCurrentSong(songs[0]);
    setBackgroundColor('#181818'); // Reset background color
  };


  return (
    <div className="App" style={{ background: `linear-gradient(${backgroundColor}, #181818)` }}>
      <div className="left-panel">
      <h1 onClick={resetApp} style={{ cursor: 'pointer' }}>GrooveSpot</h1>
        <nav>
          <ul>
            <li
              className={currentTab === 'For You' ? 'active' : ''}
              onClick={() => setCurrentTab('For You')}
            >
              For You
            </li>
            <li
              className={currentTab === 'Top Picks' ? 'active' : ''}
              onClick={() => setCurrentTab('Top Picks')}
            >
              Top Picks
            </li>
          </ul>
        </nav>
        <input type="text" 
        placeholder="Search Song, Artist" 
        value={searchTerm} // Bind input value to searchTerm state
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
        <SongList
          songs={songsForCurrentTab}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
      <div className="right-panel">
        {currentSong && (
          <>
            <h2>{currentSong.name}</h2>
            <p>{currentSong.artist}</p>
            <img src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt={currentSong.name} />
            <Player
              song={currentSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              songs={songsForCurrentTab}
              setCurrentSong={setCurrentSong}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
