import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const AdminDashboardLayout = () => {
  const [openHamburger, setOpenHamburger] = useState(false);

  const data = {
    username: "John Doe",
  };

  const handleHamburgerClick = () => {
    setOpenHamburger(true);
  };

  const handleHamburgerCloseClick = () => {
    setOpenHamburger(false);
  };

  const navLinkClasses = ({ isActive }) => {
    return (
      "px-3 py-1 text-white rounded-sm focus:outline-primary-500 hover:bg-gray-100/20 " +
      (isActive ? "bg-gray-100/30" : "") +
      " md:px-5 md:py-2 lg:px-7"
    );
  };

  return (
    <div className='w-screen flex'>
      {/* Horizontal navbar */}
      <div
        className={`-translate-x-64 ${
          openHamburger && "-translate-x-0"
        } w-64 p-5 flex flex-col space-y-5 bg-primary-500 h-screen fixed z-50 top-0 left-0 bottom-0 transition ease-in-out duration-200 md:-translate-x-0 md:space-y-7 lg:space-y-10`}>
        {/* Header */}
        <div className='flex justify-between items-center'>
          {/* User info */}
          <h2 className='text-gray-100 flex flex-col space-y-1 text-xl md:space-y-2 md:text-2xl lg:text-3xl'>
            Logged in as
            <span className='text-lg text-accent-500 font-bold md:text-xl lg:text-2xl'>
              {data.username}
            </span>
          </h2>
          {/* Close Button */}
          <button
            className='text-white text-3xl md:hidden'
            onClick={handleHamburgerCloseClick}>
            <IoClose />
          </button>
        </div>
        {/* Navigation */}
        <div className='flex flex-col space-y-3'>
          <NavLink
            to='/admin/dashboard/contacts'
            end
            className={navLinkClasses}>
            Contacts
          </NavLink>
          <NavLink to='/admin/dashboard/settings' className={navLinkClasses}>
            Settings
          </NavLink>
        </div>
      </div>

      {/* Hamburger overlay */}
      <div
        className={`fixed z-40 inset-0 bg-black bg-opacity-50 transition-opacity ease-in-out duration-200 ${
          !openHamburger && "hidden"
        }`}></div>

      {/* Content */}
      <div className='w-full bg-slate-100/50 min-h-[150vh] md:ml-64'>
        {/* Hamburger */}
        <button
          className='pt-3 pl-3 h-min text-xl justify-start sm:pt-3 sm:pl-3 md:hidden'
          onClick={handleHamburgerClick}>
          <RxHamburgerMenu />
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
