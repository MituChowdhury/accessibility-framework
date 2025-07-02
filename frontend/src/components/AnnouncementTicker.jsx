import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

const AnnouncementTicker = () => {
  const [stopAnimation, setStopAnimation] = useState(false);
  const tickerRef = useRef(null);

  // Observe for 'stop-animations'
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const shouldStop = document.querySelector('.accessible-content').classList.contains('stop-animations');
      setStopAnimation(shouldStop);
    });

    observer.observe(document.querySelector('.accessible-content'), {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Initial check
    setStopAnimation(document.querySelector('.accessible-content').classList.contains('stop-animations'));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="w-full bg-gradient-to-r from-sky-50 to-sky-100 border border-sky-200 rounded-md shadow-sm py-2 px-4 flex items-center overflow-hidden relative mt-6 mb-6"
      role="region"
      aria-label="University Announcements"
    >

      {/* Ticker Text */}
      <div
        ref={tickerRef}
        className={clsx(
          "whitespace-nowrap",
          stopAnimation ? "" : "animate-ticker"
        )}
      >
        <p className="text-sky-800 text-sm md:text-base font-medium">
          📣 New Admission Notice: Admission for the 2024-25 academic year at Shahjalal University of Science and Technology is open now. Apply before the deadline!
        </p>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
