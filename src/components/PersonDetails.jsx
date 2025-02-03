import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson } from "../store/actions/personAction";
import { removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      // cleanup
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[10%] h-[200vh] bg-[#1F1E24] w-screen">
      {/* part 1 navigation */}
      <nav className=" h-[10vh] w-full text-zinc-200 flex items-center text-xl gap-10 ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-long-line"
        ></Link>
      </nav>
      <div className="w-full flex">
        {/* part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 border-none h-[2px] bg-zinc-500" />
          {/* Socail midea Link */}
          <div className="text-xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
            >
              <i class="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.x.com/${info.externalid.twitter_id}/`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal info */}
          <h1 className="text-zinc-300 font-semibold text-2xl my-5">
            Personal info
          </h1>
          <h1 className="text-zinc-300  text-lg ">known for</h1>
          <h1 className="text-zinc-300  text-md ">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-zinc-300  text-lg mt-3 ">Gender</h1>
          <h1 className="text-zinc-300  text-md ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-zinc-300  text-lg mt-3 ">Birthday</h1>
          <h1 className="text-zinc-300  text-md ">{info.detail.birthday}</h1>
          <h1 className="text-zinc-300  text-lg mt-3 ">Deathday</h1>
          <h1 className="text-zinc-300  text-md ">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-zinc-300  text-lg mt-3 ">Place of birth</h1>
          <h1 className="text-zinc-300  text-md ">
            {info.detail.place_of_birth}
          </h1>
          <h1 className="text-zinc-300  text-lg mt-3 ">Also Known As</h1>
          <h1 className="text-zinc-300  text-md ">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* part 3 details and info */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-zinc-300 font-black text-6xl my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-zinc-300  text-lg font-semibold">Biography</h1>
          <p className="text-zinc-300  text-md mt-3 ">
            {info.detail.biography}
          </p>
          <h1 className="text-zinc-300 mt-5 text-lg font-semibold">Work For</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className=" w-full flex justify-between">
            <h1 className="text-zinc-300 mt-5 text-lg font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="list-disc p-5 text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-zinc-700 border-zinc-700 border-2">
           {info[category + "Credits"].cast.map((c,i)=>(

            <li className="hover:text-white mb-5 duration-300 cursor-pointer">
              <Link className="">
                <span> 
                  {" "}
                  {c.name ||
              c.title ||
              c.original_name ||
              c.original_title}</span>
                <span className="block ml-5">{c.character && `Character Name : ${c.character}`}</span>
              </Link>
            </li>
           ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
