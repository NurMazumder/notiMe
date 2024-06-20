import {
  SCRAPE_SUCCESS,
  SCRAPE_FAIL,
  FETCH_SCRAPED_DATA_SUCCESS,
  FETCH_SCRAPED_DATA_FAIL,
  SCRAPE_REQUEST,
  FETCH_SCRAPED_DATA_REQUEST,
} from "../actions/constants";

const initialState = {
  chapters: {},
  imgURL: "",
  title: "",
  loading: false,
  error: null,
};

export default function demoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SCRAPE_REQUEST:
    case FETCH_SCRAPED_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
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
        chapters: {
          chapter1: payload.chapter1,
          chapter2: payload.chapter2,
          chapter3: payload.chapter3,
          chapter4: payload.chapter4,
          chapter5: payload.chapter5,
        },
        imgURL: payload.imgURL,
        title: payload.title,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
