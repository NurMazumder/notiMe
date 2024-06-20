import {
  SCRAPE_SUCCESS,
  SCRAPE_FAIL,
  FETCH_SCRAPED_DATA_SUCCESS,
  FETCH_SCRAPED_DATA_FAIL,
} from "../actions/constants";

const initialState = {
  chapters: [],
  loading: false,
  error: null,
};

export default function demoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCRAPE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SCRAPE_FAIL:
    case FETCH_SCRAPED_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_SCRAPED_DATA_SUCCESS:
      return {
        ...state,
        chapters: [
          payload.chapter1,
          payload.chapter2,
          payload.chapter3,
          payload.chapter4,
          payload.chapter5,
        ],
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
