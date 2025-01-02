import React from "react";
import logo from "./../assets/logo.jpg";

const Achievers = ({ students }) => {
  return (
    <div className='container p-3 mx-auto flex flex-col lg:w-1/2'>
      {/* heading */}
      <div className='text-xl pb-4 mb-3 border-b-4 border-b-primary-300 md:text-3xl'>
        Our Achievers
      </div>
      {/* Achievers */}
      <div className='p-4 flex flex-col container items-center text-center md:flex-row md:flex-wrap md:gap-4 md:justify-center'>
        {/* Achiever */}
        {students &&
          students.map((student, index) => (
            <div
              key={index}
              className='flex flex-col p-3 justify-center md:p-5'>
              <img
                src={student.image}
                alt='image'
                className='w-40 h-40 object-center object-contain'
              />
              <div className='flex flex-col'>
                <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
                  {student.name}
                </div>
                <div className='text-primary-500'>100% | SSC</div>
                <div className=''>School Section</div>
              </div>
            </div>
          ))}
        {!students && <h1>wow</h1>}
      </div>
    </div>
  );
};

export default Achievers;
