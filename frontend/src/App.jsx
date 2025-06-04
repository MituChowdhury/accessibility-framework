import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navigation from './components/Navigation';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Admission from './pages/Admission';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Results from './pages/Results';
import FAQ from './pages/FAQ';
import Help from './pages/Help';
import Feedback from './pages/Feedback';

export default function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  const toggleContrast = () => {
    setHighContrast(!highContrast);
    setStatusMessage(highContrast ? "Normal contrast enabled" : "High contrast enabled");
  };
  const zoomIn = () => {
    setFontScale(prev => Math.min(prev + 0.1, 2));
    setStatusMessage("Zoomed in");
  };
  const zoomOut = () => {
    setFontScale(prev => Math.max(prev - 0.1, 0.8));
    setStatusMessage("Zoomed out");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'c') toggleContrast();
      if (e.altKey && e.key === '1') zoomIn();
      if (e.altKey && e.key === '0') zoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Router>
      <div className={`min-h-screen font-sans transition-all ${highContrast ? 'bg-black text-yellow-100' : 'bg-white text-black'}`} style={{ fontSize: `${fontScale}em` }}>
        <div aria-live="polite" className="sr-only">{statusMessage}</div>

        <AccessibilityToolbar toggleContrast={toggleContrast} zoomIn={zoomIn} zoomOut={zoomOut} />
        <a href="#main" className="sr-only focus:not-sr-only absolute left-2 top-2 bg-blue-600 text-white p-2 rounded z-50">Skip to main content</a>

        <Header />
        <Navigation />

        <main id="main" className="p-6 space-y-10" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/results" element={<Results />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<Help />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
