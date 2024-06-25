import axios from "axios";
import { setAlert } from "./alert";

// Add bookmark
export const addBookmark = (readId) => async (dispatch) => {
  try {
    const res = await axios.post("/api/bookmark", { readId });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: "BOOKMARK_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get bookmarks
export const getBookmarks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/bookmark/retrieve");
    dispatch({
      type: "GET_BOOKMARKS",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "BOOKMARK_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove bookmark
export const removeBookmark = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/bookmark/delete/${id}`);
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getBookmarks());
  } catch (err) {
    dispatch({
      type: "BOOKMARK_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
