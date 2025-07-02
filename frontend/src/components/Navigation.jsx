import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

const getLinkClasses = (hash) => {
  const isActive = window.location.hash === hash;
  return `block py-2 pl-3 pr-4 rounded md:p-0 ${
    isActive
      ? 'text-blue-700 font-semibold'
      : 'text-gray-800 hover:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
  }`;
};


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40
    bg-white bg-opacity-90 backdrop-blur-sm
    border-b border-gray-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/sust-logo.png" className="h-10 mr-3" alt="SUST Logo" />
          <span className="self-center text-2xl font-bold text-gray-800 whitespace-nowrap">SUST</span>
        </Link>

        {/* Navigation Links */}
        <div
          className={`items-center justify-center ${mobileOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <a href="#introduction-section" className={getLinkClasses('#introduction-section')}>About</a>
            </li>
            <li>
              <a href="#programs-section" className={getLinkClasses('#programs-section')}>Admission</a>
            </li>
            <li>
              <a href="#campus-section" className={getLinkClasses('#campus-section')}>Campus</a>
            </li>
          </ul>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          className="relative hidden md:block md:order-2"
          aria-label="Site search"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            aria-label="Search site"
          />
        </form>

        {/* Mobile Toggle */}
        <div className="flex md:hidden md:order-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded={mobileOpen}
            aria-label="Toggle main menu"
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
