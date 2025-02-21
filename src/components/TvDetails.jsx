import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  if (!info || !info.detail) return <Loading />;

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.9)), 
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || ""})`,
        backgroundPosition: "top 10% center",
        backgroundSize: "cover",
      }}
      className="relative lg:w-screen lg:h-[220vh] w-screen h-[190vh] px-4 md:px-[10%] pb-10"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center text-lg md:text-xl gap-6 md:gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-long-line text-2xl"
        ></Link>
        {info.detail.homepage && (
          <a target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-line"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
          >
            <i className="ri-earth-fill"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            IMDB
          </a>
        )}
      </nav>

      {/* Poster & Details */}
      <div className="w-full flex flex-col md:flex-row mt-5 gap-6 md:gap-0">
        <img
          className="shadow-lg h-[40vh] md:h-[60vh] w-full md:w-auto object-cover rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path || ""
          }`}
          alt="Poster"
        />
        <div className="content md:ml-10 text-white">
          <h1 className="text-2xl md:text-4xl font-black">
            {info.detail.name || info.detail.title || "Untitled"}
            <small className="text-lg md:text-xl font-light text-zinc-200">
              ({info.detail.first_air_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-x-5 mb-3">
            <span className="font-semibold rounded-full text-center flex items-center justify-center bg-orange-400 w-12 h-12 md:w-[7vh] md:h-[7vh] text-sm md:text-base">
              {(info.detail.vote_average * 10).toFixed() || "0"} <sup>%</sup>
            </span>
            <h1 className="font-bold text-lg md:text-xl -ml-2 md:-ml-3">User Score</h1>
            <h1 className="text-sm md:text-base">{info.detail.first_air_date || "N/A"}</h1>
            <h1 className="text-sm md:text-base">{info.detail.genres?.map((g) => g.name).join(", ") || "N/A"}</h1>
            <h1 className="text-sm md:text-base">{info.detail.episode_run_time?.[0] || "N/A"} min</h1>
          </div>

          <h1 className="text-lg md:text-xl italic font-semibold">{info.detail.tagline || "No tagline"}</h1>
          <h1 className="text-lg md:text-xl font-semibold mt-5">Overview</h1>
          <p className="text-sm md:text-base">{info.detail.overview || "No description available."}</p>

          <Link
            className="text-white px-4 py-2 md:px-5 md:py-3 mt-5 inline-block rounded-md bg-[#6556CD] text-sm md:text-base"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-xl md:text-2xl mr-2"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Watch Providers */}
      {info.watchproviders && (
        <div className="w-full md:w-[80%] mt-5 flex flex-col gap-4">
          {["flatrate", "rent", "buy"].map((type) =>
            info.watchproviders[type] ? (
              <div key={type} className="flex flex-col md:flex-row gap-3 items-start md:items-center text-white">
                <h1 className="text-sm md:text-base">
                  Available on {type.charAt(0).toUpperCase() + type.slice(1)}
                </h1>
                <div className="flex gap-3 flex-wrap">
                  {info.watchproviders[type].map((w) => (
                    <img
                      key={w.provider_id}
                      title={w.provider_name}
                      className="w-10 h-10 md:w-[5vh] md:h-[5vh] object-cover rounded bg-red-300"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      {/* Seasons */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl md:text-4xl mt-5 font-bold text-white">Seasons</h1>
      <div className="w-full flex overflow-x-auto mb-5 p-5 gap-4">
        {info.detail.seasons?.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div key={i} className="w-[40vw] md:w-[15vw] flex-shrink-0">
              <img
                className="shadow-lg h-[30vh] md:h-[40vh] w-full object-cover rounded"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path || ""}`}
                alt=""
              />
              <h1 className="text-zinc-200 font-semibold text-base md:text-lg mt-3">{s.name || "Untitled"}</h1>
            </div>
          ))
        ) : (
          <h1 className="text-white font-black text-lg md:text-xl">Nothing to show</h1>
        )}
      </div>

      {/* Recommendations */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-2xl md:text-4xl mt-5 font-bold text-white">Recommendation & Similar</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      <Outlet />
    </div>
  );
};

export default TvDetails;