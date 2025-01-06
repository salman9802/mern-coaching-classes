import React, { useEffect, useState } from "react";

import AdminEntry from "../../components/admin/AdminEntry";
import { getToken } from "../../components/admin/AdminAuth";

const AdminAdminsPage = () => {
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  });
  const [admins, setAdmins] = useState([]);

  const handleAdminFormChange = (e) => {
    setAdminForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAdminFormSubmit = (e) => {
    e.preventDefault();
    console.log(adminForm);

    (async () => {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminForm),
      });

      if (res.status < 500) {
        const json = await res.json();
        if (res.ok) {
          setAdmins((prev) => [...prev, adminForm]);
          setAdminForm({ username: "", password: "" });
          alert("Admin added succesfully!");
        } else {
          alert(json.msg);
        }
      } else {
        alert("Server Error. Try again later!");
      }
    })();
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/admins", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.status < 500) {
        const json = await res.json();
        if (res.ok) {
          setAdmins(json.admins);
        } else {
          alert(json.msg);
        }
      } else {
        alert("Server Error. Try again later!");
      }
    })();
  }, []);

  const handleAdminDelete = (id) => {
    (async () => {
      const res = await fetch("/api/admin/admins", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (res.status < 500) {
        const json = await res.json();
        if (res.ok) {
          setAdmins((prev) => [...prev.filter((a) => a._id !== id)]);
          alert("Deleted succesfully");
        } else {
          alert(json.msg);
        }
      } else {
        alert("Internal server error");
      }
    })();
  };

  return (
    <>
      <form
        className='mt-10 w-11/12 mx-auto flex flex-col items-center justify-center space-y-5 md:w-3/4 md:space-y-7 lg:container'
        onSubmit={handleAdminFormSubmit}>
        <h1 className='text-xl text-primary-500 md:text-2xl lg:text-5xl'>
          Add Admin
        </h1>
        <input
          className='w-full border border-gray-300 rounded-md px-3 py-2 md:px-5 md:py-3 focus:outline-primary-500'
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          value={adminForm.username}
          onChange={handleAdminFormChange}
        />
        <input
          className='w-full border border-gray-300 rounded-md px-3 py-2 md:px-5 md:py-3 focus:outline-primary-500'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={adminForm.password}
          onChange={handleAdminFormChange}
        />
        <button
          className='w-full px-3 py-2 rounded-md bg-primary-500 text-white focus:outline-primary-500 hover:bg-white hover:text-primary-500 hover:border hover:border-primary-500 md:px-5 md:py-3'
          type='submit'>
          Add Admin
        </button>
      </form>
      {admins.length > 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-xl my-5 md:text-2xl md:my-7 lg:text-5xl lg:my-9'>
            Admins
          </h2>
          <table className='w-11/12 border-collapse'>
            <thead>
              <tr className='text-accent-500 text-left'>
                <th className='text-xs md:text-base px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                  ID
                </th>
                <th className='text-xs md:text-base px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                  type
                </th>
                <th className='text-xs md:text-base px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                  Username
                </th>
                <th className='text-xs md:text-base px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                  Password
                </th>
                <th className='text-xs md:text-base px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <AdminEntry
                  key={index}
                  admin={admin}
                  handleAdminDelete={handleAdminDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='w-screen h-screen text-xl text-accent-500 flex justify-center items-center md:text-3xl lg:text-6xl'>
          No Admins
        </div>
      )}
    </>
  );

  // if (admins.length > 0) {
  //   return (
  //
  //   );
  // } else {
  //   return (

  //   );
  // }
};

export default AdminAdminsPage;
