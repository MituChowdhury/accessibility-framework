import React from 'react';

export default function Results() {
  return (
    <section aria-labelledby="results-heading">
      <h2 id="results-heading" className="text-2xl font-semibold">Academic Results</h2>

      <p className="mt-2">Download your accessible academic transcripts in OCR-friendly format.</p>
      <ul className="mt-4 list-disc ml-5 text-blue-700 underline">
        <li><a href="/results_sem1_accessible.pdf" download>Semester 1 Transcript (Accessible PDF)</a></li>
        <li><a href="/results_sem2_accessible.pdf" download>Semester 2 Transcript (Accessible PDF)</a></li>
      </ul>

      <table className="mt-6 w-full border" aria-describedby="results-summary">
        <caption className="text-sm mb-2">Recent semester grades</caption>
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Course</th>
            <th className="p-2 text-left">Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="p-2">CSE101</td><td className="p-2">A</td></tr>
          <tr><td className="p-2">ECO110</td><td className="p-2">B+</td></tr>
        </tbody>
      </table>
    </section>
  );
}
