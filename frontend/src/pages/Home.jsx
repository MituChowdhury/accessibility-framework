import React from 'react';
import AccessibleCarousel from '../components/AccessibleCarousel';
import AnnouncementTicker from '../components/AnnouncementTicker';
import CampusOverview from '../components/CampusOverview';
import Programs from '../components/Programs';
import CampusMap from '../components/CampusMap';

export default function Home() {
  return (
    <main>
      <section aria-labelledby="carousel-section" className="relative">
        <h2 id="carousel-section" className="sr-only">University Carousel</h2>
        <AccessibleCarousel />
      </section>

      <section aria-labelledby="announcement-section" className="relative">
        <h2 id="announcement-section" className="sr-only">University Announcements</h2>
        <AnnouncementTicker />
      </section>


      <section aria-labelledby="introduction-section" className="relative">
        <h2 id="introduction-section" className="sr-only">Campus Overview With Introductory Video</h2>
        <CampusOverview />
      </section>

      <section aria-labelledby="programs-section" className="relative">
        <h2 id="programs-section" className="sr-only">University Programs</h2>
        <Programs />
      </section>

      <section aria-labelledby="campus-section" className="relative">
        <h2 id="campus-section" className="sr-only">Campus Map</h2>
        <CampusMap />
      </section>
    </main>
  );
}
