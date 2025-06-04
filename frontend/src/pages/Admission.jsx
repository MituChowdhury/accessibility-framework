import React from 'react';

export default function Admission() {
  return (
    <section aria-labelledby="admission-heading">
      <h2 id="admission-heading" className="text-2xl font-semibold">University Admission Form</h2>
      <form className="space-y-6 mt-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
          <input id="name" name="name" type="text" required className="mt-1 w-full border p-2" />
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium">Date of Birth</label>
          <input id="dob" name="dob" type="date" required className="mt-1 w-full border p-2" />
          <button
            type="button"
            onClick={() => document.getElementById('dob').valueAsDate = new Date()}
            className="mt-1 text-blue-600 underline text-sm"
          >
            Jump to today
          </button>
        </div>

        <div>
          <label htmlFor="program" className="block text-sm font-medium">Select Program</label>
          <select id="program" name="program" required className="mt-1 w-full border p-2">
            <option value="">-- Choose Program --</option>
            <option value="cs">BSc in Computer Science</option>
            <option value="eco">BA in Economics</option>
          </select>
        </div>

        <div>
          <label htmlFor="captcha" className="block text-sm font-medium">Enter CAPTCHA</label>
          <input id="captcha" type="text" required className="mt-1 w-full border p-2" />
          <p className="text-xs text-gray-500">CAPTCHA with audio alternative available. <button className="text-blue-700 underline">Play Audio</button></p>
        </div>

        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Submit Application</button>
      </form>
    </section>
  );
}
