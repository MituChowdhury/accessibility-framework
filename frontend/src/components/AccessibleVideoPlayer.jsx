import React, { useRef, useState, useEffect } from "react";
import InteractiveTranscript from "./InteractiveTranscript";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaForward,
  FaBackward,
  FaUndo,
  FaClosedCaptioning,
  FaUniversalAccess,
  FaExpand,
  FaPager,
  FaPage4
} from "react-icons/fa";

export default function AccessibleVideoPlayer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const speechRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [ccEnabled, setCcEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [descriptionPriority, setDescriptionPriority] = useState(false);
  const [currentVisualCue, setCurrentVisualCue] = useState(null);
  const [visualCues, setVisualCues] = useState([]);

  const toSeconds = (t) => {
    const [h = "0", m = "0", s = "0"] = t.split(":");
    const [sec = "0", ms = "0"] = s.split(".");
    return (
      parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000
    );
  };

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (!showDescription) return;
    fetch("/welcome-combined.vtt")
      .then((res) => res.text())
      .then((vtt) => {
        const cues = vtt
          .split("\n\n")
          .filter((b) => b.includes("-->") && b.includes("NOTE Visual"))
          .map((block) => {
            const [note, time, ...rest] = block.trim().split("\n");
            const [start, end] = time.split(" --> ").map(toSeconds);
            return {
              start,
              end,
              text: rest.join(" ")
            };
          });
        setVisualCues(cues);
      });
  }, [showDescription]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !descriptionPriority || visualCues.length === 0) return;

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const cue = visualCues.find(
        (c) => current >= c.start && current < c.end
      );
      if (!cue || cue === currentVisualCue) return;

      setCurrentVisualCue(cue);
      const remainingTime = cue.end - current;

      const speak = new SpeechSynthesisUtterance(cue.text);
      speechRef.current = speak;
      window.speechSynthesis.cancel();
      video.pause();
      setIsPlaying(false);
      window.speechSynthesis.speak(speak);

      setTimeout(() => {
        if (video.currentTime >= cue.end && window.speechSynthesis.speaking) {
          video.pause();
        }
      }, remainingTime * 1000);

      speak.onend = () => {
        setCurrentVisualCue(null);
        if (video.paused && video.currentTime >= cue.end) {
          video.play();
          setIsPlaying(true);
        }
      };
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [descriptionPriority, visualCues, currentVisualCue]);

  useEffect(() => {
    const handleKeydown = (e) => {
      const isFullscreen = !!document.fullscreenElement;
      if (e.code === "Space" && isFullscreen) {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === "Escape" && isFullscreen) {
        document.exitFullscreen();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress(video.currentTime);
      setDuration(video.duration || 0);
    };
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const restartVideo = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const skipTime = (sec) => {
    videoRef.current.currentTime += sec;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video.volume > 0) {
      video.volume = 0;
      setVolume(0);
      setMuted(true);
    } else {
      video.volume = 1;
      setVolume(1);
      setMuted(false);
    }
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    videoRef.current.volume = newVol;
    setVolume(newVol);
    setMuted(newVol === 0);
  };

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const index = speeds.indexOf(playbackRate);
    const next = speeds[(index + 1) % speeds.length];
    videoRef.current.playbackRate = next;
    setPlaybackRate(next);
  };

  const toggleCaptions = () => {
    const tracks = videoRef.current?.textTracks;
    if (tracks?.length > 0) {
      const track = tracks[0];
      track.mode = ccEnabled ? "disabled" : "showing";
      setCcEnabled(!ccEnabled);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) =>
        console.error("Fullscreen failed", err)
      );
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="max-w-4xl mx-auto p-4" ref={containerRef}>
      <div className="relative bg-black rounded overflow-hidden">
        <video
          ref={videoRef}
          className="w-full"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              togglePlay();
            }
          }}
          aria-label="Campus introduction video"
        >
          <source src="/welcome.mp4" type="video/mp4" />
          <track kind="captions" src="/welcome-descriptions.vtt" label="English Captions" />
        </video>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
          aria-label="Video progress"
          className="w-full h-1 bg-gray-300 appearance-none accent-blue-500 focus:outline-none"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(progress / duration) * 100}%, #e5e7eb ${(progress / duration) * 100}%, #e5e7eb 100%)`,
          }}
        />

        {/* Controls */}
        <div className="bg-black text-white flex justify-between items-center px-3 py-2 text-sm">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>
            <button onClick={restartVideo} title="Restart">
              <FaUndo size={18} />
            </button>
            <button onClick={() => skipTime(-10)} title="Rewind">
              <FaBackward size={18} />
            </button>
            <button onClick={() => skipTime(10)} title="Forward">
              <FaForward size={18} />
            </button>

            <div className="relative flex items-center">
              <button onClick={toggleMute} title="Volume">
                {muted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
              {showVolumeSlider && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="ml-2 h-1 w-24 accent-white bg-gray-500 rounded-lg outline-none"
                  aria-label="Volume slider"
                  onBlur={() => setShowVolumeSlider(false)}
                />
              )}
              <span className="ml-2 text-xs text-white">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={changeSpeed}>{playbackRate}x</button>
            <button onClick={toggleCaptions}>
              <FaClosedCaptioning className={ccEnabled ? "text-yellow-300" : ""} size={18} />
            </button>
            <button
              onClick={() => setDescriptionPriority(!descriptionPriority)}
              title="Toggle Description Priority"
              aria-label="Description Priority"
            >
              <FaPage4 className={descriptionPriority ? "text-yellow-300" : ""} size={18} />
            </button>
            <button onClick={() => setShowTranscript(!showTranscript)}>
              <FaPager className={showTranscript ? "text-yellow-300" : ""} size={18} />
            </button>
            <button onClick={() => setShowDescription(!showDescription)}>
              <FaUniversalAccess className={showDescription ? "text-yellow-300" : ""} size={18} />
            </button>
            <button onClick={toggleFullscreen}>
              <FaExpand size={18} />
            </button>
          </div>
        </div>
      </div>

      {showTranscript && (
        <div
          className="absolute top-10 right-6 z-50 w-[320px] h-[400px] overflow-hidden mt-4 border rounded p-3 bg-white text-sm shadow"
          role="region"
          aria-label="Transcript panel"
        >
          <InteractiveTranscript
            videoRef={videoRef}
            src={showDescription ? "/welcome-combined.vtt" : "/welcome-captions.vtt"}
            autoScroll
            highlightDescriptions
          />
        </div>
      )}
    </div>
  );
}
