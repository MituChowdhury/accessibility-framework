import React from 'react'
import { useEffect, useState } from 'react';

const AccessibilityMenu = () => {
    // State for menu and settings
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    // Content states
    const [textSize, setTextSize] = useState("normal"); // normal | medium | large
    const [readableFont, setReadableFont] = useState(false);
    const [stopAnimations, setStopAnimations] = useState(false);

    // Color states
    const [highContrast, setHighContrast] = useState(false);
    const [invertColors, setInvertColors] = useState(false);
    const [grayscale, setGrayscale] = useState(false);

    // Navigation states
    const [highlightLinks, setHighlightLinks] = useState(false);

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("accessibilitySettings"));

        if (savedSettings) {
            setTextSize(savedSettings.textSize || "normal");
            setReadableFont(savedSettings.readableFont || false);
            setStopAnimations(savedSettings.stopAnimations || false);
            setHighContrast(savedSettings.highContrast || false);
            setInvertColors(savedSettings.invertColors || false);
            setGrayscale(savedSettings.grayscale || false);
            setHighlightLinks(savedSettings.highlightLinks || false);
        }
        setSettingsLoaded(true);
    }, []);

    useEffect(() => {
        if (!settingsLoaded) return
        localStorage.setItem("accessibilitySettings", JSON.stringify({
            textSize,
            readableFont,
            stopAnimations,
            highContrast,
            invertColors,
            grayscale,
            highlightLinks
        }));
    }, [
        settingsLoaded,
        textSize,
        readableFont,
        stopAnimations,
        highContrast,
        invertColors,
        grayscale,
        highlightLinks
    ]);


    // Apply/remove classes on <body>
    useEffect(() => {

        if (!settingsLoaded) return
        const body = document.querySelector('.accessible-content');

        // Remove all classes we use
        body.classList.remove(
            "text-md",
            "text-lg",
            "font-readable",
            "stop-animations",
            "high-contrast",
            "invert-colors",
            "grayscale",
            "highlight-links",
        );


        // Add classes based on state
        if (textSize === "medium") body.classList.add("text-md");
        else if (textSize === "large") body.classList.add("text-lg");

        if (readableFont) body.classList.add("font-readable");

        if (stopAnimations) body.classList.add("stop-animations");

        if (highContrast) body.classList.add("high-contrast");
        if (invertColors) body.classList.add("invert-colors");
        if (grayscale) body.classList.add("grayscale");

        if (highlightLinks) body.classList.add("highlight-links");
    }, [
        settingsLoaded,
        textSize,
        readableFont,
        stopAnimations,
        highContrast,
        invertColors,
        grayscale,
        highlightLinks
    ]);

    // Toggle menu open/close
    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Accessibility: close menu on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div>
            {/* Floating Accessibility Button */}
            <button
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-controls="accessibility-menu-panel"
                onClick={toggleMenu}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleMenu();
                    }
                }}
                className="fixed bottom-4 left-4 z-50 rounded-full bg-blue-600 text-white p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                title="Accessibility options"
            >
                <span aria-hidden="true" className="text-xl font-bold">
                    ♿
                </span>
                <span className="sr-only">Toggle accessibility menu</span>
            </button>

            {/* Accessibility Menu Panel */}
            {menuOpen && (
                <aside
                    id="accessibility-menu-panel"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Accessibility options"
                    tabIndex={-1}
                    className="fixed top-4 left-4 z-50 w-80 max-h-[90vh] overflow-y-auto shadow-lg p-4 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500"
                >
                    <h2 className="text-lg font-semibold mb-4">Accessibility Options</h2>

                    {/* Content */}
                    <section aria-labelledby="content-group-label" className="mb-6">
                        <h3 id="content-group-label" className="font-semibold mb-2">
                            Content
                        </h3>
                        {/* Text Size */}
                        <fieldset className="mb-3">
                            <legend className="mb-1 font-medium">Text Size</legend>
                            <div className="flex gap-2">
                                {["normal", "medium", "large"].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setTextSize(size)}
                                        className={`px-3 py-1 rounded border ${textSize === size
                                            ? "border-blue-600 bg-blue-100 text-blue-900"
                                            : "border-gray-300 dark:border-gray-600"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                        aria-pressed={textSize === size}
                                    >
                                        {size.charAt(0).toUpperCase() + size.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        {/* Readable Font */}
                        <div className="flex items-center mb-3">
                            <input
                                type="checkbox"
                                id="readableFont"
                                checked={readableFont}
                                onChange={() => setReadableFont(!readableFont)}
                                className="mr-2"
                            />
                            <label htmlFor="readableFont" className="select-none cursor-pointer">
                                Readable Font
                            </label>
                        </div>

                        {/* Stop Animations */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="stopAnimations"
                                checked={stopAnimations}
                                onChange={() => setStopAnimations(!stopAnimations)}
                                className="mr-2"
                            />
                            <label htmlFor="stopAnimations" className="select-none cursor-pointer">
                                Stop Animations
                            </label>
                        </div>
                    </section>

                    {/* Colors */}
                    <section aria-labelledby="colors-group-label" className="mb-6">
                        <h3 id="colors-group-label" className="font-semibold mb-2">
                            Colors
                        </h3>

                        {/* High Contrast */}
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="highContrast"
                                checked={highContrast}
                                onChange={() => setHighContrast(!highContrast)}
                                className="mr-2"
                            />
                            <label htmlFor="highContrast" className="select-none cursor-pointer">
                                High Contrast
                            </label>
                        </div>

                        {/* Invert Colors */}
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="invertColors"
                                checked={invertColors}
                                onChange={() => setInvertColors(!invertColors)}
                                className="mr-2"
                            />
                            <label htmlFor="invertColors" className="select-none cursor-pointer">
                                Invert Colors
                            </label>
                        </div>

                        {/* Grayscale */}
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="grayscale"
                                checked={grayscale}
                                onChange={() => setGrayscale(!grayscale)}
                                className="mr-2"
                            />
                            <label htmlFor="grayscale" className="select-none cursor-pointer">
                                Grayscale
                            </label>
                        </div>
                    </section>

                    {/* Navigation */}
                    <section aria-labelledby="navigation-group-label" className="mb-4">
                        <h3 id="navigation-group-label" className="font-semibold mb-2">
                            Navigation
                        </h3>

                        {/* Highlight Links */}
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="highlightLinks"
                                checked={highlightLinks}
                                onChange={() => setHighlightLinks(!highlightLinks)}
                                className="mr-2"
                            />
                            <label htmlFor="highlightLinks" className="select-none cursor-pointer">
                                Highlight Links
                            </label>
                        </div>

                    </section>

                    <button
                        onClick={() => {
                            localStorage.removeItem("accessibilitySettings");
                            window.location.reload();
                        }}
                        className="mt-2 w-full rounded bg-gray-700 text-white py-2 font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Reset Settings
                    </button>


                    {/* Close button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="mt-4 w-full rounded bg-red-600 text-white py-2 font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Close
                    </button>
                </aside>
            )}

        </div>
    );
}

export default AccessibilityMenu