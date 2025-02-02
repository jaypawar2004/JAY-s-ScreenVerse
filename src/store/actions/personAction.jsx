export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`); 
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    const thedetail = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data.cast || [],
      tvCredits: tvCredits.data.cast || [],
      movieCredits: movieCredits.data.cast || [],
    };
    dispatch(loadperson(thedetail));

    console.log(thedetail);
  } catch (error) {
    console.log("Error : ", error);
  }
};
