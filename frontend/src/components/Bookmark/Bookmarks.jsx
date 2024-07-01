import React, { useState, useEffect } from "react";
import BookmarkRow from "../BookRow/BookRow";
import Loading from "../LoadingSpinner/LoadingSpinner";
import Container from "../Container/Container";

const Bookmarks = ({ bookmarks, setBookmarks }) => {
  const [bookmarkList, setBookmarkList] = useState(bookmarks);

  useEffect(() => {
    setBookmarkList(bookmarks); // Update state when prop changes
  }, [bookmarks]);

  const filterBookmarks = (title) => {
    const filteredBookmarks = bookmarkList.filter(
      (bookmarkTitle) => bookmarkTitle !== title
    );
    setBookmarks(filteredBookmarks); // Update parent state
  };

  return (
    <>
      <Container>
        <section className="home">
          <div className="dark-overlay">
            <div className="home-inner">
              <h1 className="x-large">Bookmarks</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                delectus suscipit consectetur quo maiores enim magni facere
                placeat, quidem consequatur odit beatae reprehenderit aliquam ut
                alias, voluptatem temporibus, fugiat sit.
              </p>
              {bookmarkList.length === 0 ? (
                <Loading />
              ) : (
                <div>
                  {bookmarkList.length > 0 ? (
                    <ul>
                      {bookmarkList.map((title) => (
                        <li key={title} className="mb-3">
                          <BookmarkRow
                            title={title}
                            onClick={() => filterBookmarks(title)}
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
