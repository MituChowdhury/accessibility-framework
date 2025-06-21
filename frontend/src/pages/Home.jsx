import React, { useRef, useState, useEffect } from 'react';
import AccessibleVideoPlayer from '../components/AccessibleVideoPlayer';
import AccessibleCarousel from '../components/AccessibleCarousel';

export default function Home() {
  return (
    <main>
      <section aria-labelledby="carousel-section" className="relative">
        <h2 id="carousel-section" className="sr-only">University Carousel</h2>
        <AccessibleCarousel />
      </section>

      <section className="relative max-w-4xl mx-auto mt-10 p-6" aria-labelledby="video-section">
        <h2 id="video-section" className="sr-only">Welcome Video with Captions</h2>
        <AccessibleVideoPlayer />
      </section>
    </main>
  );
}

