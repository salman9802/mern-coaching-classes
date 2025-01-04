import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

import { getToken } from "../../components/admin/AdminAuth";
import AdminContactEntry from "../../components/admin/AdminContactEntry";

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [checks, setChecks] = useState([]);
  const [mainCheck, setMainCheck] = useState(false);

  // Function to handle state of each check
  const handleChecks = (index, checked) => {
    setChecks((prev) => {
      const newChecks = [...prev];
      newChecks[index] = checked;

      // Check main if all are checked
      if (newChecks.every(Boolean)) setMainCheck(true);
      else setMainCheck(false);

      return newChecks;
    });
  };

  // Function to handle main check
  const handleMainCheck = (e) => {
    setChecks(Array(contacts.length).fill(e.target.checked));
    setMainCheck(e.target.checked);
  };

  const handleDelete = () => {
    if (!checks.some(Boolean)) {
      return;
    }
    (async () => {
      const res = await fetch("/api/admin/contacts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: contacts.filter((c, i) => checks[i]).map((e) => e._id),
        }),
      });
      if (res.status < 500) {
        const json = await res.json();
        if (res.ok) {
          alert("Contacts Deleted!");
          setContacts(contacts.filter((c, i) => !checks[i]));
          setChecks(checks.filter((c, i) => !c));
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
      const res = await fetch("/api/admin/contacts/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.status < 500) {
        const json = await res.json();
        if (res.ok) {
          // By default, none are checked
          setChecks(Array(json.contacts.length).fill(false));
          setContacts(json.contacts);
        } else {
          alert(json.msg);
        }
      } else {
        alert("Server Error. Try again later!");
      }
    })();
  }, []);
  {
    /* <button > */
  }
  {
    /* <MdDelete className='self-start ml-12' /> */
  }
  {
    /* </button> */
  }

  if (contacts.length > 0) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-xl my-5 md:text-2xl md:my-7 lg:text-5xl lg:my-9'>
          Contacts
        </h2>
        <table className='w-11/12 border-collapse'>
          <thead>
            <tr>
              <td className='px-3 py-2'>
                <button onClick={handleDelete}>
                  <MdDelete className='text-red-500 w-6 h-6' />
                </button>
              </td>
              <td className='px-3 py-1 md:px-5 md:py-2'></td>
              <td className='px-3 py-1 md:px-5 md:py-2'></td>
              <td className='px-3 py-1 md:px-5 md:py-2'></td>
              <td className='px-3 py-1 md:px-5 md:py-2'></td>
            </tr>
            <tr className='text-accent-500 text-left'>
              <th className='px-5 py-2 border-gray-300 border-b border-t'>
                <input
                  className='accent-red-500'
                  onChange={handleMainCheck}
                  checked={mainCheck}
                  type='checkbox'
                  name='main-chk'
                  id='main-chk'
                />
              </th>
              <th className='px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                Name
              </th>
              <th className='px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                Mobile
              </th>
              <th className='px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                City
              </th>
              <th className='px-3 py-1 md:px-5 md:py-2 border-gray-300 border-b border-t'>
                Class
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <AdminContactEntry
                key={index}
                contact={contact}
                checks={checks}
                index={index}
                handleChecks={handleChecks}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className='w-screen h-screen text-xl text-accent-500 flex justify-center items-center md:text-3xl lg:text-6xl'>
        No Contacts
      </div>
    );
  }
};

export default AdminContactsPage;
