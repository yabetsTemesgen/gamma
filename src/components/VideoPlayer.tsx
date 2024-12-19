
'use client';
import React, { useRef, useState, useEffect } from 'react';
import PauseIcon from '@/components/icons/PauseIcon';
import PlayVideoIcon from '@/components/icons/PlayVideoIcon';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }:VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset states when src changes
    setCurrentTime(0);
    setDuration(0);
    setIsLoaded(false);

    // Load video metadata
    video.load();
  }, [src]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };
  //volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };
  //Seeking video to specific time
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    try {
      const newTime = parseFloat(e.target.value);
      
      // Check if the time is valid
      if (newTime >= 0 && newTime <= video.duration) {
        video.currentTime = newTime;
        setCurrentTime(newTime);
        
        // If video is paused, we might want to update the frame
        if (video.paused) {
          video.load();
        }
      }
    } catch (error) {
      console.error('Error seeking video:', error);
    }
  };

  const handleSeeking = () => {
    setIsSeeking(true);
  };

  const handleSeeked = () => {
    setIsSeeking(false);
  };

  const updateTime = () => {
    const video = videoRef.current;
    if (!video || isSeeking) return;

    try {
      const newTime = video.currentTime;
      if (!isNaN(newTime)) {
        setCurrentTime(newTime);
      }
    } catch (error) {
      console.error('Error updating time:', error);
    }
  };

  const handleMetadataLoaded = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    setDuration(video.duration);
    setIsLoaded(true);
    console.log('Video metadata loaded:', {
      duration: video.duration,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center md:max-w-4xl md:mx-auto md:min-h-0 md:pt-20">
      <video
        ref={videoRef}
        src={'https://media.w3.org/2010/05/sintel/trailer.mp4'}
        preload="metadata"
        crossOrigin="anonymous"
        onTimeUpdate={updateTime}
        onLoadedMetadata={handleMetadataLoaded}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
        className="w-full h-full object-contain flex-1 bg-black"
      />
      <div className="bg-black text-white flex items-center gap-4 p-2">
        <button
          onClick={togglePlay}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          disabled={!isLoaded}
        >
          {isPlaying ? <PauseIcon /> : <PlayVideoIcon/>}
        </button>

        <div className="flex-1 flex items-center gap-2">
          <span className="hidden sm:inline">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeekChange}
            disabled={!isLoaded}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />
          <span className="hidden sm:inline min-w-[60px]">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-2 mr-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            disabled={!isLoaded}
            className="w-16 sm:w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;