import React from "react";
import { CiMedicalClipboard } from "react-icons/ci";
import { FaUserGraduate } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";

const CoursesComponent = () => {
  return (
    <div className='container mx-auto p-3 lg:w-1/2'>
      {/* heading */}
      <div className='text-xl my-5 md:text-4xl'>
        Courses
        <span className='text-primary-500 text-2xl italic font-semibold md:text-5xl'>
          {" "}
          We Offer
        </span>
      </div>
      {/* Flex Container */}
      <div className=' flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-3 lg:space-x-5'>
        {/* Courses */}
        <div className='border border-primary-300 rounded-lg p-3 flex space-x-3 md:flex-col md:space-x-0 md:space-y-5'>
          <FaUserGraduate className='text-4xl text-primary-300 md:text-6xl md:mx-auto' />
          {/* Content */}
          <div className='flex flex-col md:text-center'>
            <div className='font-semibold md:text-lg'>JEE Main & Advanced</div>
            <div className='text-gray-400 md:text-lg'>
              Courses that cater to your needs to ace IIT-JEE
            </div>
          </div>
        </div>

        <div className='border border-primary-300 rounded-lg p-3 flex space-x-3 md:flex-col md:space-x-0 md:space-y-5 lg:space-y-7'>
          <CiMedicalClipboard className='text-4xl text-primary-300 md:text-6xl md:mx-auto' />
          {/* Content */}
          <div className='flex flex-col md:text-center'>
            <div className='font-semibold md:text-lg'>NEET - UG</div>
            <div className='text-gray-400 md:text-lg'>
              Courses that cater to your needs to ace NEET-UG
            </div>
          </div>
        </div>

        <div className='border border-primary-300 rounded-lg p-3 flex space-x-3 md:flex-col md:space-x-0 md:space-y-5'>
          <LiaSchoolSolid className='text-4xl text-primary-300 md:text-6xl md:mx-auto' />
          {/* Content */}
          <div className='flex flex-col md:text-center'>
            <div className='font-semibold md:text-lg'>
              10<sup>th</sup> and 12<sup>th</sup> Foundation
            </div>
            <div className='text-gray-400 md:text-lg'>
              Classes that helps you build a strong foundation in 10
              <sup>th</sup> and 12<sup>th</sup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesComponent;