import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import axios from "axios";
import Accordion from "../Accordion/Accordion";

const BookmarkRow = ({ id, setAlert, onClick, title }) => {
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        // Replace `title` with the actual title variable you're using
        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(`/api/scrape/title?title=${encodedTitle}`);
        const bookmarkData = await response.json();

        if (response.ok) {
          setBookmark(bookmarkData);
        } else {
          setAlert(
            bookmarkData.error || "Failed to retrieve bookmark data!",
            "danger"
          );
        }
      } catch (error) {
        setAlert("Failed to retrieve bookmark data!", "danger");
      }
    };

    fetchBookmark();
  }, [title, setAlert]);

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/bookmark/delete/${id}`);
      onClick(id);
      setAlert("Bookmark removed successfully", "success");
    } catch (error) {
      setAlert("Failed to remove bookmark!", "danger");
    }
  };

  return (
    <div className="bookmark-row">
      {bookmark && (
        <>
          <Link to={`/read/${id}`}>
            <div className="bookmark-row-container">
              <img
                src={bookmark.imgURL}
                alt="Bookmark Image"
                id="bookmark-row-image"
              />
              <h4>{bookmark.title}</h4>
              <p>Release Date: {bookmark.releaseDate?.substring(0, 10)}</p>
              <p>Genres: {bookmark.genres?.join(", ")}</p>
              <p>Platforms: {bookmark.platforms?.join(", ")}</p>
            </div>
          </Link>
          <button id="remove-button" onClick={handleRemove}>
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default connect(null, { setAlert })(BookmarkRow);
