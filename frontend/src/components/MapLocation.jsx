import React from "react";

const MapLocation = () => {
  return (
    // <iframe
    //   src='https://www.google.com/maps/embed/v3/place?q=Paris,France&zoom=12'
    //   width='600'
    //   height='450'
    //   frameBorder='0'
    //   style={{
    //     border: 0,
    //   }}
    //   allowFullScreen=''></iframe>
    // <iframe
    //   frameBorder='0'
    //   scrolling='no'
    //   marginHeight='0'
    //   marginWidth='0'
    //   className='w-screen h-64'
    //   //   src='https://maps.google.com/maps/?q=chanakya%20ias%20academy%2Cchanakyapuri%2C%20south%20delhi&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near'
    //   //   src='https://maps.google.com/maps/embed/v3/place/?q=chanakya%20ias%20academy%2Cchanakyapuri%2C%20south%20delhi&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near'
    //   //   src='https://maps.google.com/maps?q=30%20Fergusson%20College%20Rd%20Goodluck%20Chowk%20Sagar%20Arcade%20Office%20No.%2016%20Deccan Gymkhana%20Pune%20Maharastra%20411004%20India&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near'
    //   referrerPolicy='no-referrer-when-downgrade'
    //   src='https://maps.google.com/maps/embed/v3/place/?q=30%20Fergusson%20College%20Rd%20Goodluck%20Chowk%20Sagar%20Arcade%20Office%20No.%2016%20Deccan Gymkhana%20Pune%20Maharastra%20411004%20India'
    //   title='chanakya ias academy,chanakyapuri, south delhi'
    //   aria-label='chanakya ias academy,chanakyapuri, south delhi'></iframe>
    // <iframe
    //   className='w-screen h-64'
    //   src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7566.370045693863!2d73.83414719513301!3d18.520539203506658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s30%20Fergusson%20College%20Rd%20Goodluck%20Chowk%20Sagar%20Arcade%20Office%20No.%2016%20Deccan%20Gymkhana%20Pune%20Maharastra%20411004%20India!5e0!3m2!1sen!2sin!4v1736146780266!5m2!1sen!2sin'
    //   width='600'
    //   height='450'
    //   allowfullscreen=''
    //   loading='lazy'
    //   referrerpolicy='no-referrer-when-downgrade'></iframe>
    <iframe
      className='container mx-auto h-screen lg:w-2/3'
      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7566.370045693858!2d73.83579694513277!3d18.520539203506786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf87f5d418d1%3A0x985b331461fa1bd4!2sSagar%20Arcade!5e0!3m2!1sen!2sin!4v1736147148610!5m2!1sen!2sin'
      //   width='600'
      //   height='450'
      style={{ border: 0 }}
      allowFullScreen=''
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'></iframe>
  );
};

export default MapLocation;
