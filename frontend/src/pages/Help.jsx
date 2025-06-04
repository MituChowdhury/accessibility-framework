import React, { useState } from 'react';

export default function Help() {
  const [open, setOpen] = useState(false);

  return (
    <section aria-labelledby="help-heading">
      <h2 id="help-heading" className="text-2xl font-semibold">Help Desk</h2>

      <p className="mt-2">If you need assistance, you can chat with our help desk.</p>
      <button onClick={() => setOpen(true)} className="mt-4 px-4 py-2 bg-blue-700 text-white rounded">Open Support Modal</button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="support-title"
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
        >
          <div className="bg-white rounded p-6 w-96 shadow-lg" role="document">
            <h3 id="support-title" className="text-xl font-semibold mb-2">Live Support</h3>
            <p className="mb-4">This is a simulated support modal. In a real app, chat would appear here.</p>
            <button onClick={() => setOpen(false)} className="text-sm bg-red-600 text-white px-3 py-1 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
