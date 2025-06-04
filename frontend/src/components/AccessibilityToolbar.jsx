import React from 'react';

export default function AccessibilityToolbar({ toggleContrast, zoomIn, zoomOut }) {
  return (
    <div className="fixed top-0 right-0 z-50 p-2 bg-gray-200 text-sm rounded-bl-md shadow">
      <button onClick={toggleContrast} className="mr-2 px-2 py-1 bg-blue-700 text-white rounded">Contrast</button>
      <button onClick={zoomIn} className="mr-2 px-2 py-1 bg-green-700 text-white rounded">A+</button>
      <button onClick={zoomOut} className="px-2 py-1 bg-red-700 text-white rounded">A-</button>
    </div>
  );
}
