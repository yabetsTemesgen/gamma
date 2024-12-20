"use client";
import { useState, useEffect, useRef } from "react";
import BackIcon from "@/components/icons/BackIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayVideoIcon from "@/components/icons/PlayVideoIcon";
import PlayerIcon from "@/components/icons/PlayerIcon";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onBack: () => void;
}

const VideoPlayer = ({ videoUrl, title, onBack }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const hideControlsTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (isPlaying) {
        timeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    hideControlsTimer();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative w-full h-[100%] md:h-full flex flex-col">
      <div className="absolute top-0 left-0 lg:left-14 z-20">
        <button
          onClick={onBack}
          className="text-white hover:text-gray-300 lg:ml-52"
        >
          <BackIcon />
        </button>
      </div>
      <video
        ref={videoRef}
        className="w-full h-full object-contain rounded-3xl"
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
        autoPlay={true}
      />
      {isSmallScreen && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-gray-300"
          >
            <PlayerIcon className="w-16 h-16" />
          </button>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 max-w-full md:max-w-[80%] lg:max-w-[70%] mx-auto">
        {/* Add your video controls here */}
        <div className="flex flex-col gap-2">
          <div className="text-white text-lg font-medium">{title}</div>
          <div className="flex items-center gap-2">
            {!isSmallScreen && (
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-300"
              >
                {isPlaying ? <PauseIcon /> : <PlayVideoIcon />}
              </button>
            )}
            <span className="text-white text-sm">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 h-1 bg-gray-600 rounded-full">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: `${(currentTime / (duration || 1)) * 100}%`,
                }}
              />
            </div>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
