import React, { useState, useEffect, useRef } from "react";

const ImpactCounter = ({ targetValue, duration = 2, showPlus = false }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const counterRef = useRef(null); // Reference to the counter element

  useEffect(() => {
    const counterElement = counterRef.current;

    // Set up IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the element is in the viewport
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting();
            observer.unobserve(counterElement); // Stop observing after animation starts
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    // Observe the counter element
    if (counterElement) {
      observer.observe(counterElement);
    }

    // Clean up the observer on component unmount
    return () => {
      if (counterElement) {
        observer.unobserve(counterElement);
      }
    };
  }, []);

  const startCounting = () => {
    let start = 0;
    const end = targetValue;
    const range = end - start;
    const increment = range / (duration * 60); // Assuming 60fps (60 frames per second)

    const step = () => {
      start += increment;
      if (start < end) {
        setCurrentValue(Math.ceil(start)); // Update the number
        requestAnimationFrame(step); // Call next frame
      } else {
        setCurrentValue(end); // Ensure it ends at the target value
      }
    };
    step();
  };

  return (
    // <div ref={counterRef} className='text-4xl font-bold'>
    <div
      ref={counterRef}
      className='text-xl font-bold mr-2 text-primary-500 md:text-3xl lg:text-4xl'>
      {currentValue.toLocaleString()} {showPlus && "+"}
    </div>
  );
};

export default ImpactCounter;
