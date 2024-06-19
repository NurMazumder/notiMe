import React, { useState } from "react";
import axios from "axios";
import "./Demo.css";

const Demo = () => {
  const [url, setUrl] = useState("");
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/scrape", { url });
      setChapters([
        response.data.chapter1,
        response.data.chapter2,
        response.data.chapter3,
        response.data.chapter4,
        response.data.chapter5,
      ]);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
      setLoading(false);
    }
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
