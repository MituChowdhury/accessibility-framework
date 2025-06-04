import React, { useState } from 'react';

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section aria-labelledby="feedback-heading">
      <h2 id="feedback-heading" className="text-2xl font-semibold">Accessibility Feedback</h2>

      {!submitted ? (
        <form className="mt-4 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <fieldset>
            <legend className="block text-sm font-medium">Was this website easy to navigate?</legend>
            <div className="mt-2 space-y-2">
              <label><input type="radio" name="nav" value="yes" /> Yes</label><br />
              <label><input type="radio" name="nav" value="no" /> No</label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="comments" className="block text-sm font-medium">Additional Comments</label>
            <textarea id="comments" name="comments" rows="3" className="mt-1 w-full border p-2" />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Feedback</button>
        </form>
      ) : (
        <div role="status" className="bg-green-100 border border-green-400 p-4 rounded">
          Thank you! Your feedback has been submitted successfully.
        </div>
      )}
    </section>
  );
}
