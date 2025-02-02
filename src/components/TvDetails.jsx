import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      // cleanup
      dispatch(removetv());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.9)), 
      url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}
    )`,
        backgroundPosition: "top 10% center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[210vh] px-[10%]"
    >
      {/* part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center text-xl gap-10 ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-long-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </a>
      </nav>

      {/* part 2 Poster and details */}

      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content ml-10">
          <h1 className="text-4xl font-black text-white ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl font text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex mb-3 text-white items-center gap-x-5">
            <span className=" text-white font-semibold rounded-full text-center flex items-center justify-center bg-orange-400 w-[7vh] h-[7vh]">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-bold text-xl -ml-3 w-[60px] leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-white text-xl italic font-semibold">
            {info.detail.tagline}
          </h1>
          <h1 className="text-white text-xl font-semibold mt-5">Overview</h1>
          <p className="text-white">{info.detail.overview}</p>
          <h1 className="text-white text-xl font-semibold mt-5">
            tv translated
          </h1>
          <p className="text-white mb-10 w-[40vw]">
            {info.translations.join(", ")}
          </p>
          <Link
            className="text-white px-5 py-3 rounded-md bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-2xl mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      <div className="w-[80%] leading-[7vh] flex flex-col justify-center">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-3 items-center text-white">
            <h1 className="">Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded bg-red-300"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-3 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded bg-red-300"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-3 items-center text-white">
            <h1>Available on Buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded bg-red-300"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 seasons */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-4xl mt-5 font-bold text-white">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
        {info.detail.langth > 0 ? info.detail.seasons.map((s,i) => (
            <div className="w-[15vw] mr-[5%]">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] min-w-[15vw] object-cover"
                src={`https://image.tmdb.org/t/p/original/${
                  s.poster_path ||
                  s.backdrop_path
                  
                }
    `}
                alt=""
              />

              <h1 className="text-zinc-200 font-semibold text-lg mt-3">
                {s.name ||
                  s.title ||
                  s.original_name ||
                  s.original_title}
              </h1>
            </div>
          )
        ): <h1 className='text-white font-black'>Nothing to show</h1>}
      </div>
      {/* Part 5 Recommendation and Similar Stuff */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-4xl mt-5 font-bold text-white">
        {" "}
        Recommendation & Similar
      </h1>
      <HorizontalCards
        data={
          info.recommendations.langth > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
