import React from 'react';
import { FaHome, FaClipboardList, FaUserAlt, FaQuestionCircle, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav role="navigation" aria-label="Main navigation" className="bg-blue-100 p-3">
      <ul className="flex flex-wrap gap-4 text-blue-900 font-medium">
        <li>
          <Link to="/" className="flex items-center gap-1 underline">
            <FaHome aria-hidden="true" /> Home
          </Link>
        </li>
        <li>
          <Link to="/admission" className="flex items-center gap-1 underline">
            <FaClipboardList aria-hidden="true" /> Admission
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center gap-1 underline">
            <FaUserAlt aria-hidden="true" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/faq" className="flex items-center gap-1 underline">
            <FaQuestionCircle aria-hidden="true" /> FAQ
          </Link>
        </li>
        <li>
          <Link to="/results" className="flex items-center gap-1 underline">
            <FaChartBar aria-hidden="true" /> Results
          </Link>
        </li>
      </ul>
    </nav>
  );
}
