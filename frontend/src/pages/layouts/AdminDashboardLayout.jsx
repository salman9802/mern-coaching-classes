import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const data = {
    username: "John Doe",
  };

  const navLinkClasses = ({ isActive }) => {
    return (
      "px-3 py-1 text-white rounded-sm focus:outline-primary-500 " +
      (isActive ? "bg-gray-100/10 hover:bg-gray-100/30" : "") +
      " md:px-5 md:py-2 lg:px-7"
    );
    // bg-white text-primary-500 hover:bg-primary-500 hover:text-white
  };

  return (
    <div className='w-screen flex'>
      {/* Horizontal navbar */}
      <div className='w-64 p-5 flex flex-col space-y-5 bg-primary-500 h-screen fixed top-0 left-0 bottom-0 md:space-y-7 lg:space-y-10'>
        {/* Header */}
        <h2 className='flex flex-col space-y-1 text-xl md:space-y-2 md:text-2xl lg:text-3xl'>
          Logged in as
          <span className='text-lg text-accent-500 font-bold md:text-xl lg:text-2xl'>
            {data.username}
          </span>
        </h2>
        {/* Navigation */}
        <div className='flex flex-col space-y-3'>
          <NavLink to='/admin/dashboard' end className={navLinkClasses}>
            Contacts
          </NavLink>
          <NavLink to='/admin/dashboard/settings' className={navLinkClasses}>
            Settings
          </NavLink>
        </div>
      </div>
      {/* Content */}
      <div className='ml-64 w-full bg-slate-100/50 min-h-[150vh]'>
        <Outlet />
      </div>
    </div>
  );

  // return (
  //   <div class='flex h-screen'>
  //     {/* <!-- Navbar --> */}
  //     <div class='w-64 bg-gray-800 text-white p-4 fixed top-0 left-0 bottom-0'>
  //       <h2 class='text-lg font-bold'>Navbar</h2>
  //       <ul class='mt-4'>
  //         <li>
  //           <a href='#' class='block py-2 px-4 hover:bg-gray-700'>
  //             Home
  //           </a>
  //         </li>
  //         <li>
  //           <a href='#' class='block py-2 px-4 hover:bg-gray-700'>
  //             About
  //           </a>
  //         </li>
  //         <li>
  //           <a href='#' class='block py-2 px-4 hover:bg-gray-700'>
  //             Services
  //           </a>
  //         </li>
  //         <li>
  //           <a href='#' class='block py-2 px-4 hover:bg-gray-700'>
  //             Contact
  //           </a>
  //         </li>
  //       </ul>
  //     </div>

  //     {/* <!-- Main content area --> */}
  //     <div class='ml-64 p-8 w-full'>
  //       <h1 class='text-3xl font-bold'>Content Section</h1>
  //       <p class='mt-4'>
  //         This is the content area on the right side of the screen. The navbar
  //         is fixed on the left side.
  //       </p>
  //       {/* <!-- Add more content here --> */}
  //     </div>
  //   </div>
  // );
};

export default AdminDashboardLayout;
