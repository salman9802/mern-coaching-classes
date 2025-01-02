import React from "react";
import Carousel from "../components/Carousel";
import slide1 from "../assets/slides/slide1.jpg";
import slide2 from "../assets/slides/slide2.jpg";
import CoursesComponent from "../components/CoursesComponent";
import Achievers from "../components/Achievers";
import Contact from "../components/Contact";
import Impact from "../components/Impact";

import student1 from "../assets/students/student1.png";
import student2 from "../assets/students/student2.jpeg";
import student3 from "../assets/students/student3.jpeg";
import student4 from "../assets/students/student4.webp";
import student5 from "../assets/students/student5.jpg";

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
  const impactValues = {
    students: 5000,
    branches: 10,
    staff: 300,
    lectures: 4500,
  };
  const students = [
    { image: student1, name: "Rohit S." },
    { image: student2, name: "Sanjana R." },
    { image: student3, name: "Arnav C." },
    { image: student4, name: "Vedant C." },
    { image: student5, name: "Sai R." },
  ];

  return (
    <>
      <Carousel items={carouselItems} />
      <Impact impactValues={impactValues} />
      <CoursesComponent />
      <Achievers students={students} />
      <Contact />
    </>
  );
};

export default HomePage;
