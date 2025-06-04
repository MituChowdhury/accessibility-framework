import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-sm text-center p-4 mt-10" role="contentinfo">
      <p>&copy; 2025 Inclusive University Portal. All rights reserved.</p>
      <nav aria-label="Footer links">
        <ul className="flex justify-center gap-4 mt-2">
          <li><a href="/sitemap" className="underline">Sitemap</a></li>
          <li><a href="/accessibility" className="underline">Accessibility Policy</a></li>
        </ul>
      </nav>
    </footer>
  );
}
