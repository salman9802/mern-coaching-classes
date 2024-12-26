import React from "react";
import logo from "./../assets/logo.jpg";

const Achievers = () => {
  return (
    <div className='container p-3 mx-auto flex flex-col lg:w-1/2'>
      {/* heading */}
      <div className='text-xl pb-4 mb-3 border-b-4 border-b-primary-300 md:text-3xl'>
        Our Achievers
      </div>
      {/* Achievers */}
      <div className='p-4 flex flex-col container items-center text-center md:flex-row md:flex-wrap md:gap-4 md:justify-center'>
        {/* Achiever */}
        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>

        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>

        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>

        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>

        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>

        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>

        <div className='flex flex-col p-3 justify-center md:p-5'>
          <img src={logo} alt='image' className='w-40 h-40 ' />
          <div className='flex flex-col'>
            <div className='text-xl font-semibold md:text-2xl lg:text-3xl'>
              Lorem, ipsum.
            </div>
            <div className='text-primary-500'>100% | SSC</div>
            <div className=''>School Section</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievers;
