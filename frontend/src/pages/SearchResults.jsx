import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get('q');

  // Define actual content paths with descriptive keywords
  const siteContent = [
    {
      label: 'Home',
      path: '/',
      keywords: 'university overview carousel welcome video homepage'
    },
    {
      label: 'Admission',
      path: '/admission',
      keywords: 'admission process apply online undergraduate graduate application deadline'
    },
    {
      label: 'Results',
      path: '/results',
      keywords: 'exam results grades transcript academic performance'
    },
    {
      label: 'Profile',
      path: '/profile',
      keywords: 'student profile personal information dashboard account settings'
    },
    {
      label: 'FAQ',
      path: '/faq',
      keywords: 'frequently asked questions help support guide common issues'
    },
  ];

  const matched = siteContent.filter(item =>
    item.label.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    item.keywords.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <main className="p-6 max-w-4xl mx-auto" aria-labelledby="search-results-heading">
      <h1 id="search-results-heading" className="text-2xl font-bold mb-4">
        Search Results for "{searchTerm}"
      </h1>
      {searchTerm ? (
        matched.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {matched.map((result, index) => (
              <li key={index}>
                <a href={result.path} className="text-blue-700 underline hover:text-blue-900">
                  {result.label}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No matching pages found.</p>
        )
      ) : (
        <p className="text-gray-600">Please enter a search query.</p>
      )}
    </main>
  );
}
