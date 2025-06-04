import React, { useEffect, useState, useRef } from 'react';

export default function InteractiveTranscript({ videoRef, src }) {
  const [captions, setCaptions] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);

  const toSeconds = (t) => {
    if (!t) return 0;
    const [h = '0', m = '0', s = '0'] = t.split(':');
    const [sec = '0', ms = '0'] = s.split('.');
    return (
      parseInt(h) * 3600 +
      parseInt(m) * 60 +
      parseInt(sec) +
      parseInt(ms) / 1000
    );
  };

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(src);
        const raw = await res.text();

        const blocks = raw
          .replace(/\r\n/g, '\n')
          .split('\n\n')
          .filter((block) => block.includes('-->'));

        const parsed = blocks.map((block) => {
          const lines = block.trim().split('\n');
          const timeLineIndex = lines.findIndex((l) => l.includes('-->'));
          if (timeLineIndex === -1) return null;
          const noteLine = lines[0].startsWith('NOTE') ? lines[0] : null;
          const [startStr, endStr] = lines[timeLineIndex].split(' --> ');
          const text = lines.slice(timeLineIndex + 1).join(' ');
          return {
            type: noteLine?.includes('Visual') ? 'visual' : 'audio',
            start: toSeconds(startStr.trim()),
            end: toSeconds(endStr.trim()),
            text: text.trim(),
          };
        }).filter(Boolean);

        setCaptions(parsed);
      } catch (err) {
        console.error('Failed to load transcript:', err);
      }
    };

    load();
  }, [src]);

  useEffect(() => {
    if (!videoRef?.current) return;
    const vid = videoRef.current;
    const handleTime = () => setCurrentTime(vid.currentTime);
    vid.addEventListener('timeupdate', handleTime);
    return () => vid.removeEventListener('timeupdate', handleTime);
  }, [videoRef]);

  // 🔁 Auto-scroll active line
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const line = activeLineRef.current;
      const offsetTop = line.offsetTop;
      container.scrollTo({
        top: offsetTop - container.clientHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [currentTime]);

  // ⌨️ Keyboard jump support
  const handleKeyDown = (e, startTime) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (videoRef.current) {
        videoRef.current.currentTime = startTime;
      }
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="px-4 py-2 border-b font-semibold">Transcript</div>
      </div>
      <div
        ref={containerRef}
        className="h-[340px] overflow-y-auto p-3 text-sm space-y-2"
        style={{ overscrollBehavior: 'contain' }}
      >
        {captions.length > 0 ? (
          captions.map((c, i) => {
            const isActive = currentTime >= c.start && currentTime <= c.end;
            const baseStyle = 'cursor-pointer rounded p-2 transition';
            const typeStyle = c.type === 'visual'
              ? 'bg-pink-100 text-pink-900'
              : 'bg-blue-100 text-blue-900';
            const inactiveStyle = 'hover:bg-gray-100';

            return (
              <div
                key={i}
                ref={isActive ? activeLineRef : null}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = c.start;
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, c.start)}
                className={`${baseStyle} ${isActive ? `${typeStyle} font-semibold` : inactiveStyle}`}
                tabIndex={0}
                role="button"
                aria-label={`Jump to ${formatTime(c.start)}: ${c.text}`}
              >
                <span className="text-gray-500 mr-2">[{formatTime(c.start)}]</span>
                {c.text}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">Transcript not available or failed to load.</p>
        )}
      </div>
    </div>
  );
}


