import React from 'react';

export default function Courses() {
  return (
    <section aria-labelledby="courses-heading">
      <h2 id="courses-heading" className="text-2xl font-semibold">Course Catalog</h2>
      <p className="mt-2 mb-4">Browse available courses with screen-reader and keyboard-friendly filters.</p>

      <label htmlFor="department" className="block text-sm font-medium">Department</label>
      <select id="department" className="mt-1 border p-2 w-full">
        <option>All</option>
        <option>Computer Science</option>
        <option>Economics</option>
      </select>

      <table className="mt-6 w-full border" aria-describedby="table-desc">
        <caption className="text-sm mb-2">List of undergraduate courses</caption>
        <thead>
          <tr className="bg-gray-200">
            <th scope="col" className="p-2 text-left">Course Code</th>
            <th scope="col" className="p-2 text-left">Title</th>
            <th scope="col" className="p-2 text-left">Credits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">CSE101</td>
            <td className="p-2">Intro to Programming</td>
            <td className="p-2">3</td>
          </tr>
          <tr>
            <td className="p-2">ECO110</td>
            <td className="p-2">Microeconomics</td>
            <td className="p-2">3</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
