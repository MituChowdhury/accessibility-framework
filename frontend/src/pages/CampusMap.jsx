import React from 'react';
import AccessibleMap from '../components/AccessibleMap';

const Campus = () => {
    return (
        <section
            aria-labelledby="campus-heading"
            className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-10 flex flex-col  md:flex-row items-center md:items-start gap-20 bg-white"
        >
            {/* Accessible Map */}
            <div className="md:w-2/3 w- w-full">
                <AccessibleMap />
            </div>

            {/* Campus Info */}
            <div className="md:w-1/3 w-full text-center md:text-left space-y-8">
                <div>
                    <h2
                        id="campus-heading"
                        className="text-3xl font-bold md:text-4xl font-heading  mb-4 text-gray-900"
                    >
                        Visit Our Campus!
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-body">
                        Discover the wonders of our campus.                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900">
                        Campus Hours
                    </h3>
                    <ul className="text-base text-gray-600 font-body leading-relaxed list-disc list-inside">
                        <li>Sunday to Thursday: 8:00 AM – 8:00 PM</li>
                        <li>Friday-Saturday: Closed</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900">
                        Campus Location
                    </h3>
                    <address className="not-italic text-base text-gray-600 font-body leading-relaxed mb-2">
                        Shahjalal University of Science & Technology,<br />
                        Sylhet, Bangladesh
                    </address>
                    <p className="text-base text-gray-600 font-body leading-relaxed">
                        Phone:{' '}
                        <a href="tel:+880821713376" className="text-blue-600 hover:underline">
                            +880 821 713376
                        </a>
                        <br />
                        Fax: +880 821 715473
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Campus;
