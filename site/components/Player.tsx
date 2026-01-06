import React, { useState, useRef } from 'react';
import { formatDuration } from '@/lib/duration';

interface PlayerProps {
  audioUrl?: string;
  title: string;
  onClose?: () => void;
}

export default function Player({ audioUrl, title, onClose }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle play/pause toggle
  const handlePlayToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlayToggle();
    }
  };

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Update duration when loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle play end
  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - bounds.left) / bounds.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  if (!audioUrl) {
    return (
      <div className="rounded-lg bg-gray-100 p-6 text-center">
        <p className="text-gray-600">Audio not available for this episode.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg bg-gray-50 p-6 shadow-md"
      role="region"
      aria-label={`Player for ${title}`}
      aria-live="polite"
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Title */}
      <h3 className="mb-4 text-lg font-semibold text-dark">{title}</h3>

      {/* Play/Pause Button */}
      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={handlePlayToggle}
          onKeyDown={handleKeyDown}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95"
        >
          {isPlaying ? (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.75 1.5A.75.75 0 005 2.25v15.5a.75.75 0 001.5 0V2.25A.75.75 0 005.75 1.5zm8.5 0a.75.75 0 00-.75.75v15.5a.75.75 0 001.5 0V2.25a.75.75 0 00-.75-.75z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
        </button>

        {/* Time Display */}
        <div className="flex items-center gap-2 text-sm font-medium text-dark">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <span className="text-gray-400">/</span>
          <span>{formatDuration(Math.floor(duration))}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        onClick={handleProgressClick}
        className="mb-4 cursor-pointer"
        role="slider"
        aria-label="Timeline"
        aria-valuenow={Math.floor(currentTime)}
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
      >
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-300">
          <div
            className="h-full bg-accent transition-all"
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
            }}
          />
        </div>
      </div>

      {/* Controls */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close player"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center font-medium text-dark transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Close
        </button>
      )}
    </div>
  );
}

