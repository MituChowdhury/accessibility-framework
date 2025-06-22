import React, { useRef, useState, useEffect } from "react";
import InteractiveTranscript from "./InteractiveTranscript";

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function VolumeUpIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <path d="M3 9v6h4l5 5V4L7 9H3z" />
      <path d="M16.5 12a4.5 4.5 0 010 0z" />
      <path d="M16.5 8a7 7 0 010 8" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

function VolumeMuteIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <path d="M16.5 12a4.5 4.5 0 010 0z" />
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9v6h4l5 5V4L7 9H3z" />
    </svg>
  );
}

function RestartIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path d="M1 4v6h6" /> {/* Arrow */}
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36" /> {/* Circular part */}
    </svg>
  );
}


function BackwardIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <polygon points="19 20 9 12 19 4 19 20" />
      <line x1="5" y1="19" x2="5" y2="5" />
    </svg>
  );
}

function ForwardIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}

function MoreOptionsIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function CaptionsIcon({ active = false }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke={active ? "#FBBF24" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <path d="M10 10h-3a2 2 0 000 4h3" />
      <path d="M17 10h-3a2 2 0 000 4h3" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className={`w-5 h-5`}
    >
      <path d="M8 3H5a2 2 0 00-2 2v3" />
      <path d="M16 3h3a2 2 0 012 2v3" />
      <path d="M8 21H5a2 2 0 01-2-2v-3" />
      <path d="M16 21h3a2 2 0 002-2v-3" />
    </svg>
  );
}

