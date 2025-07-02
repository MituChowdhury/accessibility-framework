import React, { useEffect, useRef, useState } from 'react';

const slides = [
    { image: "/uni_gate.jpg", alt: 'University Gate Ariel View' },
    { image: "/shaheed_minar.jpg", alt: 'Shaheed Minar' },
    { image: "/grafitti.jpg", alt: 'Satyan Sultan Chottor Mural' }
];

const AccessibleCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [stopAnimation, setStopAnimation] = useState(false);
    const viewportRef = useRef(null);
    const intervalRef = useRef(null);

    const goToSlide = (index) => {
        const newIndex = (index + slides.length) % slides.length;
        setCurrent(newIndex);
    };

    // Observe body class for 'stop-animations'
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const shouldStop = document.querySelector('.accessible-content').classList.contains('stop-animations');
            setStopAnimation(shouldStop);
        });

        observer.observe(document.querySelector('.accessible-content'), {
            attributes: true,
            attributeFilter: ['class'],
        });

        // Set initial state
        setStopAnimation(document.querySelector('.accessible-content').classList.contains('stop-animations'));

        return () => observer.disconnect();
    }, []);

    // Autoplay logic
    useEffect(() => {
        if (stopAnimation) {
            clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000); // change slide every 5 seconds

        return () => clearInterval(intervalRef.current);
    }, [stopAnimation]);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (viewport) {
            viewport.scrollTo({ left: viewport.offsetWidth * current, behavior: 'smooth' });
        }
    }, [current]);

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                goToSlide(current - 1);
                break;
            case 'ArrowRight':
                goToSlide(current + 1);
                break;
            case 'Home':
                goToSlide(0);
                break;
            case 'End':
                goToSlide(slides.length - 1);
                break;
        }
    };

    return (
        <section
            className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg lg:h-[500px]"
            aria-roledescription="carousel"
            aria-label="University Campus Carousel"
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${index === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
                        }`}
                    aria-hidden={index !== current}
                >
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}



            {/* Arrows - Only if animation is stopped */}
            {stopAnimation && (
                <>
                    <button
                        onClick={() => goToSlide(current - 1)}
                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                        aria-label="Previous Slide"
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/60 group-focus:ring-4 group-focus:ring-white">
                            <svg
                                className="w-4 h-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </span>
                    </button>

                    <button
                        onClick={() => goToSlide(current + 1)}
                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                        aria-label="Next Slide"
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/60 group-focus:ring-4 group-focus:ring-white">
                            <svg
                                className="w-4 h-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </span>
                    </button>
                </>
            )}

            {/* Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`w-3 h-3 rounded-full ${current === i
                                ? 'bg-blue-600 scale-110 ring-2 ring-blue-400 ring-offset-2'
                                : 'bg-white/70 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={current === i ? 'true' : 'false'}
                    ></button>
                ))}
            </div>
        </section>


        // </section>
    );
}

export default AccessibleCarousel




{/* <Carousel
        autoplay={!stopAnimation}
        loop
        transition={{ duration: 1.2 }}
        className="rounded-none h-[500px]"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`block h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-blue-600 scale-110 ring-2 ring-blue-400 ring-offset-2"
                    : "bg-white/70 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={activeIndex === i ? "true" : "false"}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) =>
          stopAnimation && (
            <IconButton
              variant="filled"
              color="white"
              size="sm"
              onClick={handlePrev}
              className="!absolute top-1/2 left-4 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/80"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-5 w-5 text-white" />
            </IconButton>
          )
        }
        nextArrow={({ handleNext }) =>
          stopAnimation && (
            <IconButton
              variant="filled"
              color="white"
              size="sm"
              onClick={handleNext}
              className="!absolute top-1/2 right-4 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/80"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-5 w-5 text-white" />
            </IconButton>
          )
        }
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel> */}