// import axios from '../../utils/axios'
// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'

// const Sidenav = () => {

  
//   return (
//     <>
//     <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10'>
//       <h1 className='text-white text-2xl font-bold'>
//       <i className="text-[#6556CD] ri-tv-fill text-2xl mr-3"></i>
//        <span className='text-2xl'>
//        JAY PAWAR
//         </span> 
//       </h1>
//       <nav className=' flex flex-col text-zinc-400 text-xl '>
        
//       <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
//         New Feeds
//         </h1>
//      <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className=" mr-2 ri-fire-fill"></i>Trending
//      </Link>
//      <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className="mr-2 ri-bard-fill"></i>Popular
//      </Link>
//      <Link to='/movie' className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className="mr-2 ri-movie-2-fill"></i>Movies
//      </Link>
//      <Link to='/tv' className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className="mr-2 ri-tv-2-fill"></i>Tv Shows
//      </Link>
//      <Link to='/person' className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className="mr-2 ri-team-fill"></i>People
//      </Link>
//       </nav>
//       <hr className='border-none h-[1px] bg-zinc-400' />
//       <nav className=' flex flex-col text-zinc-400 text-xl'>
        
//       <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
//         Website Information
//         </h1>
//      <Link to='/about' className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className="mr-2 ri-information-2-fill"></i>About
//      </Link>
//      <Link to='/contact' className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
//      <i className="mr-2 ri-phone-fill"></i>Contact Us
//      </Link>
    
//       </nav>
//     </div>
//     </>
//   )
// }

// export default Sidenav


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger menu button */}
      <button
        className="md:hidden fixed top-3 right-3 z-50 text-white text-lg sm:text-xl md:text-2xl p-2 bg-gray-800 rounded-md"
        onClick={toggleMenu}
      >
        <i className={isOpen ? "ri-close-line" : "ri-menu-line"}></i>
      </button>

      {/* Sidenav container */}
      <div
        className={`w-[75%] sm:w-[60%] md:w-[20%] h-full border-r-2 border-zinc-400 
          fixed top-0 left-0 bg-gray-900 z-40
          md:relative md:bg-transparent
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300
          p-4 sm:p-6 md:p-10`}
      >
        {/* Logo/Title */}
        <h1 className='text-white text-lg sm:text-xl md:text-2xl font-bold flex items-center'>
          <i className="text-[#6556CD] ri-tv-fill text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3"></i>
          <span className='text-lg sm:text-xl md:text-2xl'>
            JAY PAWAR
          </span>
        </h1>

        {/* New Feeds Navigation */}
        <nav className='flex flex-col text-zinc-400 text-sm sm:text-base md:text-xl'>
          <h1 className='text-white font-semibold text-sm sm:text-base md:text-xl mt-6 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5'>
            New Feeds
          </h1>
          <Link
            to="/trending"
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-fire-fill"></i>Trending
          </Link>
          <Link
            to="/popular"
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-bard-fill"></i>Popular
          </Link>
          <Link
            to='/movie'
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-movie-2-fill"></i>Movies
          </Link>
          <Link
            to='/tv'
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-tv-2-fill"></i>Tv Shows
          </Link>
          <Link
            to='/person'
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-team-fill"></i>People
          </Link>
        </nav>

        <hr className='border-none h-[1px] bg-zinc-400 my-4 sm:my-6 md:my-0' />

        {/* Website Info Navigation */}
        <nav className='flex flex-col text-zinc-400 text-sm sm:text-base md:text-xl'>
          <h1 className='text-white font-semibold text-sm sm:text-base md:text-xl mt-4 sm:mt-8 md:mt-10 mb-3 sm:mb-4 md:mb-5'>
            Website Information
          </h1>
          <Link
            to='/about'
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-information-2-fill"></i>About
          </Link>
          <Link
            to='/contact'
            className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-3 sm:p-4 md:p-5'
            onClick={() => setIsOpen(false)}
          >
            <i className="mr-1 sm:mr-2 ri-phone-fill"></i>Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Sidenav;