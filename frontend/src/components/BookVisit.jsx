import React, { useState } from "react";

const BookVisit = () => {
  const defaultFormData = {
    name: "",
    number: "",
    city: "",
    class: "",
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='container mx-auto p-3 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:w-2/3'>
      {/* heading */}
      <div className='text-xl font-semibold p-3 md:text-3xl lg:mr-8'>
        Book a visit for our{" "}
        <span className='text-primary-500'>offline centers</span>, to get
        personalized help
      </div>
      {/* Form */}
      <div className='flex flex-col space-y-3 p-3 md:space-y-5'>
        <div className='text-center font-semibold md:text-3xl'>
          Share your information to book a visit
        </div>
        <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
          <input
            className='border border-gray-300 px-3 py-1 md:px-5 md:py-3'
            type='text'
            name='name'
            id='name'
            placeholder='Enter your name'
            onChange={handleChange}
          />
          <input
            className='border border-gray-300 px-3 py-1 md:px-5 md:py-3'
            type='text'
            name='number'
            id='number'
            placeholder='Enter your mobile number'
            onChange={handleChange}
          />
          <input
            className='border border-gray-300 px-3 py-1 md:px-5 md:py-3'
            type='text'
            name='city'
            id='city'
            placeholder='Enter your city'
            onChange={handleChange}
          />
          <input
            className='border border-gray-300 px-3 py-1 md:px-5 md:py-3'
            type='text'
            name='class'
            id='class'
            placeholder='Enter your class'
            onChange={handleChange}
          />
          <button
            className='bg-primary-500 rounded-lg px-3 py-1 md:px-5 md:py-3 hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500'
            type='submit'>
            Book a visit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookVisit;
