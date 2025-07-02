import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import AccessibilityMenu from './components/AccessibilityMenu';
import Footer from './components/Footer';

import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import AccessibleForm from './pages/AccessibleForm';
import FormPreview from './pages/FormPreview';

export default function App() {

  return (
    <Router>
      {/* Skip to Main Content link */}
      <a
        href="#introduction-section"
        className="
          fixed top-4 left-1/2 -translate-x-1/2
          z-50
          px-6 py-3 rounded-lg shadow-lg
          bg-blue-600 text-white text-lg font-semibold
          focus:opacity-100 focus:translate-y-0
          opacity-0 -translate-y-4
          transition transform duration-200
        "
      >
        Skip to Main Content
      </a>
      {<AccessibilityMenu />}
      <div className="accessible-content min-h-screen font-sans transition-all bg-white text-black style={{ fontSize: 1em }}">


        <Navigation />

        <main id="main" className="p-16 space-y-10" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admission/:slug" element={<AccessibleForm />} />
            <Route path="/form-preview" element={<FormPreview />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <a
        href="#carousel-section"
        className="
          fixed bottom-4 left-1/2 -translate-x-1/2
          z-50
          px-6 py-3 rounded-lg shadow-lg
          bg-blue-600 text-white text-lg font-semibold
          focus:opacity-100 focus:translate-y-0
          opacity-0 translate-y-4
          transition transform duration-200
        "
      >
        Skip to Top
      </a>
    </Router>
  );
}
