import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), 
          url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: 'center top 10%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-full h-[45vh] sm:h-[50vh] md:h-[55vh] flex flex-col justify-end items-start p-4 sm:p-6 md:p-[5%]"
    >
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="text-white mt-2 sm:mt-3 text-xs sm:text-sm md:text-base w-full sm:w-[80%] md:w-[60%] line-clamp-3">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400 hover:text-blue-300"
        >
          more
        </Link>
      </p>
      <p className="text-white mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
        <i className="text-red-700 ri-megaphone-fill"></i>
        {data.release_date || data.first_air_date || 'N/A'}
        <i className="text-red-700 ri-base-station-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556CD] p-2 sm:p-3 rounded mt-3 sm:mt-5 text-white font-semibold text-sm sm:text-base hover:bg-[#5544b3] transition-colors"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;