import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultStyles = {
    btn: "absolute top-1/2 text-white text-2xl hover:text-black",
    img: "w-screen",
    textContent:
      "absolute top-1/2 text-2xl text-white opacity-0 transform translate-y-10 transition-all duration-700 ease-in-out animate-from-bottom",
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
        {items[currentIndex].content}
      </div>
      <button className={`${defaultStyles.btn} right-6`} onClick={nextItem}>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
