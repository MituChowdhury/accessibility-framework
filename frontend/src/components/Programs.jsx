import React from "react";
import { Link } from "react-router-dom";

const programs = [
    {
        name: "Computer Science & Engineering",
        slug: "cse",
        description:
            "Explore software development, algorithms, and systems with a cutting-edge curriculum.",
        image: (
            <svg
                className="w-12 h-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                />
            </svg>
        ),
    },
    {
        name: "Software Engineering",
        slug: "swe",
        description:
            "Learn to design, build, and maintain large-scale software applications.",
        image: (
            <svg
                className="w-12 h-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16h8M8 12h8M8 8h8"
                />
            </svg>
        ),
    },
    {
        name: "Architecture",
        slug: "arc",
        description:
            "Develop skills to design sustainable, innovative, and functional spaces.",
        image: (
            <svg
                className="w-12 h-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 6h18M3 14h18"
                />
            </svg>
        ),
    },
    {
        name: "Civil Engineering",
        slug: "civil",
        description:
            "Master the principles of infrastructure, construction, and environment.",
        image: (
            <svg
                className="w-12 h-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16h16M4 12h16M4 8h16"
                />
            </svg>
        ),
    },
    {
        name: "Chemical Engineering",
        slug: "chemical",
        description:
            "Explore chemical processes and their applications in industries.",
        image: (
            <svg
                className="w-12 h-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 2"
                />
            </svg>
        ),
    },
    {
        name: "Industrial & Production Engineering",
        slug: "ipe",
        description:
            "Learn to optimize production processes and improve operational efficiency.",
        image: (
            <svg
                className="w-12 h-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth={2}
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12h10" />
            </svg>
        ),
    },
];

export default function ProgramsGrid() {
    return (
        <section
            role="region"
            aria-labelledby="programs-heading"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >

            <h2
                id="programs-heading"
                className="text-3xl font-bold text-gray-900 mb-10 text-center"
            >
                Undergraduate Programs
            </h2>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map(({ name, slug, description, image }) => (
                    <article
                        key={slug}
                        className="flex flex-col border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-indigo-600"
                        tabIndex="-1"
                    >
                        <div className="mb-4">{image}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
                        <p className="text-gray-600 flex-grow">{description}</p>
                        <Link
                            to={{
                                pathname: `/admission/${slug}`,
                            }}
                            className="mt-6 inline-block self-start px-5 py-2 bg-gray-800 text-white rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-blue-600"
                            aria-label={`Apply now for ${name}`}
                        >
                            Apply Now
                        </Link>

                    </article>
                ))}
            </div>
        </section>
    );
}
