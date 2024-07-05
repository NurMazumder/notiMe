import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ManhwaCards.css";

const ManhwaCards = () => {
  const [manhwas, setManhwas] = useState([]);
  const [selectedManhwa, setSelectedManhwa] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const fetchRandomManhwas = async () => {
      try {
        const response = await axios.get("/api/scrape/random");
        setManhwas(response.data);
      } catch (error) {
        console.error("Error fetching random manhwas:", error);
      }
    };

    fetchRandomManhwas();
  }, []);

  const handleCardClick = (manhwa) => {
    setSelectedManhwa(manhwa);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedManhwa(null);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className="home">
      <div className="dark-overlay">
        <div className="home-inner">
          <h1 className="x-large">Manhwa's to checkout</h1>
          <div className="manhwa-cards-container">
            {manhwas.map((manhwa, index) => (
              <div
                key={index}
                className="manhwa-card"
                onClick={() => handleCardClick(manhwa)}
              >
                <img
                  src={manhwa.imgURL}
                  alt={manhwa.title}
                  className="manhwa-card-image"
                />
                <h3 className="manhwa-card-title">{manhwa.title}</h3>
              </div>
            ))}

            {isPopupOpen && selectedManhwa && (
              <div className="popup">
                <div className="accordion_" ref={popupRef}>
                  <div className="accordion-header_" onClick={handleClosePopup}>
                    <img
                      src={selectedManhwa.imgURL}
                      alt={selectedManhwa.title}
                      className="accordion-image_"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "fallback-image-url.jpg";
                      }}
                    />
                    <h2 className="lead">{selectedManhwa.title}</h2>
                    <button className="close-button">&times;</button>
                  </div>
                  <ul className="accordion-content_">
                    {Object.keys(selectedManhwa).map((key, index) => {
                      if (key.startsWith("chapter")) {
                        const chapter = selectedManhwa[key];
                        return (
                          <li key={index} className="accordion-item_">
                            <div className="accordion-item-info_">
                              <span className="lead">{chapter.content}</span>
                              <span className="lead">
                                {chapter.releaseDate}
                              </span>
                              <span className="lead">
                                <a
                                  href={chapter.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Read here
                                </a>
                              </span>
                            </div>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManhwaCards;
