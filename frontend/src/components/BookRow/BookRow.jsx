import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import axios from "axios";
import Accordion from "../Accordion/Accordion";

const BookmarkRow = ({ setAlert, onClick, title, isAuthenticated }) => {
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(`/api/scrape/title?title=${encodedTitle}`);
        const bookmarkData = await response.json();

        if (response.ok) {
          // Convert the chapters from the fetched data into an array
          const chapters = Object.keys(bookmarkData)
            .filter((key) => key.startsWith("chapter"))
            .map((key) => bookmarkData[key]);

          // Create a new bookmark object with chapters as an array
          const transformedBookmark = {
            ...bookmarkData,
            chapters: chapters,
          };

          setBookmark(transformedBookmark);
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
      const token = localStorage.getItem("token");
      await axios.delete(`/api/bookmark/delete/${encodeURIComponent(title)}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      onClick(title);
      setAlert("Bookmark removed successfully", "success");
    } catch (error) {
      setAlert("Failed to remove bookmark!", "danger");
    }
  };

  return (
    <div className="bookmark-row">
      {bookmark && (
        <>
          <Accordion
            imgURL={bookmark.imgURL}
            title={bookmark.title}
            isAuthenticated={isAuthenticated}
            setAlert={setAlert}
            chapters={bookmark.chapters}
            dispatch={() => {}}
            handleRemove={handleRemove} // Pass handleRemove as a prop
          />
        </>
      )}
    </div>
  );
};

export default connect(null, { setAlert })(BookmarkRow);
