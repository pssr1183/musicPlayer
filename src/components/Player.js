import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faVolumeUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

function Player({ song, isPlaying, setIsPlaying, songs, setCurrentSong }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1); // 1 is 100% volume

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    const updateProgress = () => {
      const duration = audioElement.duration;
      const currentTime = audioElement.currentTime;
      setProgress((currentTime / duration) * 100);
    };

    audioElement.addEventListener('timeupdate', updateProgress);

    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
    };
  }, [isPlaying, song]);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.volume = volume;
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const width = e.target.clientWidth;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === song.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((s) => s.id === song.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];
    setCurrentSong(previousSong);
    setIsPlaying(true);
  };

  return (
    <div className="player">
      <button>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      <button onClick={handlePrevious}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button onClick={handlePlayPause}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <button onClick={handleNext}>
        <FontAwesomeIcon icon={faForward} />
      </button>
      <div className="progress-bar" onClick={handleProgressClick}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
      <button>
        <FontAwesomeIcon icon={faVolumeUp} />
      </button>
      <audio ref={audioRef} src={song.url} />
    </div>
  );
}

export default Player;
