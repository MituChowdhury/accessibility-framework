import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FormPreview() {
    const { state: formData } = useLocation();
    const navigate = useNavigate();

    if (!formData) {
        return (
            <div className="p-4 max-w-2xl mx-auto">
                <p>No data available for preview.</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Home
                </button>
            </div>
        );
    }

    const handleDownload = () => {
        window.print();
    };

    return (
        <main id="print-section" className="p-4 max-w-3xl mx-auto font-sans">
            <header>
                <h1 className="text-2xl font-bold mb-4">Admission Form Preview</h1>
            </header>

            <section aria-labelledby="personal-info">
                <h2 id="personal-info" className="text-xl font-semibold mt-6 mb-2">Personal Information</h2>
                <dl>
                    <dt className="font-medium">Full Name:</dt>
                    <dd className="mb-1">{formData.fullName}</dd>

                    <dt className="font-medium">Email:</dt>
                    <dd className="mb-1">{formData.email}</dd>

                    <dt className="font-medium">Date of Birth:</dt>
                    <dd className="mb-1">{formData.dob}</dd>

                    <dt className="font-medium">Gender:</dt>
                    <dd className="mb-1">{formData.gender}</dd>

                    <dt className="font-medium">Nationality:</dt>
                    <dd className="mb-1">{formData.nationality}</dd>

                    <dt className="font-medium">Phone:</dt>
                    <dd className="mb-1">{formData.phone}</dd>

                    <dt className="font-medium">Address:</dt>
                    <dd className="mb-1">{formData.presentAddress}</dd>
                </dl>
            </section>

            <section aria-labelledby="academic-info">
                <h2 id="academic-info" className="text-xl font-semibold mt-6 mb-2">Academic Information</h2>
                <dl>
                    <dt className="font-medium">SSC Board:</dt>
                    <dd className="mb-1">{formData.sscBoard}</dd>

                    <dt className="font-medium">SSC Year:</dt>
                    <dd className="mb-1">{formData.sscYear}</dd>

                    <dt className="font-medium">SSC GPA:</dt>
                    <dd className="mb-1">{formData.sscGPA}</dd>

                    <dt className="font-medium">HSC Board:</dt>
                    <dd className="mb-1">{formData.hscBoard}</dd>

                    <dt className="font-medium">HSC Year:</dt>
                    <dd className="mb-1">{formData.hscYear}</dd>

                    <dt className="font-medium">HSC GPA:</dt>
                    <dd className="mb-1">{formData.hscGPA}</dd>
                </dl>
            </section>

            <section aria-labelledby="guardian-info">
                <h2 id="guardian-info" className="text-xl font-semibold mt-6 mb-2">Guardian Information</h2>
                <dl>
                    <dt className="font-medium">Father's Name:</dt>
                    <dd className="mb-1">{formData.fatherName}</dd>

                    <dt className="font-medium">Father's Phone:</dt>
                    <dd className="mb-1">{formData.fatherPhone}</dd>

                    <dt className="font-medium">Mother's Name:</dt>
                    <dd className="mb-1">{formData.motherName}</dd>

                    <dt className="font-medium">Mother's Phone:</dt>
                    <dd className="mb-1">{formData.motherPhone}</dd>
                </dl>
            </section>

            <section aria-labelledby="documents">
                <h2 id="documents" className="text-xl font-semibold mt-6 mb-2">Documents</h2>
                {formData.photo && (
                    <div className="mb-4">
                        <p className="font-medium">Photo:</p>
                        <img
                            src={URL.createObjectURL(formData.photo[0])}
                            alt="Uploaded applicant's passport-size photo"
                            className="mt-1 border rounded max-w-[150px] max-h-[150px]"
                        />
                    </div>
                )}
                {formData.signature && (
                    <div>
                        <p className="font-medium">Signature:</p>
                        <img
                            src={URL.createObjectURL(formData.signature[0])}
                            alt="Uploaded applicant's signature"
                            className="mt-1 border rounded max-w-[150px] max-h-[80px]"
                        />
                    </div>
                )}
            </section>

            <div className="mt-6 flex gap-4 print:hidden">
                <button
                    onClick={handleDownload}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Download as PDF
                </button>
            </div>
        </main>
    );
}
