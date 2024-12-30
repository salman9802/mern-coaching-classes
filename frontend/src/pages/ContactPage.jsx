import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BsPersonWorkspace } from "react-icons/bs";

const ContactPage = () => {
  return (
    <div className='container mx-auto p-3 md:p-5'>
      <h1 className='my-3 text-center font-semibold text-2xl md:text-4xl lg:text-6xl lg:my-7'>
        Contact Us
      </h1>
      {/* Contact details */}
      <div className='mx-auto flex flex-col space-y-3 md:space-y-5 lg:flex-row lg:space-y-0 lg:space-x-7 lg:w-11/12'>
        {/* Address */}
        <div className='w-11/12 mx-auto flex space-x-3 items-center md:space-x-5 md:container'>
          <FaMapMarkerAlt className='text-3xl text-primary-500' />
          <div className='flex flex-col space-y-3'>
            <h1 className='text-xl font-semibold md:text-3xl lg:text-4xl'>
              Address
            </h1>
            <p className='text-accent-500 font-semibold'>
              1234 Elm Street Springfield, IL 62701 United States{" "}
            </p>
          </div>
        </div>
        {/* Contact */}
        <div className='w-11/12 mx-auto flex space-x-3 items-center md:space-x-5 md:container'>
          <FaPhoneAlt className='text-3xl text-primary-500' />
          <div className='flex flex-col space-y-3'>
            <h1 className='text-xl font-semibold md:text-3xl lg:text-4xl'>
              Contact Number
            </h1>
            <p className='text-accent-500 font-semibold'>+91-555-555-5555</p>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className='mx-auto mt-5 flex flex-col space-y-3 md:space-y-5 lg:flex-row lg:space-y-0 lg:space-x-7 lg:mt-12 lg:w-11/12'>
        {/* Mail To */}
        <div className='w-11/12 mx-auto flex space-x-3 items-center md:space-x-5 md:container'>
          <IoIosMail className='text-3xl text-primary-500' />
          <div className='flex flex-col space-y-3'>
            <h1 className='text-xl font-semibold md:text-3xl lg:text-4xl'>
              Mail To
            </h1>
            <p className='text-accent-500 font-semibold'>
              info@rathodcoachingacademy.com{" "}
            </p>
          </div>
        </div>
        {/* Working Hours */}
        <div className='w-11/12 mx-auto flex space-x-3 items-center md:space-x-5 md:container'>
          <BsPersonWorkspace className='text-3xl text-primary-500' />
          <div className='flex flex-col space-y-3'>
            <h1 className='text-xl font-semibold md:text-3xl lg:text-4xl'>
              Working Hours
            </h1>
            <p className='text-accent-500 font-semibold'>
              <p>
                <span className='font-semibold text-lg text-black mr-3 md:text-xl'>
                  Monday-Saturday:
                </span>
                10:00 AM to 9:00 PM
              </p>
              <p>
                <span className='font-semibold text-lg text-black mr-3 md:text-xl'>
                  Sunday:
                </span>
                10:00 AM to 2:00 PM
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
