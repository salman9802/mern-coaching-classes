import React from "react";

const CarouselSlide = ({ imgStyles, textStyles, item, showText }) => {
  return (
    <div className='w-full relative flex-shrink-0'>
      <img className={`${imgStyles}`} src={item.src} />
      <div
        className={` ${textStyles} ${item.classNames} ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
        <div className='mb-1 text-sm md:mb-3 md:text-3xl'>{item.title}</div>
        <div className='text-[0.5rem] md:text-xs lg:text-lg'>{item.body}</div>
      </div>
    </div>
  );
};

export default CarouselSlide;
