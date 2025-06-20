import React from 'react'
import { useEffect, useState } from 'react';

const AccessibilityMenu = () => {
  // State for menu and settings
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingsLoaded, setSettingsLoaded] = useState(false);

    // Content states
    const [textSize, setTextSize] = useState("normal"); // normal | medium | large
    const [cursorSize, setCursorSize] = useState("normal"); // normal | large
    const [dyslexicFont, setDyslexicFont] = useState(false);
    const [readableFont, setReadableFont] = useState(false);
    const [stopAnimations, setStopAnimations] = useState(false);

    // Color states
    const [highContrast, setHighContrast] = useState(false);
    const [invertColors, setInvertColors] = useState(false);
    const [grayscale, setGrayscale] = useState(false);
    const [colorFilter, setColorFilter] = useState("none"); // none | rg | by | gr

    // Navigation states
    const [highlightLinks, setHighlightLinks] = useState(false);
    const [readingLine, setReadingLine] = useState(false);
    const [readingMask, setReadingMask] = useState(false);
    const [pageStructureOpen, setPageStructureOpen] = useState(false);

    useEffect(() => {
        const savedSettings = JSON.parse(localStorage.getItem("accessibilitySettings"));

        if (savedSettings) {
            setTextSize(savedSettings.textSize || "normal");
            setCursorSize(savedSettings.cursorSize || "normal");
            setDyslexicFont(savedSettings.dyslexicFont || false);
            setReadableFont(savedSettings.readableFont || false);
            setStopAnimations(savedSettings.stopAnimations || false);
            setHighContrast(savedSettings.highContrast || false);
            setInvertColors(savedSettings.invertColors || false);
            setGrayscale(savedSettings.grayscale || false);
            setColorFilter(savedSettings.colorFilter || "none");
            setHighlightLinks(savedSettings.highlightLinks || false);
            setReadingLine(savedSettings.readingLine || false);
            setReadingMask(savedSettings.readingMask || false);
        }
        setSettingsLoaded(true);
    }, []);

    useEffect(() => {
        if (!settingsLoaded) return
        localStorage.setItem("accessibilitySettings", JSON.stringify({
            textSize,
            cursorSize,
            dyslexicFont,
            readableFont,
            stopAnimations,
            highContrast,
            invertColors,
            grayscale,
            colorFilter,
            highlightLinks,
            readingLine,
            readingMask
        }));
    }, [
        settingsLoaded,
        textSize,
        cursorSize,
        dyslexicFont,
        readableFont,
        stopAnimations,
        highContrast,
        invertColors,
        grayscale,
        colorFilter,
        highlightLinks,
        readingLine,
        readingMask
    ]);


    // Apply/remove classes on <body>
    useEffect(() => {

        if(!settingsLoaded) return
        const body = document.body;

        // Remove all classes we use
        body.classList.remove(
            "text-md",
            "text-lg",
            "cursor-lg",
            "font-dyslexic",
            "font-readable",
            "stop-animations",
            "high-contrast",
            "invert-colors",
            "grayscale",
            "color-filter-rg",
            "color-filter-by",
            "color-filter-gr",
            "highlight-links",
            "reading-line",
            "reading-mask"
        );


        // Add classes based on state
        if (textSize === "medium") body.classList.add("text-md");
        else if (textSize === "large") body.classList.add("text-lg");

        if (cursorSize === "large") body.classList.add("cursor-lg");

        if (dyslexicFont) body.classList.add("font-dyslexic");
        if (readableFont) body.classList.add("font-readable");

        if (stopAnimations) body.classList.add("stop-animations");

        if (highContrast) body.classList.add("high-contrast");
        if (invertColors) body.classList.add("invert-colors");
        if (grayscale) body.classList.add("grayscale");

        if (colorFilter === "rg") body.classList.add("color-filter-rg");
        else if (colorFilter === "by") body.classList.add("color-filter-by");
        else if (colorFilter === "gr") body.classList.add("color-filter-gr");

        if (highlightLinks) body.classList.add("highlight-links");
        if (readingLine) body.classList.add("reading-line");
        if (readingMask) body.classList.add("reading-mask");
    }, [
        settingsLoaded,
        textSize,
        cursorSize,
        dyslexicFont,
        readableFont,
        stopAnimations,
        highContrast,
        invertColors,
        grayscale,
        colorFilter,
        highlightLinks,
        readingLine,
        readingMask,
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

    // Page Structure: headings + landmarks
    const [pageOutline, setPageOutline] = useState({ headings: [], landmarks: [] });

    useEffect(() => {
        if (pageStructureOpen) {
            const headingTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
            const headings = Array.from(document.body.querySelectorAll(headingTags.join(","))).map(
                (el) => ({
                    tag: el.tagName,
                    text: el.textContent,
                    id: el.id,
                    top: el.getBoundingClientRect().top + window.scrollY,
                })
            );

            const landmarkSelectors = [
                '[role="banner"]',
                '[role="navigation"]',
                '[role="main"]',
                '[role="complementary"]',
                '[role="contentinfo"]',
                "header",
                "nav",
                "main",
                "aside",
                "footer",
            ];
            const landmarks = Array.from(document.body.querySelectorAll(landmarkSelectors.join(","))).map(
                (el) => ({
                    tag: el.tagName.toLowerCase(),
                    role: el.getAttribute("role"),
                    text:
                        el.textContent.trim().slice(0, 40) ||
                        el.getAttribute("aria-label") ||
                        el.getAttribute("aria-labelledby") ||
                        "",
                    id: el.id,
                    top: el.getBoundingClientRect().top + window.scrollY,
                })
            );

            setPageOutline({ headings, landmarks });
        }
    }, [pageStructureOpen]);

    // Scroll to element by id
    const handleScrollTo = (id) => {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            el.focus({ preventScroll: true });
        }
    };

    return (
        <>
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
                    className="fixed bottom-16 left-4 z-50 max-w-xs w-80 max-h-[90vh] overflow-y-auto rounded-md bg-white shadow-lg p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                        {/* Cursor Size */}
                        <fieldset className="mb-3">
                            <legend className="font-medium">Cursor Size</legend>
                            <div className="flex gap-2">
                                {["normal", "large"].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setCursorSize(size)}
                                        className={`px-3 py-1 rounded border ${cursorSize === size
                                            ? "border-blue-600 bg-blue-100 text-blue-900"
                                            : "border-gray-300 dark:border-gray-600"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                        aria-pressed={cursorSize === size}
                                    >
                                        {size.charAt(0).toUpperCase() + size.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        {/* Dyslexic Font */}
                        {/* <div className="flex items-center mb-3">
                            <input
                                type="checkbox"
                                id="dyslexicFont"
                                checked={dyslexicFont}
                                onChange={() => setDyslexicFont(!dyslexicFont)}
                                className="mr-2"
                            />
                            <label htmlFor="dyslexicFont" className="select-none cursor-pointer">
                                Dyslexic Font
                            </label>
                        </div> */}

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

                        {/* Color Filters */}
                        <fieldset className="mb-3">
                            <legend className="font-medium mb-1">Color Filters</legend>
                            <div className="flex gap-2">
                                {[
                                    { label: "None", value: "none" },
                                    { label: "Red/Green", value: "rg" },
                                    { label: "Blue/Yellow", value: "by" },
                                    { label: "Green/Red", value: "gr" },
                                ].map(({ label, value }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setColorFilter(value)}
                                        className={`px-3 py-1 rounded border ${colorFilter === value
                                            ? "border-blue-600 bg-blue-100 text-blue-900"
                                            : "border-gray-300 dark:border-gray-600"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                        aria-pressed={colorFilter === value}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
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

                        {/* Reading Line */}
                        {/* <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="readingLine"
                                checked={readingLine}
                                onChange={() => setReadingLine(!readingLine)}
                                className="mr-2"
                            />
                            <label htmlFor="readingLine" className="select-none cursor-pointer">
                                Reading Line
                            </label>
                        </div> */}

                        {/* Reading Mask */}
                        {/* <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="readingMask"
                                checked={readingMask}
                                onChange={() => setReadingMask(!readingMask)}
                                className="mr-2"
                            />
                            <label htmlFor="readingMask" className="select-none cursor-pointer">
                                Reading Mask
                            </label>
                        </div> */}

                        {/* Page Structure */}
                        <button
                            type="button"
                            onClick={() => setPageStructureOpen(!pageStructureOpen)}
                            className="mt-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-expanded={pageStructureOpen}
                        >
                            {pageStructureOpen ? "Hide Page Structure" : "Show Page Structure"}
                        </button>

                        {/* Page Structure Outline */}
                        {pageStructureOpen && (
                            <div
                                className="mt-3 max-h-48 overflow-auto border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-900 text-sm"
                                tabIndex={0}
                            >
                                {/* Headings List */}
                                <strong className="block mb-1">Headings:</strong>
                                <ul className="mb-2 list-disc list-inside">
                                    {pageOutline.headings.length === 0 ? (
                                        <li className="text-gray-500">No headings found</li>
                                    ) : (
                                        pageOutline.headings.map((h, idx) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleScrollTo(h.id)}
                                                    className="text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                >
                                                    {h.tag}: {h.text || "(No text)"}
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>

                                {/* Landmarks List */}
                                <strong className="block mb-1">Landmarks:</strong>
                                <ul className="list-disc list-inside">
                                    {pageOutline.landmarks.length === 0 ? (
                                        <li className="text-gray-500">No landmarks found</li>
                                    ) : (
                                        pageOutline.landmarks.map((l, idx) => (
                                            <li key={idx}>
                                                <button
                                                    onClick={() => handleScrollTo(l.id)}
                                                    className="text-green-700 underline hover:text-green-900 focus:outline-none focus:ring-1 focus:ring-green-500"
                                                >
                                                    {l.role || l.tag}: {l.text || "(No label)"}
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        )}

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

            {/* Tailwind + Custom CSS Classes */}
            <style>{`
        /* Text size */
        body.text-md {
          font-size: 1.125rem; /* 18px */
        }
        body.text-lg {
          font-size: 1.25rem; /* 20px */
        }

        /* Cursor size */
        body.cursor-lg {
          cursor: url("data:image/svg+xml,%3csvg height='32' width='32' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='16' cy='16' r='10' stroke='black' stroke-width='2' fill='white'/%3e%3c/svg%3e") 16 16, auto !important;
        }

        /* Dyslexic font - using OpenDyslexic (you must add the font to your project) */
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/OpenDyslexic-Regular.otf') format('opentype');
        }
        body.font-dyslexic {
          font-family: 'OpenDyslexic', Arial, sans-serif !important;
        }

        /* Readable font */
        body.font-readable {
          font-family: Arial, Helvetica, sans-serif !important;
          letter-spacing: 0.05em;
        }

        /* Stop animations */
        body.stop-animations *, body.stop-animations *::before, body.stop-animations *::after {
          animation-play-state: paused !important;
          transition: none !important;
        }

        /* High contrast */
        body.high-contrast {
          filter: contrast(200%) brightness(120%) !important;
          background-color: black !important;
          color: white !important;
        }

        /* Invert colors */
        body.invert-colors {
          filter: invert(100%) hue-rotate(180deg) !important;
        }

        /* Grayscale */
        body.grayscale {
          filter: grayscale(100%) !important;
        }

        /* Color Filters */
        body.color-filter-rg {
          filter: url('#red-green');
        }
        body.color-filter-by {
          filter: url('#blue-yellow');
        }
        body.color-filter-gr {
          filter: url('#green-red');
        }

        /* Highlight links */
        body.highlight-links a {
          outline: 2px solid #2563eb; /* Tailwind blue-600 */
          outline-offset: 2px;
        }

        /* Reading line */
        body.reading-line {
          background-image: linear-gradient(to bottom, transparent 50%, rgba(37, 99, 235, 0.3) 50%);
          background-size: 100% 2.5em;
          background-repeat: repeat-y;
        }

        /* Reading mask */
        body.reading-mask {
          position: relative;
        }
        body.reading-mask::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.7);
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: multiply;
        }
        body.reading-mask > * {
          position: relative;
          z-index: 9999;
          background: transparent;
        }
      `}</style>

            {/* SVG filters for color filters */}
            <svg style={{ display: "none" }} aria-hidden="true" focusable="false" >
                <filter id="red-green" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="
              1 0 0 0 0
              0 0 1 0 0
              0 1 0 0 0
              0 0 0 1 0"
                    />
                </filter>
                <filter id="blue-yellow" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="
              0 1 0 0 0
              1 0 0 0 0
              0 0 1 0 0
              0 0 0 1 0"
                    />
                </filter>
                <filter id="green-red" colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="
              0 0 1 0 0
              1 1 0 0 0
              0 0 0 1 0
              0 0 0 0 1"
                    />
                </filter>
            </svg>
        </>
    );
}

export default AccessibilityMenu