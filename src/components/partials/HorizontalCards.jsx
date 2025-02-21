import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full flex overflow-x-auto overflow-y-hidden mb-4 sm:mb-5 p-3 sm:p-5 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[70%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[20%] h-[40vh] sm:h-[45vh] mr-3 sm:mr-5 mb-3 sm:mb-5 bg-zinc-900 rounded-lg shadow-lg"
          >
            <img
              className="w-full h-[50%] sm:h-[55%] object-cover rounded-t-lg"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`
                  : noimage
              }
              alt={d.name || d.original_name || d.original_title || 'Media'}
              loading="lazy"
            />

            <div className="text-white p-2 sm:p-3 h-[50%] sm:h-[45%] flex flex-col">
              <h1 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
                {d.name || d.original_name || d.original_title}
              </h1>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base line-clamp-2">
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-500"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-white font-black text-center w-full py-5 text-sm sm:text-base md:text-lg">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;