export default function AccessibleVideoPlayer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const lastTimeRef = useRef(0);
  const openPaneRef = useRef(null);
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
  const [showAccessibilityOptions, setShowAccessibilityOptions] = useState(false);


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
    function handleClickOutside(event) {
      if (
        openPaneRef.current &&
        !openPaneRef.current.contains(event.target)
      ) {
        setShowVolumeSlider(false)
        setShowAccessibilityOptions(false)
      }
    }

    if (showVolumeSlider || showAccessibilityOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeSlider, showAccessibilityOptions]);


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
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      if (tracks.length > 0) {
        tracks[0].mode = ccEnabled ? "showing" : "disabled";
      }
    }
  }, [ccEnabled]);

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
    setShowVolumeSlider(!showVolumeSlider);
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
    setSpokenCues(new Set());
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
    <div className="max-w-4xl mx-auto w-full" ref={containerRef}>
      <div className="relative bg-black rounded overflow-hidden w-full">
        <video
          ref={videoRef}
          className="w-full h-full"
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
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(progress / duration) * 100
              }%, #e5e7eb ${(progress / duration) * 100}%, #e5e7eb 100%)`,
          }}
          aria-label="Video progress"
        />

        {/* Controls */}
        <div
          className="
            flex flex-nowrap gap-1
            justify-between items-center
            bg-black text-white px-3 py-2 text-sm
            select-none
          "
          style={{ minHeight: "44px" }}
        >
          <div className="flex items-center gap-1 flex-wrap flex-shrink-0">
            <button
              onClick={togglePlay}
              title="Play/Pause"
              aria-label="Play or pause video"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              onClick={() => {
                videoRef.current.currentTime = 0;
              }}
              title="Restart"
              aria-label="Restart video"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
            >
              <RestartIcon />
            </button>

            <button
              onClick={() => {
                videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
              }}
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
            >
              <BackwardIcon />
            </button>

            <button
              onClick={() => {
                videoRef.current.currentTime = Math.min(
                  videoRef.current.duration,
                  videoRef.current.currentTime + 10
                );
              }}
              title="Forward 10 seconds"
              aria-label="Forward 10 seconds"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
            >
              <ForwardIcon />
            </button>

            {/* Volume */}
            <div ref={openPaneRef} className="relative flex items-center">
              <button
                onClick={toggleMute}
                title="Mute/Unmute"
                aria-label="Volume control"
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
              >
                {muted || volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
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

              <span className="ml-2 text-xs tabular-nums">
                {formatTime(progress)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-1 flex-wrap flex-shrink-0">
            <button
              onClick={() => {
                const next = playbackRate >= 1.5 ? 0.75 : parseFloat((playbackRate + 0.25).toFixed(2));
                setPlaybackRate(next);
                if (videoRef.current) videoRef.current.playbackRate = next;
              }}
              title="Playback Speed"
              aria-label="Change playback speed"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 hover:bg-gray-700"
            >
              {playbackRate}x
            </button>

            <button
              onClick={() => setCcEnabled(!ccEnabled)}
              title="Toggle Captions"
              aria-label="Toggle captions"
              className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700 ${ccEnabled ? "text-yellow-400" : ""
                }`}
            >
              <CaptionsIcon active={ccEnabled} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowAccessibilityOptions(!showAccessibilityOptions)}
                title="Accessibility Options"
                aria-label="Accessibility settings"
                aria-expanded={showAccessibilityOptions}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
              >
                <MoreOptionsIcon />
              </button>

              {showAccessibilityOptions && (
                <div
                  ref={openPaneRef}
                  className="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-50 text-xs border border-gray-600"
                  role="menu"
                  aria-label="Accessibility Options Panel"
                >
                  {/* Transcript */}
                  <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-700 rounded-t">
                    <span>Transcript</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTranscript}
                        onChange={() => setShowTranscript(!showTranscript)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-gray-600 peer-checked:bg-blue-500 rounded-full peer-focus:ring-2 ring-blue-400 transition duration-300"></div>
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
                    </label>
                  </div>

                  {/*Speech Caption*/}
                  <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-700">
                    <span>Audio Caption</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showDescription}
                        onChange={() => setShowDescription(!showDescription)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-gray-600 peer-checked:bg-blue-500 rounded-full peer-focus:ring-2 ring-blue-400 transition duration-300"></div>
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
                    </label>
                  </div>

                  {/*Audio Description*/}
                  <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-700 rounded-b">
                    <span>Audio Description</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={descriptionPriority}
                        onChange={() => setDescriptionPriority(!descriptionPriority)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-gray-600 peer-checked:bg-blue-500 rounded-full peer-focus:ring-2 ring-blue-400 transition duration-300"></div>
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>





            {/* <button
              onClick={() => setDescriptionPriority(!descriptionPriority)}
              title="Description Priority Mode"
              aria-label="Toggle description priority mode"
              className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700 ${
                descriptionPriority ? "text-yellow-400" : ""
              }`}
            >
              <DescriptionIcon active={descriptionPriority} />
            </button>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              title="Transcript Panel"
              aria-label="Toggle transcript panel"
              className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700 ${
                showTranscript ? "text-yellow-400" : ""
              }`}
            >
              <TranscriptIcon active={showTranscript} />
            </button>

            <button
              onClick={() => setShowDescription(!showDescription)}
              title="Audio Description Mode"
              aria-label="Toggle audio descriptions"
              className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700 ${
                showDescription ? "text-yellow-400" : ""
              }`}
            >
              <DescriptionIcon active={showDescription} />
            </button> */}

            <button
              onClick={() => containerRef.current?.requestFullscreen()}
              title="Fullscreen"
              aria-label="Toggle fullscreen"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 hover:bg-gray-700"
            >
              <FullscreenIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Panel */}
      {showTranscript && (
        <div
          className="absolute z-30 max-w-[320px] w-[90vw] h-[400px] overflow-hidden mt-4 border rounded p-3 bg-white text-sm shadow right-4 bottom-4 md:bottom-auto md:top-4"
          role="region"
          aria-label="Transcript panel"
        >
          <InteractiveTranscript
            videoRef={videoRef}
            src={showDescription ? "/welcome-combined.vtt" : "/welcome-captions.vtt"}
            setShowTranscript={setShowTranscript}
            autoScroll
            highlightDescriptions
          />
        </div>
      )}
    </div>
  );
}
