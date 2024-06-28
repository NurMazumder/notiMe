import React, { useState, useEffect } from "react";
import BookmarkRow from "../BookRow/BookRow";
import Loading from "../LoadingSpinner/LoadingSpinner";

const Bookmarks = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/bookmark/retrieve", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
        const data = await response.json();
        setBookmarkList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const filterBookmarks = (title) => {
    const filteredBookmarks = bookmarkList.filter(
      (bookmarkTitle) => bookmarkTitle !== title
    );
    setBookmarkList(filteredBookmarks);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mt-5 mb-4">My Bookmarks</h2>
          {bookmarkList.length > 0 ? (
            <ul>
              {bookmarkList.map((title) => (
                <li key={title} className="mb-3">
                  <BookmarkRow title={title} onClick={filterBookmarks} />
                </li>
              ))}
            </ul>
          ) : (
            <h2>You haven't added any bookmarks yet. Find reads you like!</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Bookmarks;
