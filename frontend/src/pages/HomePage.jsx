import React from "react";
import Carousel from "../components/Carousel";
import slide1 from "../assets/slides/slide1.jpg";
import slide2 from "../assets/slides/slide2.jpg";
import CoursesComponent from "../components/CoursesComponent";
import Achievers from "../components/Achievers";
import BookVisit from "../components/BookVisit";

// const carouselItems = [
//   <img src='https://via.placeholder.com/500x300?text=Image+1' alt='1' />,
//   <img src='https://via.placeholder.com/500x300?text=Image+2' alt='2' />,
//   <div style={{ fontSize: "24px" }}>This is some text content.</div>,
//   <img src='https://via.placeholder.com/500x300?text=Image+3' alt='3' />,
// ];

const carouselItems = [
  {
    src: slide1,
    title: "TAKE THE FIRST STEP TO KNOWLEDGE WITH US",
    body: "The purpose of education is to turn mirrors into windows",
    classNames: "left-1/2",
  },
  {
    src: slide2,
    title: "BETTER EDUCATION FOR A BETTER WORLD",
    body: "We believe there is nothing more important than education",
    classNames: "right-1/2",
  },
];

const HomePage = () => {
  return (
    <>
      <Carousel items={carouselItems} />
      <CoursesComponent />
      <Achievers />
      <BookVisit />
    </>
  );
};

export default HomePage;
