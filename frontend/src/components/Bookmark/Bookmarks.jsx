import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks, removeBookmark } from "../../actions/bookmark";
import Container from "../Container/Container"; // Make sure this path is correct
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // Make sure this path is correct
import "./Bookmarks.css"; // Ensure you have this CSS file

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { bookmarks, loading } = useSelector((state) => state.bookmark);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getBookmarks());
    }
  }, [isAuthenticated, dispatch]);

  const handleRemoveBookmark = (id) => {
    dispatch(removeBookmark(id));
  };

  return (
    <Container>
      <section className="home">
        <div className="dark-overlay">
          <div className="home-inner">
            <h1 className="x-large">Your Bookmarks</h1>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="bookmarks-list">
                {bookmarks.map((bookmark) => (
                  <div key={bookmark._id} className="bookmark-item">
                    <h2>{bookmark.title}</h2>
                    <button
                      className="btn-demo"
                      onClick={() => handleRemoveBookmark(bookmark._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Bookmarks;
