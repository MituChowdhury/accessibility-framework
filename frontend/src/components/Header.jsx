import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-blue-800 text-white p-4" role="banner">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Inclusive University Portal</h1>
        <button className="text-white flex items-center" aria-label="Login">
          <FaSignInAlt className="mr-2" aria-hidden="true" /> Login
        </button>
      </div>
    </header>
  );
}
