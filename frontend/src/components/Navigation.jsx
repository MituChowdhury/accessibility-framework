import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700" role="navigation" aria-label="Main navigation">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/sust-logo.png" className="h-8" alt="SUST logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SUST</span>
        </Link>

        {/* Mobile toggle button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="primary-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle main menu"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Navigation menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="primary-navigation">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            <li>
              <Link to="/admission" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                Admission
              </Link>
            </li>

            {/* Dropdown Menu */}
            <li className="relative">
              <button
                type="button"
                id="dropdownNavbarButton"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-controls="dropdownNavbar"
                aria-haspopup="true"
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Dropdown
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                </svg>
              </button>

              {/* Dropdown Panel */}
              <div
                id="dropdownNavbar"
                role="menu"
                aria-label="Dropdown menu"
                className={`absolute z-10 mt-2 w-44 rounded-lg shadow bg-white dark:bg-gray-700 ${dropdownOpen ? 'block' : 'hidden'}`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownNavbarButton">
                  <li><Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</Link></li>
                  <li><Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</Link></li>
                  <li><Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</Link></li>
                </ul>
                <div className="py-1">
                  <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" role="menuitem">Sign out</Link>
                </div>
              </div>
            </li>

            <li>
              <Link to="/results" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700">
                Result
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/faq" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation