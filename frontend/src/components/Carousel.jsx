import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultStyles = {
    btn: "absolute top-1/2 text-white text-sm md:text-2xl hover:text-primary-500",
    img: "w-screen",
    textContent:
      "absolute top-1/4 p-2 md:top-1/2 md:p-0 text-white opacity-0 transform translate-y-10 transition-all duration-700 ease-in-out animate-from-bottom",
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };
  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className='flex w-screen relative'>
      <button className={`${defaultStyles.btn} left-6`} onClick={prevItem}>
        <FaArrowLeft />
      </button>
      {/* {items.map((item, index) => (
        <img key={index} className='w-screen' src={item.src} />
      ))} */}
      <img className={`${defaultStyles.img}`} src={items[currentIndex].src} />
      <div
        className={` ${defaultStyles.textContent} ${items[currentIndex].classNames} `}>
        <div className='mb-1 text-sm md:mb-3 md:text-3xl'>
          {items[currentIndex].title}
        </div>
        <div className='text-xs lg:text-lg'>{items[currentIndex].body}</div>
      </div>
      <button className={`${defaultStyles.btn} right-6`} onClick={nextItem}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
