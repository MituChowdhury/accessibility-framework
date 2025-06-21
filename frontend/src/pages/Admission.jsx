import React from 'react';
import AccessibleForm from '../components/AccessibleForm';

export default function Admission() {
  return (
    <section aria-labelledby="admission-heading">
      <h2 id="admission-heading" className="text-2xl font-semibold">University Admission Form</h2>

      <AccessibleForm />
    </section>
  );
}
