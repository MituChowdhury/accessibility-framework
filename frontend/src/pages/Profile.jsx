import React, { useState } from 'react';

export default function Profile() {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <section aria-labelledby="profile-heading">
      <h2 id="profile-heading" className="text-2xl font-semibold">Edit Student Profile</h2>

      <form className="space-y-6 mt-4">
        <div>
          <label htmlFor="upload" className="block text-sm font-medium">Profile Photo</label>
          <input id="upload" type="file" accept="image/*" onChange={handleImageChange} className="mt-1" />
          {preview && <img src={preview} alt="Preview of profile" className="mt-3 max-h-48 rounded" />}
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium">Mobile Number</label>
          <input id="mobile" name="mobile" type="tel" required className="mt-1 w-full border p-2" />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <textarea id="address" name="address" rows="3" required className="mt-1 w-full border p-2" />
        </div>

        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </section>
  );
}
