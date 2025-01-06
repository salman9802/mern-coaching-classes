import React from "react";

const MapLocation = () => {
  return (
    <iframe
      className='container mx-auto h-screen lg:w-2/3'
      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7566.370045693858!2d73.83579694513277!3d18.520539203506786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf87f5d418d1%3A0x985b331461fa1bd4!2sSagar%20Arcade!5e0!3m2!1sen!2sin!4v1736147148610!5m2!1sen!2sin'
      style={{ border: 0 }}
      allowFullScreen=''
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'></iframe>
  );
};

export default MapLocation;
