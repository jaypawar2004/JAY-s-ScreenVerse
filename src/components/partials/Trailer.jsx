import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
   const navigate = useNavigate()
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);
  return (
    <div className="absolute z-50 top-0 left-0 bg-[rgba(0,0,0,.6)] w-screen h-screen flex items-center justify-center">
     <Link
          onClick={() => navigate(-1)}
          className="absolute hover:text-[#6556CD] ri-close-fill text-white text-3xl left-[5%] top-[5%]"
        ></Link>
      <ReactPlayer
        height={600}
        width={800}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
    </div>
  );
};

export default Trailer;
