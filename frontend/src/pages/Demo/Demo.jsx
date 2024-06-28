import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { scrapeWebsite } from "../../actions/demo";
import "./Demo.css";
import Container from "../../components/Container/Container";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import Accordion from "../../components/Accordion/Accordion"; // Import Accordion component

const Demo = () => {
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { chapters, imgURL, title, loading, error } = useSelector(
    (state) => state.demo
  );
  const alert = useSelector((state) => state.alert);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Assuming you have an auth slice in your state

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      dispatch(scrapeWebsite(url));
    }
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
        body: JSON.stringify({ readId: title }), // Assuming `title` is the id
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setAlert("Added to bookmark successfully!", "success"));
      } else {
        dispatch(setAlert(data.msg || "Failed to add to bookmark.", "warning"));
      }
    } catch (error) {
      console.error("Error adding to bookmark:", error);
      dispatch(setAlert("Failed to add to bookmark", "danger"));
    }
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
              This demo showcases our ability to scrape the latest manhwa
              chapters from{" "}
              <a
                href="https://asuracomic.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AsuraScans
              </a>
              , save them to our database, and keep the information updated
              periodically, so you have the latest chapters. Head over to{" "}
              <a
                href="https://asuracomic.net/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AsuraScans
              </a>{" "}
              to select your favorite manhwa and copy the URL to demo the
              scrape.{" "}
              <Link to="/signup" rel="noopener noreferrer">
                SIGN UP
              </Link>{" "}
              to save your favorites and get notified of new releases.
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
            {/* Render the spinner when loading */}
            {error && <p className="lead">{error}</p>}
            {chapters && Object.keys(chapters).length > 0 && (
              <Accordion
                imgURL={imgURL}
                title={title}
                isAuthenticated={isAuthenticated}
                handleAddToBookmark={handleAddToBookmark}
                setAlert={setAlert}
                chapters={chapters}
                dispatch={dispatch}
              />
            )}
            {alert && <p className={`alert ${alert.type}`}>{alert.message}</p>}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Demo;
