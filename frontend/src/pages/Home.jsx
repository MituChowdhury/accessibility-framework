import React, { useRef, useState, useEffect } from 'react';
import AccessibleCarousel from '../components/AccessibleCarousel';
import CampusOverview from '../components/CampusOverview';
import Programs from '../components/Programs';

export default function Home() {
  return (
    <main>
      <section aria-labelledby="carousel-section" className="relative">
        <h2 id="carousel-section" className="sr-only">University Carousel</h2>
        <AccessibleCarousel />
      </section>

      <section aria-labelledby="introduction-section" className='relative'>
        <h2 id="introduction-section" className="sr-only">Campus Overview With Introductory Video</h2>
        <CampusOverview />
      </section>

      <section aria-labelledby="programs-section" className='relative'>
        <h2 id="programs-section" className="sr-only">University Programs</h2>
        <Programs />
      </section>
    </main>
  );
}

