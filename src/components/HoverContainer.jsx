import React, { useState, useEffect } from 'react';
import '../styles/HoverContainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faThumbsUp, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const HoverContainer = ({ image, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a delay for the hover container to appear
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay of 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`hover-container ${isVisible ? 'visible' : ''}`}>
      <div className="hover-image-container">
        <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} />
        <div className="movie-title">{title}</div> 
      </div>
      <div className="hover-details-container">
        <div className="hover-icons-left">
          <button className="icon-button play-button">
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
        <div className="hover-icons-right">
          <button className="icon-button">
            <FontAwesomeIcon icon={faChevronUp} flip="vertical" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoverContainer;
