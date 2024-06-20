import axios from "axios";
import { setAlert } from "./alert";
import {
  SCRAPE_SUCCESS,
  SCRAPE_FAIL,
  FETCH_SCRAPED_DATA_SUCCESS,
  FETCH_SCRAPED_DATA_FAIL,
} from "./constants";

// Scrape website and save to DB
export const scrapeWebsite = (url) => async (dispatch) => {
  try {
    await axios.post("/api/scrape", { url });

    dispatch({
      type: SCRAPE_SUCCESS,
    });

    // Fetch the scraped data
    dispatch(fetchScrapedData(url));
  } catch (err) {
    dispatch(setAlert("Invalid URL", "danger"));

    dispatch({
      type: SCRAPE_FAIL,
    });
  }
};

// Fetch scraped data from DB
export const fetchScrapedData = (url) => async (dispatch) => {
  try {
    const res = await axios.get("/api/scrape", { params: { url } });

    dispatch({
      type: FETCH_SCRAPED_DATA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Invalid URL", "danger"));

    dispatch({
      type: FETCH_SCRAPED_DATA_FAIL,
    });
  }
};
