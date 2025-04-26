
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoSrc?: string;
  previewImgSrc?: string;
  title?: string;
  className?: string;
}

const VideoPlayer = ({ videoSrc, previewImgSrc, title, className }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === playerRef.current
      );
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  useEffect(() => {
    return () => {
      if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
    };
  }, [hideControlsTimeout]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      await playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      await document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    
    setHideControlsTimeout(timeout);
  };

  const VolumeIcon = isMuted 
    ? VolumeX 
    : volume > 0.5 
      ? Volume2 
      : Volume1;

  return (
    <div 
      ref={playerRef}
      className={cn("relative overflow-hidden rounded-md bg-black", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Placeholder or Video */}
      {videoSrc ? (
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover" 
          poster={previewImgSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img 
          src={previewImgSrc || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?&auto=format&fit=crop&w=1280"}
          alt={title || "Video preview"} 
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <div className="flex items-center mb-2">
          <input 
            type="range"
            className="w-full accent-netflix-red cursor-pointer h-1 rounded-full appearance-none bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-netflix-red"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={seek}
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="text-white">
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} />
              )}
            </button>
            <button className="text-white">
              <SkipBack size={20} />
            </button>
            <button className="text-white">
              <SkipForward size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white">
                <VolumeIcon size={20} />
              </button>
              <input 
                type="range"
                className="w-20 accent-white cursor-pointer h-1 rounded-full appearance-none bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
              />
            </div>
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={toggleFullscreen} className="text-white">
              {isFullscreen ? (
                <Minimize size={20} />
              ) : (
                <Maximize size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
