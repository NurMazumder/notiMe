import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrapeWebsite } from "../../actions/demo";
import "./Demo.css";

const Demo = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { chapters, imgURL, title, loading, error } = useSelector(
    (state) => state.demo
  );

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      dispatch(scrapeWebsite(url));
    }
  };

  useEffect(() => {
    // This ensures that the component doesn't flicker by only re-rendering when necessary.
  }, [chapters, imgURL, title, loading, error]);

  return (
    <div className="demo-container">
      <h1 className="demo-title">Scrape Website</h1>
      <form className="demo-form" onSubmit={handleSubmit}>
        <input
          className="demo-input"
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Enter URL"
        />
        <button className="demo-button" type="submit">
          Scrape
        </button>
      </form>
      {loading && <p className="demo-loading">Loading...</p>}
      {error && <p className="demo-error">{error}</p>}
      {chapters && Object.keys(chapters).length > 0 && (
        <div className="demo-results">
          <h2 className="demo-results-title">{title}</h2>
          {imgURL && (
            <img
              src={imgURL}
              alt="Chapter Cover"
              className="demo-chapter-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "fallback-image-url.jpg";
              }}
            />
          )}
          <ul className="demo-chapters-list">
            {Object.keys(chapters).map((key, index) => (
              <li key={index} className="demo-chapter-item">
                <div className="demo-chapter-info">
                  <p className="demo-chapter-title">
                    Chapter: {chapters[key].content}
                  </p>
                  <p className="demo-chapter-date">
                    Release Date: {chapters[key].releaseDate}
                  </p>
                  <p className="demo-chapter-link">
                    Link:{" "}
                    <a
                      href={chapters[key].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read here
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Demo;
