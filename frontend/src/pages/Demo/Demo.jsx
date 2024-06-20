import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrapeWebsite } from "../../actions/demo";
import "./Demo.css";
import Container from "../../components/Container/Container";

const Demo = () => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Set the accordion to be open by default
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

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // This ensures that the component doesn't flicker by only re-rendering when necessary.
  }, [chapters, imgURL, title, loading, error]);

  return (
    <Container>
      <section className="home">
        <div className="dark-overlay">
          <div className="home-inner">
            <h1 className="x-large">Demo</h1>
            <p className="lead">
              This demo showcases our ability to scrape the latest manga
              chapters from{" "}
              <a
                href="https://asuracomic.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AsuraScans
              </a>
              , save them to our database, and keep the information updated
              periodically. Head over to AsuraScans to select your favorite
              manga to read. Sign up to save your favorites and get notified of
              new releases.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                className="demo-input"
                type="text"
                value={url}
                onChange={handleChange}
                placeholder="Enter URL"
              />
              <button className="btn-demo" type="submit">
                Scrape
              </button>
            </form>
            {loading && <p className="lead">Loading...</p>}
            {error && <p className="lead">{error}</p>}
            {chapters && Object.keys(chapters).length > 0 && (
              <div className="demo-results">
                <div className="accordion">
                  <div
                    className="accordion-header"
                    onClick={handleAccordionClick}
                  >
                    <img
                      src={imgURL}
                      alt="Manga Cover"
                      className="accordion-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "fallback-image-url.jpg";
                      }}
                    />
                    <h2 className="lead">{title}</h2>
                  </div>
                  {isOpen && (
                    <ul className="accordion-content">
                      {Object.keys(chapters).map((key, index) => (
                        <li key={index} className="accordion-item">
                          <div className="accordion-item-info">
                            <span className="lead">
                              {chapters[key].content}
                            </span>
                            <span className="lead">
                              {chapters[key].releaseDate}
                            </span>
                            <span className="lead">
                              <a
                                href={chapters[key].url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Read here
                              </a>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Demo;
