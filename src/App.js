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

  useEffect(() => {
    const loadSongs = async () => {
      const songsData = await fetchSongs();
      setSongs(songsData);
      if (songsData.length > 0) {
        setCurrentSong(songsData[0]); // Set the first song as the current song by default
      }
    };
    loadSongs();
  }, []);

  return (
    <div className="App">
      <div className="left-panel">
        <h1>Spotify</h1>
        <nav>
          <ul>
            <li>For You</li>
            <li>Top Tracks</li>
          </ul>
        </nav>
        <input type="text" placeholder="Search Song, Artist" />
        <SongList
          songs={songs}
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
            <Player song={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
