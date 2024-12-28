import React from "react";

const Impact = () => {
  return (
    <div className='my-3 flex flex-col space-y-3 md:space-y-5 md:my-5 lg:space-y-7'>
      <div className='mt-3 mb-1 text-center font-semibold text-2xl text-primary-500 md:text-5xl md:mt-5 md:mb-3'>
        OUR IMPACT
      </div>
      {/* Statistics */}
      <div className='mx-auto rounded-md bg-primary-500/10 px-3 py-2 grid grid-cols-2 gap-2 md:flex md:space-y-0 md:space-x-5 md:flex-row md:px-5 md:py-3 lg:px-7 lg:py-5'>
        <div className='px-3 py-2 md:px-5 md:py-3 lg:px-7 lg:py-5'>
          <span className='text-xl font-bold mr-2 text-primary-500 md:text-3xl lg:text-4xl'>
            1000
          </span>
          <span className='md:font-semibold md:text-lg lg:text-xl'>
            Students
          </span>
        </div>
        <div className='px-3 py-2 md:px-5 md:py-3 lg:px-7 lg:py-5'>
          <span className='text-xl font-bold mr-2 text-primary-500 md:text-3xl lg:text-4xl'>
            6
          </span>
          <span className='md:font-semibold md:text-lg lg:text-xl'>
            Branches
          </span>
        </div>
        <div className='px-3 py-2 md:px-5 md:py-3 lg:px-7 lg:py-5'>
          <span className='text-xl font-bold mr-2 text-primary-500 md:text-3xl lg:text-4xl'>
            200+
          </span>
          <span className='md:font-semibold md:text-lg lg:text-xl'>Staff</span>
        </div>
        <div className='px-3 py-2 md:px-5 md:py-3 lg:px-7 lg:py-5'>
          <span className='text-xl font-bold mr-2 text-primary-500 md:text-3xl lg:text-4xl'>
            3500
          </span>
          <span className='md:font-semibold md:text-lg lg:text-xl'>
            Lectures
          </span>
        </div>
      </div>
      {/* Text content */}
      <div className='container mx-auto px-3 py-2 flex flex-col justify-center items-center space-y-3 lg:w-11/12 md:flex-row md:space-y-0 md:space-x-5 md:px-5 md:py-3 lg:px-7 lg:py-5'>
        <div className='text-lg font-semibold md:font-bold md:text-2xl lg:text-3xl'>
          Rathod Coaching classes is now{" "}
          <span className='text-primary-500'>25years</span> old, having 6
          branches all over India
        </div>
        <div className='md:text-lg lg:text-xl'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem quo
          quia expedita animi omnis modi quisquam dolore corporis veritatis
          provident sed molestias accusantium quibusdam vero, dolores
          voluptatibus porro ipsam ratione, nobis deleniti. Corrupti, dolore
          adipisci.
        </div>
      </div>
    </div>
  );
};

export default Impact;
