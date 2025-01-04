import React, { useEffect, useState } from "react";

import AdminEntry from "../../components/admin/AdminEntry";
import { getToken } from "../../components/admin/AdminAuth";

const AdminAdminsPage = () => {
  const [admins, setAdmins] = useState([]);

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

  if (admins.length > 0) {
    return (
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
    );
  } else {
    return (
      <div className='w-screen h-screen text-xl text-accent-500 flex justify-center items-center md:text-3xl lg:text-6xl'>
        No Admins
      </div>
    );
  }
};

export default AdminAdminsPage;
