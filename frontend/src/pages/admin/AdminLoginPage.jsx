import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ username: null, password: null });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status < 500) {
        if (res.ok) {
          const json = await res.json();
          const { token } = json;
          localStorage.setItem("adjwtok", token);
          navigate("/admin/dashboard");
        } else {
          const json = await res.json();
          alert(json.msg);
          console.log(json.stack);
        }
      } else {
        alert("Server error! Try again later");
      }

      // if (res.ok) {
      // } else {
      // }
    })();
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='flex flex-col p-5 space-y-5 w-11/12 mx-auto shadow-xl md:w-1/2 md:pb-7 lg:pb-14 lg:w-1/3'>
        <h1 className='text-center text-primary-500 font-bold text-2xl my-5 md:text-5xl md:mt-7 lg:my-12'>
          Login
        </h1>
        {/* Form */}
        <form
          className='w-11/12 mx-auto flex flex-col items-center justify-center space-y-5 md:w-3/4 md:space-y-7 lg:container'
          onSubmit={handleSubmit}>
          <input
            className='w-full border border-gray-300 rounded-md px-3 py-2 md:px-5 md:py-3 focus:outline-primary-500'
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            onChange={handleChange}
          />
          <input
            className='w-full border border-gray-300 rounded-md px-3 py-2 md:px-5 md:py-3 focus:outline-primary-500'
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            onChange={handleChange}
          />
          <button
            className='w-full px-3 py-2 rounded-md bg-primary-500 text-white focus:outline-none hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500 md:px-5 md:py-3'
            type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
