import React, { useRef, useState, useEffect } from 'react';
import AccessibleVideoPlayer from '../components/AccessibleVideoPlayer';

export default function Home() {

  return (
    <main className="p-6">
      <section className="relative max-w-4xl mx-auto mt-10" aria-labelledby="video-section">
        <h2 id="video-section" className="sr-only">Welcome Video with Captions</h2>
          <AccessibleVideoPlayer />
      </section>
    </main>
  );
}

