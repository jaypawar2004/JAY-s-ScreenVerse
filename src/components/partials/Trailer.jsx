import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category]?.info?.videos);
  console.log(ytvideo);

  return (
    <div className="fixed z-50 inset-0 bg-[rgba(0,0,0,0.9)] w-screen h-screen flex items-center justify-center p-4 sm:p-6">
      {/* Close Button */}
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] ri-close-fill text-white text-2xl sm:text-3xl md:text-4xl left-4 sm:left-6 top-4 sm:top-6 z-50"
      ></Link>

      {/* Video Player or Not Found */}
      {ytvideo ? (
        <div className="w-full max-w-[90vw] sm:max-w-[800px] h-auto aspect-video">
          <ReactPlayer
            controls
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            width="100%"
            height="100%"
            className="rounded-lg overflow-hidden"
          />
        </div>
      ) : (
        <div className="w-full max-w-[90vw] sm:max-w-[800px] h-[50vh] sm:h-[60vh] flex items-center justify-center">
          <NotFound />
        </div>
      )}
    </div>
  );
};

export default Trailer;