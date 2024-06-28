// src/actions/bookmarkActions.js
import axios from "axios";
import { GET_BOOKMARKS, BOOKMARKS_ERROR } from "./constants";

// Get bookmarks
export const getBookmarks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/bookmark/retrieve");
    dispatch({
      type: GET_BOOKMARKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOOKMARKS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
