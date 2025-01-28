import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
  // console.log(data)
  return (
    <div 
    style={{background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.9)), 
      url(https://image.tmdb.org/t/p/original/${
      data.backdrop_path || data.profile_path}
    )`,
  backgroundPosition: 'top 10% center',
backgroundSize: 'cover',
}} 
    className='w-full h-[55vh] flex flex-col justify-end items-start p-[5%]'>
    <h1 className='text-white text-5xl font-black'>
      {data.name || data.title || data.original_name || data.original_title}</h1>
    <p className='text-white mt-3 w-[60%]'>{data.overview.slice(0, 200)}... 
      <Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more
    </Link>
    </p>
    <p className='text-white mt-3 flex gap-3'>
    <i className="text-red-700 ri-megaphone-fill"></i>{""}
    {data.release_date || data.first_air_date || 'N/A'}
    <i className=" text-red-700 ri-base-station-fill"></i>{""}
    {data.media_type.toUpperCase()}

    </p>
    <Link className='bg-[#6556CD] p-3 rounded mt-5 text-white font-semibold'>Watch Trailer</Link>
    </div>
  )
}

export default Header