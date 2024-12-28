import React from "react";
import image from "../assets/students.avif";

const AboutPage = () => {
  return (
    <div className='container mx-auto p-3 md:p-5'>
      <h1 className='my-3 text-center font-semibold text-2xl md:text-4xl lg:text-6xl lg:my-7'>
        About Us
      </h1>
      <div className='mx-auto flex flex-col space-y-3 md:space-y-5 lg:flex-row lg:space-y-0 lg:space-x-7 lg:w-11/12'>
        <img className='w-3/4 mx-auto lg:w-1/2' src={image} alt='' />
        <div className='space-y-5'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
            animi earum mollitia ipsam sint, commodi, iure eveniet nam placeat
            doloribus consequatur odio inventore velit ad. Amet rem enim neque
            magnam doloribus quisquam accusamus ea totam?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
            animi earum mollitia ipsam sint, commodi, iure eveniet nam placeat
            doloribus consequatur odio inventore velit ad. Amet rem enim neque
            magnam doloribus quisquam accusamus ea totam?
          </p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
