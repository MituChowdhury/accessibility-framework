import React from 'react';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-gray-800 border-gray-700 text-center text-sm p-4"
      role="contentinfo"
    >
      <p className="text-gray-300">&copy; 2025 Demo Accessible University. All rights reserved.</p>
      <nav aria-label="Footer links" className="mt-2">
        <ul className="flex justify-center gap-6">
          <li>
            <a
              href="/sitemap"
              className="text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 underline"
            >
              Sitemap
            </a>
          </li>
          <li>
            <a
              href="/accessibility"
              className="text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 underline"
            >
              Accessibility Policy
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
