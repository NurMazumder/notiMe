import React, { useState, useEffect } from "react";
import BookmarkRow from "../BookRow/BookRow";
import Loading from "../LoadingSpinner/LoadingSpinner";
import Container from "../Container/Container";

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
      <Container>
        <section className="home">
          <div className="dark-overlay">
            <div className="home-inner">
              <h1 className="x-large">Bookmarks</h1>
              <p style={{ width: "890px" }}>&nbsp;</p>{" "}
              {/* Adjust the height as needed */}
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {bookmarkList.length > 0 ? (
                    <ul>
                      {bookmarkList.map((title) => (
                        <li key={title} className="mb-3">
                          <BookmarkRow
                            title={title}
                            onClick={filterBookmarks}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <h2>
                      You haven't added any bookmarks yet. Find reads you like!
                    </h2>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Bookmarks;
