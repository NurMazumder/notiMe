import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { scrapeWebsite } from "../../actions/demo";
import "../Demo/Demo.css";
import Container from "../../components/Container/Container";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import Bookmarks from "../../components/Bookmark/Bookmarks";

const Manhwa = () => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [bookmarks, setBookmarks] = useState([]); // State to manage bookmarks

  const dispatch = useDispatch();
  const { chapters, imgURL, title, loading, error } = useSelector(
    (state) => state.demo
  );
  const alert = useSelector((state) => state.alert);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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

  const handleAddToBookmark = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(
          setAlert("User must be logged in to add bookmarks.", "warning")
        );
        return;
      }

      const response = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ readId: title }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setAlert("Added to bookmark successfully!", "success"));
        setBookmarks((prevBookmarks) => {
          // Check if the bookmark already exists
          if (!prevBookmarks.includes(title)) {
            return [...prevBookmarks, title];
          }
          return prevBookmarks;
        });
      } else {
        dispatch(setAlert(data.msg || "Failed to add to bookmark.", "warning"));
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      dispatch(setAlert("Failed to add to bookmark", "danger"));
    }
  };

  useEffect(() => {
    // Fetch existing bookmarks when component mounts
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("/api/bookmark/retrieve", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setBookmarks(data); // Set bookmarks state
          } else {
            console.error("Failed to fetch bookmarks:", data.msg);
          }
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Container>
        <section className="home">
          <div className="dark-overlay">
            <div className="home-inner">
              <h1 className="x-large">Manhwa</h1>
              <p className="lead">
                This scrape the latest manhwa chapters from{" "}
                <a
                  href="https://asuracomic.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AsuraScans
                </a>
                , save them to our database, and keep the information updated
                periodically so you have the latest chapters. Head over to{" "}
                <a
                  href="https://asuracomic.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AsuraScans
                </a>{" "}
                to select your favorite manhwa and copy the URL to scrape.
                {!isAuthenticated && (
                  <>
                    {" "}
                    <Link to="/signup" rel="noopener noreferrer">
                      SIGN UP
                    </Link>{" "}
                    to save your favorites and get notified of new releases.
                  </>
                )}
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
              {loading && <LoadingSpinner />}{" "}
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
                      {isAuthenticated ? (
                        <button
                          onClick={handleAddToBookmark}
                          className="btn-bookmark"
                        >
                          +
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            dispatch(
                              setAlert(
                                "Please log in to add bookmarks.",
                                "warning"
                              )
                            )
                          }
                          className="btn-bookmark"
                        >
                          +
                        </button>
                      )}
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
              {alert && (
                <p className={`alert ${alert.type}`}>{alert.message}</p>
              )}
            </div>
          </div>
        </section>
      </Container>
      {isAuthenticated && (
        <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} /> // Pass bookmarks and setter as props
      )}
    </>
  );
};

export default Manhwa;
