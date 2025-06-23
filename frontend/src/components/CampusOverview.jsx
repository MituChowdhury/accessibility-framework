import React from "react";
import AccessibleVideoPlayer from "./AccessibleVideoPlayer"; // or adjust path as needed


const CampusOverview = () => {
    return (
        <section
            aria-labelledby="intro-heading"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center md:items-start gap-10"
        >

            {/* Left: Introduction Text */}
            <div className="md:w-1/2">
                <h2
                    id="intro-heading"
                    className="text-3xl font-bold mb-4 text-gray-900"
                >
                    Welcome to Shahjalal Univeristy of Science & Technology        </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We are SUST — a place where tradition and technology blend
                    to foster a culture of curiosity, innovation, and inclusion.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                    From advanced laboratories to serene green spaces, every corner is
                    designed to support your growth and discovery. Join us on a journey
                    through our vibrant academic environment and community.
                </p>
            </div>

            {/* Right: Accessible Video Player */}
            <div className="md:w-1/2 w-full">
                <AccessibleVideoPlayer />
            </div>
        </section>
    );
}

export default CampusOverview

