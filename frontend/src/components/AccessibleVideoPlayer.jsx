import React, { useRef, useState, useEffect } from "react";
import InteractiveTranscript from "./InteractiveTranscript";
import {
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute,
  FaForward, FaBackward, FaUndo, FaClosedCaptioning,
  FaUniversalAccess, FaExpand, FaPager, FaPage4
} from "react-icons/fa";

export default function AccessibleVideoPlayer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [descriptionPriority, setDescriptionPriority] = useState(false);
  const [ccEnabled, setCcEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [visualCues, setVisualCues] = useState([]);
  const [spokenCues, setSpokenCues] = useState(new Set());

  const toSeconds = (t) => {
    const [h = "0", m = "0", s = "0"] = t.split(":");
    const [sec = "0", ms = "0"] = s.split(".");
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000;
  };

  const formatTime = (t) => {
    const min = Math.floor(t / 60);
    const sec = Math.floor(t % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (!(descriptionPriority || showDescription)) return;
    const loadDescriptions = async () => {
      try {
        const res = await fetch("/welcome-combined.vtt");
        const raw = await res.text();
        const cues = raw
          .replace(/\r\n/g, "\n")
          .split("\n\n")
          .filter((b) => b.includes("NOTE Visual") && b.includes("-->"))
          .map((block) => {
            const lines = block.trim().split("\n");
            const [startStr, endStr] = lines[1].split(" --> ");
            const text = lines.slice(2).join(" ");
            return { start: toSeconds(startStr), end: toSeconds(endStr), text };
          });
        setVisualCues(cues);
        setSpokenCues(new Set()); // Reset spoken cue state on load
      } catch (err) {
        console.error("Failed to load descriptions", err);
      }
    };
    loadDescriptions();
  }, [descriptionPriority, showDescription]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !descriptionPriority) return;

    const handleTimeUpdate = () => {
      const now = video.currentTime;

      // Detect backward seeking and reset spoken cues
      if (now < lastTimeRef.current) {
        setSpokenCues(new Set()); // Reset all spoken cues
      }
      lastTimeRef.current = now;

      for (const cue of visualCues) {
        const cueId = `${cue.start}-${cue.end}`;
        if (now >= cue.start && now <= cue.end && !spokenCues.has(cueId)) {
          video.pause();
          setIsPlaying(false);
          window.speechSynthesis.cancel();

          const utter = new SpeechSynthesisUtterance(cue.text);
          window.speechSynthesis.speak(utter);
          const newSpoken = new Set(spokenCues);
          newSpoken.add(cueId);
          setSpokenCues(newSpoken);

          const cueEndsAt = cue.end;
          const check = setTimeout(() => {
            if (video.currentTime >= cueEndsAt && window.speechSynthesis.speaking) {
              video.pause();
              setIsPlaying(false);
            }
          }, (cueEndsAt - now) * 1000);

          utter.onend = () => {
            clearTimeout(check);
            if (video.paused && !window.speechSynthesis.speaking) {
              video.play();
              setIsPlaying(true);
            }
          };

          break; // only handle one cue at a time
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [descriptionPriority, visualCues, spokenCues]);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      setProgress(video.currentTime);
      setDuration(video.duration || 0);
    };
    const end = () => setIsPlaying(false);
    video.addEventListener("timeupdate", update);
    video.addEventListener("ended", end);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("ended", end);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const newVol = v.volume > 0 ? 0 : 1;
    v.volume = newVol;
    setMuted(newVol === 0);
    setVolume(newVol);
    setShowVolumeSlider(true);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setMuted(vol === 0);
  };

  const handleProgressChange = (e) => {
    const t = parseFloat(e.target.value);
    videoRef.current.currentTime = t;
    setProgress(t);
    setSpokenCues(new Set()); // 🟡 reset spoken cues when seeking
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlay();
    }
  };

  useEffect(() => {
    const handleKeydown = (e) => {
      const isFullscreen = !!document.fullscreenElement;

      if (e.code === "Space" && isFullscreen) {
        e.preventDefault(); // prevent page scroll or other defaults
        togglePlay();
      }

      if (e.code === "Escape" && isFullscreen) {
        document.exitFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isPlaying]);

  return (
    <div className="max-w-4xl mx-auto p-4" ref={containerRef}>
      <div className="relative bg-black rounded overflow-hidden">
        <video
          ref={videoRef}
          className="w-full"
          tabIndex={0}
          onClick={togglePlay}
          onKeyDown={handleKeyDown}
          aria-label="Accessible campus welcome video"
        >
          <source src="/welcome.mp4" type="video/mp4" />
          <track kind="captions" src="/welcome-combined.vtt" label="Captions" />
        </video>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 accent-blue-500 bg-gray-300 appearance-none focus:outline-none"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress / duration * 100}%, #e5e7eb ${progress / duration * 100}%, #e5e7eb 100%)`
          }}
          aria-label="Video progress"
        />

        {/* Controls */}
        <div className="flex justify-between items-center bg-black text-white px-3 py-2 text-sm">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} title="Play/Pause" aria-label="Play or pause video">
              {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>
            <button onClick={() => (videoRef.current.currentTime = 0)} title="Restart" aria-label="Restart video">
              <FaUndo size={18} />
            </button>
            <button onClick={() => (videoRef.current.currentTime -= 10)} title="Rewind 10s" aria-label="Rewind 10 seconds">
              <FaBackward size={18} />
            </button>
            <button onClick={() => (videoRef.current.currentTime += 10)} title="Forward 10s" aria-label="Forward 10 seconds">
              <FaForward size={18} />
            </button>

            {/* Volume */}
            <div className="relative flex items-center">
              <button onClick={toggleMute} title="Mute/Unmute" aria-label="Volume control">
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
                />
              )}
              <span className="ml-2 text-xs">{formatTime(progress)} / {formatTime(duration)}</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = playbackRate >= 1.5 ? 0.75 : parseFloat((playbackRate + 0.25).toFixed(2));
                setPlaybackRate(next);
                if (videoRef.current) videoRef.current.playbackRate = next;
              }}
              title="Playback Speed"
              aria-label="Change playback speed"
            >
              {playbackRate}x
            </button>

            <button onClick={() => setCcEnabled(!ccEnabled)} title="Toggle Captions" aria-label="Toggle captions">
              <FaClosedCaptioning size={18} className={ccEnabled ? "text-yellow-300" : ""} />
            </button>
            <button onClick={() => setDescriptionPriority(!descriptionPriority)} title="Description Priority Mode" aria-label="Toggle description priority mode">
              <FaPage4 size={18} className={descriptionPriority ? "text-yellow-300" : ""} />
            </button>
            <button onClick={() => setShowTranscript(!showTranscript)} title="Transcript Panel" aria-label="Toggle transcript panel">
              <FaPager size={18} className={showTranscript ? "text-yellow-300" : ""} />
            </button>
            <button onClick={() => setShowDescription(!showDescription)} title="Audio Description Mode" aria-label="Toggle audio descriptions">
              <FaUniversalAccess size={18} className={showDescription ? "text-yellow-300" : ""} />
            </button>
            <button onClick={() => containerRef.current?.requestFullscreen()} title="Fullscreen" aria-label="Toggle fullscreen">
              <FaExpand size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Panel */}
      {showTranscript && (
        <div className="absolute top-10 right-6 z-50 w-[320px] h-[400px] overflow-hidden mt-4 border rounded p-3 bg-white text-sm shadow" role="region" aria-label="Transcript panel">
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
