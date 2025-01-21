import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <>
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10'>
      <h1 className='text-white text-2xl font-bold'>
      <i className="text-[#6556CD] ri-tv-fill text-2xl mr-3"></i>
       <span className='text-2xl'>
       JAY PAWAR
        </span> 
      </h1>
      <nav className=' flex flex-col text-zinc-400 text-xl '>
        
      <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
        New Feeds
        </h1>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class=" mr-2 ri-fire-fill"></i> Trending
     </Link>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class="mr-2 ri-bard-fill"></i>Popular
     </Link>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class="mr-2 ri-movie-2-fill"></i>Movies
     </Link>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class="mr-2 ri-tv-2-fill"></i>Tv Shows
     </Link>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class="mr-2 ri-team-fill"></i> People
     </Link>
      </nav>
      <hr className='border-none h-[1px] bg-zinc-400' />
      <nav className=' flex flex-col text-zinc-400 text-xl'>
        
      <h1 className='text-white font-semibold text-xl mt-10 mb-5'>
        Website Information
        </h1>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class="mr-2 ri-information-2-fill"></i> About
     </Link>
     <Link className='hover:bg-[#6556CD] hover:text-white rounded duration-300 p-5'>
     <i class="mr-2 ri-phone-fill"></i>Contact Us
     </Link>
    
      </nav>
    </div>
    </>
  )
}

export default Sidenav