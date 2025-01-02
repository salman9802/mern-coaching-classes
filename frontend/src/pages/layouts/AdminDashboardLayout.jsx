import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const data = {
    username: "John Doe",
  };

  const navLinkClasses = ({ isActive }) => {
    return (
      "px-3 py-1 text-white rounded-sm focus:outline-primary-500 " +
      (isActive ? "bg-gray-100/30" : "") +
      " md:px-5 md:py-2 lg:px-7"
    );
    // bg-white text-primary-500 hover:bg-primary-500 hover:text-white
  };

  return (
    <div className='w-screen flex'>
      {/* Horizontal navbar */}
      <div className='w-64 p-5 flex flex-col space-y-5 bg-primary-500 h-screen fixed top-0 left-0 bottom-0 md:space-y-7 lg:space-y-10'>
        {/* Header */}
        <h2 className='text-gray-100 flex flex-col space-y-1 text-xl md:space-y-2 md:text-2xl lg:text-3xl'>
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
};

export default AdminDashboardLayout;
