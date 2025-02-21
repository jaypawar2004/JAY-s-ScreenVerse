import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.9)), 
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10% center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[190vh] lg:w-screen lg:min-h-screen md:h-[170vh] px-4 sm:px-6 md:px-[10%]"
    >
      {/* Part 1: Navigation */}
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center text-sm sm:text-lg md:text-xl gap-4 sm:gap-6 md:gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-long-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage} rel="noopener noreferrer">
          <i className="ri-external-link-line hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid?.wikidata_id}/`}
          rel="noopener noreferrer"
        >
          <i className="ri-earth-fill hover:text-[#6556CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid?.imdb_id}/`}
          rel="noopener noreferrer"
          className="hover:text-[#6556CD]"
        >
          IMDB
        </a>
      </nav>

      {/* Part 2: Poster and Details */}
      <div className="w-full flex flex-col md:flex-row md:gap-10">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-full md:w-auto h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover rounded-lg md:rounded-none"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.title || info.detail.name || "Movie Poster"}
          loading="lazy"
        />
        <div className="content mt-4 md:mt-0 md:ml-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
            <small className="text-base sm:text-lg md:text-xl font-normal text-zinc-200">
              ({info.detail.release_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 text-white mb-2 sm:mb-3 md:mb-3">
            <span className="text-white font-semibold rounded-full text-center flex items-center justify-center bg-orange-400 w-12 h-12 sm:w-14 sm:h-14 md:w-[7vh] md:h-[7vh] text-sm sm:text-base">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-bold text-sm sm:text-lg md:text-xl -ml-2 sm:-ml-3 md:-ml-3 w-[60px] leading-5 sm:leading-6">
              User Score
            </h1>
            <h1 className="text-xs sm:text-sm md:text-base">{info.detail.release_date || "N/A"}</h1>
            <h1 className="text-xs sm:text-sm md:text-base">{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1 className="text-xs sm:text-sm md:text-base">{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-white text-sm sm:text-lg md:text-xl italic font-semibold">
            {info.detail.tagline}
          </h1>
          <h1 className="text-white text-sm sm:text-lg md:text-xl font-semibold mt-3 md:mt-5">Overview</h1>
          <p className="text-white text-xs sm:text-sm md:text-base">{info.detail.overview}</p>
          <h1 className="text-white text-sm sm:text-lg md:text-xl font-semibold mt-3 md:mt-5">
            Movie Translated
          </h1>
          <p className="text-white text-xs sm:text-sm md:text-base mb-6 md:mb-10 w-full md:w-[40vw]">
            {info.translations?.join(", ") || "N/A"}
          </p>
          <Link
            className="text-white px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-md bg-[#6556CD] hover:bg-[#5544b3] transition-colors text-sm sm:text-base"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-lg sm:text-xl md:text-2xl mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3: Watch Providers */}
      <div className="w-full md:w-[80%] mt-6 md:mt-0 leading-[5vh] sm:leading-[6vh] md:leading-[7vh] flex flex-col justify-center">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-wrap gap-2 sm:gap-3 text-white items-center">
            <h1 className="text-xs sm:text-sm md:text-base">Available on Platform</h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[5vh] md:h-[5vh] object-cover rounded bg-red-300"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-wrap gap-2 sm:gap-3 text-white items-center">
            <h1 className="text-xs sm:text-sm md:text-base">Available on Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[5vh] md:h-[5vh] object-cover rounded bg-red-300"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-wrap gap-2 sm:gap-3 text-white items-center">
            <h1 className="text-xs sm:text-sm md:text-base">Available on Buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[5vh] md:h-[5vh] object-cover rounded bg-red-300"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4: Recommendation and Similar */}
      <hr className="mt-6 sm:mt-8 md:mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-xl sm:text-2xl md:text-4xl mt-3 sm:mt-4 md:mt-5 font-bold text-white">
        Recommendation & Similar
      </h1>
      <HorizontalCards
        data={info.recommendations?.length > 0 ? info.recommendations : info.similar}
      />
      <Outlet />
    </div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default MovieDetails;