import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrapeWebsite } from "../../actions/demo";
import "./Demo.css";

const Demo = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { chapters, loading, error } = useSelector((state) => state.demo);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(scrapeWebsite(url));
  };

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
      {chapters.length > 0 && (
        <div className="demo-results">
          <h2 className="demo-results-title">Scraped Chapters</h2>
          <ul className="demo-chapters-list">
            {chapters.map((chapter, index) => (
              <li key={index} className="demo-chapter-item">
                <p className="demo-chapter-title">Title: {chapter.content}</p>
                <p className="demo-chapter-number">
                  Chapter Number: {chapter.url}
                </p>
                <p className="demo-chapter-date">
                  Release Date: {chapter.releaseDate}
                </p>
                <p className="demo-chapter-link">
                  Link:{" "}
                  <a
                    href={chapter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read here
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Demo;
