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
      className="relative w-screen h-[210vh] px-[10%]"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center text-xl gap-10">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-long-line"
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
      <div className="w-full flex mt-5">
        <img
          className="shadow-lg h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path || ""
          }`}
          alt="Poster"
        />
        <div className="content ml-10 text-white">
          <h1 className="text-4xl font-black">
            {info.detail.name || info.detail.title || "Untitled"}
            <small className="text-xl font-light text-zinc-200">
              ({info.detail.first_air_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="flex mb-3 items-center gap-x-5">
            <span className="font-semibold rounded-full text-center flex items-center justify-center bg-orange-400 w-[7vh] h-[7vh]">
              {(info.detail.vote_average * 10).toFixed() || "0"} <sup>%</sup>
            </span>
            <h1 className="font-bold text-xl -ml-3">User Score</h1>
            <h1>{info.detail.first_air_date || "N/A"}</h1>
            <h1>{info.detail.genres?.map((g) => g.name).join(", ") || "N/A"}</h1>
            <h1>{info.detail.episode_run_time?.[0] || "N/A"} min</h1>
          </div>

          <h1 className="text-xl italic font-semibold">{info.detail.tagline || "No tagline"}</h1>
          <h1 className="text-xl font-semibold mt-5">Overview</h1>
          <p>{info.detail.overview || "No description available."}</p>

          <Link
            className="text-white px-5 py-3 mt-5 inline-block rounded-md bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-2xl mr-2"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Watch Providers */}
      {info.watchproviders && (
        <div className="w-[80%] mt-5 flex flex-col">
          {["flatrate", "rent", "buy"].map((type) =>
            info.watchproviders[type] ? (
              <div key={type} className="flex gap-x-3 items-center text-white">
                <h1>Available on {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                {info.watchproviders[type].map((w) => (
                  <img
                    key={w.provider_id}
                    title={w.provider_name}
                    className="w-[5vh] h-[5vh] object-cover rounded bg-red-300"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt=""
                  />
                ))}
              </div>
            ) : null
          )}
        </div>
      )}

      {/* Seasons */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-4xl mt-5 font-bold text-white">Seasons</h1>
      <div className="w-full flex overflow-x-auto mb-5 p-5">
        {info.detail.seasons?.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div key={i} className="w-[15vw] mr-[5%]">
              <img
                className="shadow-lg h-[40vh] min-w-[15vw] object-cover"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path || ""}`}
                alt=""
              />
              <h1 className="text-zinc-200 font-semibold text-lg mt-3">{s.name || "Untitled"}</h1>
            </div>
          ))
        ) : (
          <h1 className="text-white font-black">Nothing to show</h1>
        )}
      </div>

      {/* Recommendations */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-4xl mt-5 font-bold text-white">Recommendation & Similar</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      <Outlet />
    </div>
  );
};

export default TvDetails;
