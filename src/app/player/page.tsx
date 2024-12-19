"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BackIcon from "@/components/icons/BackIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayVideoIcon from "@/components/icons/PlayVideoIcon";

const VideoPlayerPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const videoUrl = searchParams.get("videoUrl") || "";
  const coverImgUrl = searchParams.get("coverImgUrl") || "";
  const title = searchParams.get("title") || "";

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
    <div className="w-full h-screen bg-black p-4">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => router.back()}
          className="text-white hover:text-gray-300 lg:ml-52"
        >
          <BackIcon/>
        </button>
      </div>
      <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${coverImgUrl})`,
            filter: "blur(20px)",
          }}
        />

        <div className="relative w-full h-[100%] md:h-full flex flex-col">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onClick={handlePlayPause}
            autoPlay= {true}
          />

          {/* Controls - Always visible and positioned below video */}
          <div className="absolute bottom-0 left-0 right-0 p-4 max-w-full md:max-w-[70%] mx-auto">
            <div className="flex flex-col gap-2">
              <div className="text-white text-lg font-medium">{title}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-gray-300"
                >
                  {isPlaying ? (
                    <PauseIcon/>
                  ) : (
                    <PlayVideoIcon/>
                  )}
                </button>
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
                <span className="text-white text-sm">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;