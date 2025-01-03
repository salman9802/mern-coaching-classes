import React, { useEffect, useState } from "react";
import { getToken } from "../../components/admin/AdminAuth";

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/contacts/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      // console.log(await res.json());

      if (res.status < 500) {
        const json = await res.json();
        // console.log(res.ok);
        // console.log(json);

        if (res.ok) {
          setContacts(json.contacts);
        } else {
          alert(json.msg);
        }
      } else {
        alert("Server Error. Try again later!");
      }
    })();

    // setContacts([
    //   {
    //     name: "John Doe",
    //     mobile: "+915555555555",
    //     city: "Pune City",
    //     class: "10",
    //   },
    //   {
    //     name: "Jane Doe",
    //     mobile: "+917899878765",
    //     city: "Mumbai",
    //     class: "12",
    //   },
    // ]);
  }, []);

  return (
    <div className=' flex flex-col justify-center items-center'>
      <h2 className='text-xl my-5 md:text-2xl md:my-7 lg:text-5xl lg:my-9'>
        Contacts
      </h2>
      <table className='border border-collapse border-gray-400'>
        <thead>
          <tr className='text-accent-500'>
            <th className='px-5 py-2 border border-gray-400'>Name</th>
            <th className='px-5 py-2 border border-gray-400'>Mobile</th>
            <th className='px-5 py-2 border border-gray-400'>City</th>
            <th className='px-5 py-2 border border-gray-400'>Class</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className='px-5 py-2 border border-gray-400'>
                {contact.name}
              </td>
              <td className='px-5 py-2 border border-gray-400'>
                {contact.mobile}
              </td>
              <td className='px-5 py-2 border border-gray-400'>
                {contact.city}
              </td>
              <td className='px-5 py-2 border border-gray-400'>
                {contact.educationClass}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactsPage;
