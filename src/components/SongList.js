// src/components/SongList.js
import React from 'react';

function SongList({ songs, setCurrentSong, currentSong, isPlaying, setIsPlaying }) {
  const handleSongClick = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`song-item ${currentSong && currentSong.id === song.id ? 'active' : ''}`}
          onClick={() => handleSongClick(song)}
        >
          <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
          <div className="song-details">
            <h3>{song.name}</h3>
            <p>{song.artist}</p>
          </div>
          <p>{song.duration}</p> {/* Add duration if available */}
        </div>
      ))}
    </div>
  );
}

export default SongList;
