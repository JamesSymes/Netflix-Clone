// Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import useWindowWidth from '../hooks/useWindowWidth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown, faTimes, faBell, faTv, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.scss';


const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [navActive, setNavActive] = useState(true);

  const width = useWindowWidth();
  const isMobile = width <= 768;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 
  const handleSearchClick = () => {
    setSearchActive(!searchActive);
    setNavActive(!navActive);
    document.body.classList.toggle('no-scroll');
  };

  const handleCloseClick = () => {
    setSearchActive(false);
    setNavActive(true);
    document.body.classList.remove('no-scroll');
  };

  return (
     <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {isMobile ? (
        <>
          <div className="header__top">
            <Link to="/" className="header__logo">
              {isMobile ? (
                <span className="header__logo-text">My Netflix</span>
              ) : (
                <img src="../Netflix_Logo_RGB.png" alt="MovieApp Logo" />


              )}
            </Link>


                      <div className={`header__search ${searchActive ? 'active' : ''}`}>
            <input
              type="text"
              className={`header__search-input ${searchActive ? 'active' : ''}`}
              placeholder="Titles, people, genres"
            />
            

<div className="header__icons-mobile">
              {/* TV Icon for mobile */}
              <FontAwesomeIcon icon={faTv} className="header__tv-icon" />
            <button onClick={handleSearchClick} className="header-search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>


          
            {isMobile && searchActive && (
        <div className="search-container">
          <div className="search-container-2">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="back-arrow-icon"
            onClick={handleCloseClick}
          />
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="mobile-search-icon" />
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search games, programmes, films..."
            />
            
            </div>
          </div>
        </div>
      )}
      

         


          </div>
                  </div>
                  </div>
                   {/* Conditional Rendering of Navigation Menu */}
                   {navActive && (
            <nav className={`header__nav`}>
              
                      <ul>
                        {/* Moved About and Contact links before Categories */}
      <li><Link to="/">Series</Link></li>
      <li><Link to="/">Films</Link></li>
                      <li className="dropdown">
                    

  <a href="#" onClick={() => setShowGenres(!showGenres)}>Categories <FontAwesomeIcon icon={faCaretDown} /></a>
  {showGenres && (
    <div className="fullscreen-dropdown"> {/* A full-screen wrapper for the dropdown */}
      <ul className="dropdown-content">
        {genres.map(genre => (
          <li key={genre.id}>
            <Link to="/">{genre.name}</Link>
          </li>
        ))}
      </ul>
      <div className="dropdown-close-button"> {/* A div for the close button to ensure it stays at the bottom */}
      <button onClick={() => setShowGenres(false)} className="close-button">
  <FontAwesomeIcon icon={faTimes} className="close-icon" />
</button>

      </div>
    </div>
  )}
</li>
                      </ul>
                      </nav>
          )}
                  
              </>
          ) : (
              <>

              {/* Desktop Version  */}
                  <div className="header__content">
                  <Link to="/" className="header__logo">
    <img src="/Netflix_Logo_RGB.png" alt="MovieApp Logo" />
</Link>
                      <nav>
                          <ul className="header__nav">
                          <li className="header-home-bold"><Link to="/">Home</Link></li>
                          <li><Link to="/">Series</Link></li>
                          <li><Link to="/">Films</Link></li>
                          
                              <li><Link to="/popular-movies">New & Popular</Link></li>
                          <li><Link to="/">My List</Link></li>
                          <li><Link to="/">Browse by Languages</Link></li>    
                          </ul>
                      </nav>
                  </div>
                  <div className="header__right">
  <div className={`header__search ${searchActive ? 'active' : ''}`}>
    <input
      type="text"
      className={`header__search-input ${searchActive ? 'active' : ''}`}
      placeholder="Titles, people, genres"
    />
    <button onClick={handleSearchClick} className={`header-search-button ${searchActive ? 'active' : ''}`}>
      <FontAwesomeIcon icon={faSearch} />
    </button>
  </div>
  <li><Link to="/" className='nav-children'>Children</Link></li>
  {/* Bell icon and static count */}
  <div className="header__bell">
    <Link to="/">
      <span className="header-bell-count">3</span>
      <span role="img" aria-label="bell" className="header-bell-symbol">
        <FontAwesomeIcon icon={faBell} />
      </span>
    </Link>
</div>
<div className="header__avatar-dropdown">
    <img src="/avatar-1.png" alt="User Avatar" className="header__avatar" />
    <div className="header__dropdown-icon">
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  </div>
</div>
        </>
      )}


    </header>
  );
};

export default Header;