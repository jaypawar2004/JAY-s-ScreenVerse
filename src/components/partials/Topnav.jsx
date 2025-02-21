import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      GetSearches();
    } else {
      setSearches([]);
    }
  }, [query]);

  return (
    <div className="h-[10vh] w-full relative flex justify-start items-center px-4 sm:px-6 md:ml-[15%]">
      {/* Search Icon */}
      <i className="text-zinc-400 text-lg sm:text-xl md:text-xl ri-search-line"></i>

      {/* Input */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full sm:w-[70%] md:w-[50%] mx-4 sm:mx-6 md:mx-10 p-4 sm:p-5 md:p-6 text-sm sm:text-lg md:text-xl outline-none border-none bg-transparent text-zinc-200 placeholder-zinc-400"
        type="text"
        placeholder="Search"
      />

      {/* Clear Button */}
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-lg sm:text-xl md:text-xl ri-close-circle-line cursor-pointer hover:text-zinc-200"
        ></i>
      )}

      {/* Search Results Dropdown */}
      {query.length > 0 && (
        <div className="z-[100] w-full sm:w-[70%] md:w-[50%] max-h-[40vh] sm:max-h-[45vh] md:max-h-[50vh] absolute bg-zinc-200 top-[90%] left-0 sm:left-6 md:left-[calc(15%+2.5rem)] overflow-auto rounded shadow-lg">
          {searches.length > 0 ? (
            searches.map((s, i) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={i}
                className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-3 sm:p-4 md:p-5 flex items-center justify-start border-b-2 border-zinc-100"
                onClick={() => setQuery("")}
              >
                <img
                  className="w-[8vh] h-[8vh] sm:w-[9vh] sm:h-[9vh] md:w-[10vh] md:h-[10vh] object-cover mr-3 sm:mr-4 md:mr-5 rounded shadow-md"
                  src={
                    s.backdrop_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                      : noimage
                  }
                  alt={s.name || s.original_name || s.original_title || "Search result"}
                  loading="lazy"
                />
                <span className="text-sm sm:text-base md:text-base line-clamp-1">
                  {s.name || s.original_name || s.original_title}
                </span>
              </Link>
            ))
          ) : (
            <div className="p-3 sm:p-4 md:p-5 text-zinc-600 text-sm sm:text-base">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Topnav;