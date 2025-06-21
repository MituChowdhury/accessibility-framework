import React, { useState } from "react";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  course: "",
  terms: false,
};
const AccessibleForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Validation function with accessible error messages
  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) errs.fullName = "Full Name is required.";

    if (!formData.email.trim()) errs.email = "Email Address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Please enter a valid email address.";

    if (!formData.phone.trim()) errs.phone = "Phone Number is required.";
    else if (!/^\+?[0-9]{7,15}$/.test(formData.phone))
      errs.phone = "Please enter a valid phone number.";

    if (!formData.dob) errs.dob = "Date of Birth is required.";

    if (!formData.gender) errs.gender = "Please select your gender.";

    if (!formData.course) errs.course = "Please select a course.";

    if (!formData.terms) errs.terms = "You must accept the terms and conditions.";

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
      setFormData(initialState);
    }
  };

  const errorKeys = Object.keys(errors);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6">Admission Form</h1>

      {/* Accessible error summary */}
      {errorKeys.length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="mb-5 border border-red-600 bg-red-100 text-red-700 p-4 rounded"
        >
          <p className="font-semibold mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside">
            {errorKeys.map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-describedby="instructions">
        <p
          id="instructions"
          className="mb-6 text-gray-700"
          aria-live="polite"
        >
          Fields marked with <span aria-hidden="true" className="text-red-600">*</span> are required.
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label
            htmlFor="fullName"
            className="block mb-1 font-medium text-gray-900"
          >
            Full Name <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.fullName ? "border-red-600" : "border-gray-300"
            }`}
            autoComplete="name"
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="mt-1 text-red-600 text-sm"
            >
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-900"
          >
            Email Address <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.email ? "border-red-600" : "border-gray-300"
            }`}
            autoComplete="email"
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-1 text-red-600 text-sm"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-gray-900"
          >
            Phone Number <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.phone ? "border-red-600" : "border-gray-300"
            }`}
            placeholder="+8801XXXXXXXXX"
            autoComplete="tel"
          />
          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-1 text-red-600 text-sm"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-5">
          <label
            htmlFor="dob"
            className="block mb-1 font-medium text-gray-900"
          >
            Date of Birth <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.dob ? "true" : "false"}
            aria-describedby={errors.dob ? "dob-error" : undefined}
            className={`w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.dob ? "border-red-600" : "border-gray-300"
            }`}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.dob && (
            <p
              id="dob-error"
              role="alert"
              className="mt-1 text-red-600 text-sm"
            >
              {errors.dob}
            </p>
          )}
        </div>

        {/* Gender */}
        <fieldset className="mb-5 border rounded border-gray-300 p-4">
          <legend className="font-medium mb-3 text-gray-900">
            Gender <span aria-hidden="true" className="text-red-600">*</span>
          </legend>
          <div className="flex gap-6">
            <div>
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={errors.gender ? "true" : "false"}
              />
              <label htmlFor="gender-male" className="ml-2 cursor-pointer">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={errors.gender ? "true" : "false"}
              />
              <label htmlFor="gender-female" className="ml-2 cursor-pointer">
                Female
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="gender-other"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={errors.gender ? "true" : "false"}
              />
              <label htmlFor="gender-other" className="ml-2 cursor-pointer">
                Other
              </label>
            </div>
          </div>
          {errors.gender && (
            <p
              id="gender-error"
              role="alert"
              className="mt-2 text-red-600 text-sm"
            >
              {errors.gender}
            </p>
          )}
        </fieldset>

        {/* Course Selection */}
        <div className="mb-5">
          <label
            htmlFor="course"
            className="block mb-1 font-medium text-gray-900"
          >
            Select Course <span aria-hidden="true" className="text-red-600">*</span>
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.course ? "true" : "false"}
            aria-describedby={errors.course ? "course-error" : undefined}
            className={`w-full rounded border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.course ? "border-red-600" : "border-gray-300"
            }`}
          >
            <option value="">-- Please choose an option --</option>
            <option value="cse">Computer Science & Engineering</option>
            <option value="eee">Electrical Engineering</option>
            <option value="me">Mechanical Engineering</option>
            <option value="ce">Civil Engineering</option>
          </select>
          {errors.course && (
            <p
              id="course-error"
              role="alert"
              className="mt-1 text-red-600 text-sm"
            >
              {errors.course}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="mb-6">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.terms ? "true" : "false"}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            className="focus:ring-2 focus:ring-blue-600"
          />
          <label
            htmlFor="terms"
            className="ml-2 cursor-pointer select-none text-gray-900"
          >
            I accept the{" "}
            <a
              href="/terms"
              className="underline text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              terms and conditions
            </a>{" "}
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          </label>
          {errors.terms && (
            <p
              id="terms-error"
              role="alert"
              className="mt-1 text-red-600 text-sm"
            >
              {errors.terms}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded focus:outline-none focus:ring-4 focus:ring-blue-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default AccessibleForm