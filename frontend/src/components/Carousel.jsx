import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CarouselSlide from "./CarouselSlide";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultStyles = {
    btn: "absolute top-1/2 z-30 text-white text-sm md:text-2xl hover:text-primary-500",
    img: `w-full h-auto`,
    textContent:
      "absolute top-1/4 p-2 z-20 md:top-1/2 md:p-0 text-white transition-all duration-[2s] ease-in-out transform",
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };
  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    const carouselInterval = setInterval(nextItem, 3500);
    return () => {
      clearInterval(carouselInterval);
    };
  }, []);

  return (
    <div className='relative w-full overflow-x-hidden'>
      <button
        className={`${defaultStyles.btn} left-3 md:left-6`}
        onClick={prevItem}>
        <FaArrowLeft />
      </button>

      {/* Carousel */}
      <div
        className='flex transition-all duration-700 ease-in-out'
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}>
        {items.map((item, index) => (
          // <img key={index} className='w-screen' src={item.src} />
          <CarouselSlide
            key={index}
            item={item}
            imgStyles={defaultStyles.img}
            textStyles={defaultStyles.textContent}
            showText={currentIndex === index}
          />
        ))}
      </div>

      {/* <img className={`${defaultStyles.img}`} src={items[currentIndex].src} />
      <div
        className={` ${defaultStyles.textContent} ${items[currentIndex].classNames} `}>
        <div className='mb-1 text-sm md:mb-3 md:text-3xl'>
          {items[currentIndex].title}
        </div>
        <div className='text-[0.5rem] md:text-xs lg:text-lg'>
          {items[currentIndex].body}
        </div>
      </div> */}
      <button
        className={`${defaultStyles.btn} right-3 md:right-6`}
        onClick={nextItem}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
