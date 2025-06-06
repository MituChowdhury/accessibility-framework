import React, { useState } from 'react';
import AccessibleMap from '../components/AccessibleMap';

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-semibold">Frequently Asked Questions</h2>

      <div className="mt-4 space-y-3">
        {[{
          q: "How do I apply for admission?",
          a: "Go to the Admission page and fill out the application form with all required fields."
        }, {
          q: "How to access transcripts?",
          a: "Visit the Results section to download accessible PDFs of your transcript."
        }].map((item, idx) => (
          <div key={idx}>
            <button
              aria-expanded={active === idx}
              onClick={() => toggle(idx)}
              className="w-full text-left bg-blue-100 px-4 py-2 rounded"
            >
              {item.q}
            </button>
            <div
              className={`p-4 border ${active === idx ? "block" : "hidden"}`}
              aria-hidden={active !== idx}
            >
              {item.a}
            </div>
          </div>
        ))}
      </div>
      <div>
        <AccessibleMap />
      </div>
    </section>
  );
}
