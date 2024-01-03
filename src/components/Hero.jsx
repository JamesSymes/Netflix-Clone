import React from 'react';
import '../styles/Hero.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <div className="hero">
      {/* Mobile-specific container and buttons */}
      <div className="hero__mobile-container">
        <img src="/black-mirror-mobile-2.png" alt="Black Mirror" className="hero__image--mobile" />
        <div className="hero-buttons-mobile">
          <button className="hero-button-mobile play">
            <FontAwesomeIcon icon={faPlay} /> Play
          </button>
          <button className="hero-button-mobile plus">
            <FontAwesomeIcon icon={faPlus} /> My List
          </button>
        </div>
      </div>

      {/* Existing desktop structure */}
      <img src="/black-mirror-desktop-1.png" alt="Black Mirror" className="hero__image" />
      <div className="hero-title-section">
        <img src="/black-mirror-desktop-title-1.png" alt="Black Mirror" className="hero__title-image" />
        <p className='hero-description'>Hi Black Mirror, a British dystopian sci-fi series by Charlie Brooker, delves into modern society's unanticipated consequences of new technologies.</p>
        <div className="hero-buttons">
          <button className="hero-button play">
            <FontAwesomeIcon icon={faPlay} /> Play
          </button>
          <button className="hero-button info">
            <FontAwesomeIcon icon={faInfoCircle} className="hero-button-icon"/> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
