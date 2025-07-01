import React from 'react';
import AccessibleMap from '../components/AccessibleMap';

const Campus = () => {
    return (
        <section
            aria-labelledby="campus-heading"
            className="w-full py-12 md:py-20 px-4 md:px-10 flex flex-col md:flex-row items-center md:items-start gap-20 bg-white"
        >
            {/* Left: Accessible Map */}
            <div className="md:w-9/12 w-full">
                <AccessibleMap />
            </div>

            {/* Right: Campus Info */}
            <div className="md:w-1/4 w-full text-center md:text-left space-y-8">
                {/* Campus Description */}
                <div>
                    <h2
                        id="campus-heading"
                        className="text-3xl md:text-4xl font-heading font-extrabold mb-4 text-gray-900"
                    >
                        Welcome to SUST!
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-body">
                        We are Shahjalal University of Science & Technology — a place where tradition and technology blend
                        to foster a culture of curiosity, innovation, and inclusion.
                    </p>
                </div>

                {/* Campus Hours */}
                <div>
                    <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900">
                        Campus Hours
                    </h3>
                    <ul className="text-base text-gray-600 font-body leading-relaxed list-disc list-inside">
                        <li>Monday to Friday: 8:00 AM – 8:00 PM</li>
                        <li>Saturday: 9:00 AM – 5:00 PM</li>
                        <li>Sunday: Closed</li>
                    </ul>
                </div>

                {/* Campus Location */}
                <div>
                    <h3 className="text-2xl font-heading font-semibold mb-2 text-gray-900">
                        Campus Location
                    </h3>
                    <address className="not-italic text-base text-gray-600 font-body leading-relaxed mb-2">
                        Shahjalal University of Science & Technology<br />
                        Sylhet, Bangladesh
                    </address>
                    <p className="text-base text-gray-600 font-body leading-relaxed">
                        Phone: <a href="tel:+880821713376" className="text-blue-600 hover:underline">+880 821 713376</a><br />
                        Fax: +880 821 715473
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Campus;
