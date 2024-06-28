import React, { useState } from "react";
import "./Accordion.css"; // Add CSS styles specific to the Accordion component

const Accordion = ({
  imgURL,
  title,
  isAuthenticated,
  handleAddToBookmark,
  setAlert,
  chapters,
  dispatch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
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
          <button onClick={handleAddToBookmark} className="btn-bookmark">
            Add to Bookmark
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch(setAlert("Please log in to add bookmarks.", "warning"))
            }
            className="btn-bookmark"
          >
            +
          </button>
        )}
        <span className="accordion-toggle-icon">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <ul className="accordion-content">
            {Object.keys(chapters).map((key, index) => (
              <li key={index} className="accordion-item">
                <div className="accordion-item-info">
                  <span className="lead">{chapters[key].content}</span>
                  <span className="lead">{chapters[key].releaseDate}</span>
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
        </div>
      )}
    </div>
  );
};

export default Accordion;
