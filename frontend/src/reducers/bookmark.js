// src/reducers/bookmarkReducer.js
import { GET_BOOKMARKS, BOOKMARKS_ERROR } from "../actions/constants";

const initialState = {
  bookmarks: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarks: payload,
        loading: false,
      };
    case BOOKMARKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
