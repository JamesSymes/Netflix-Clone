// HomePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Hero from '../components/Hero';




const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [hoveredSection, setHoveredSection] = useState(null);
  const popularMoviesRef = useRef(null);
  const comedyMoviesRef = useRef(null);
  const dramaMoviesRef = useRef(null);
  const familyMoviesRef = useRef(null);
  const horrorMoviesRef = useRef(null);

  // hidding the left < botton until the > button has been clicked once 
  const [popularRightClicked, setPopularRightClicked] = useState(false);
  const [comedyRightClicked, setComedyRightClicked] = useState(false);
  const [dramaRightClicked, setDramaRightClicked] = useState(false);
  const [familyRightClicked, setFamilyRightClicked] = useState(false);
  const [horrorRightClicked, setHorrorRightClicked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const MOVIE_CARD_WIDTH = window.innerWidth * 0.875;  // scroll by 7 movies to correct starting point. Math is 0.125 each movie x 7 = 0.875



// Function to update the scroll state
const updateScrollState = (movieListRef) => {
  const isAtStart = movieListRef.current.scrollLeft === 0;
  switch (movieListRef) {
    case popularMoviesRef:
      setPopularRightClicked(!isAtStart);
      break;
      case comedyMoviesRef:
      setComedyRightClicked(!isAtStart);
      break;
    case dramaMoviesRef:
      setDramaRightClicked(!isAtStart);
      break;
      case familyMoviesRef:
      setFamilyRightClicked(!isAtStart);
      break;
    case horrorMoviesRef:
      setHorrorRightClicked(!isAtStart);
      break;
    default:
      break;
  }
};


// scroll to the right on a loop
const scrollMovieList = (movieListRef, movies) => {
  if (movieListRef.current && !isScrolling) {
    setIsScrolling(true);  // Disable scrolling while in progress

    
    const widthOfOneMovie = MOVIE_CARD_WIDTH;

    const newScrollPosition = movieListRef.current.scrollLeft + widthOfOneMovie;
    const maxScroll = movieListRef.current.scrollWidth - window.innerWidth;

    const canScrollFurther = movieListRef.current.scrollLeft + 2 * widthOfOneMovie <= maxScroll;

    if (!canScrollFurther) {
      // Append the first set of movies to the end to simulate looping
      const nodesToAppend = Array.from(movieListRef.current.children).slice(0, movies.length);
      nodesToAppend.forEach(node => {
        const clonedNode = node.cloneNode(true);
        movieListRef.current.appendChild(clonedNode);
      });
    }

    window.requestAnimationFrame(() => {
      // Adjust the scrollLeft position
      movieListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        setIsScrolling(false);  // Re-enable scrolling after completion
        updateScrollState(movieListRef);
      }, 850);  // Scroll animation duration
    });
  }
};

// scroll to the left on a loop
const scrollMovieListLeft = (movieListRef, movies) => {
  if (movieListRef.current && !isScrolling) {
    setIsScrolling(true);  // Disable scrolling while in progress

    const widthOfOneMovie = MOVIE_CARD_WIDTH;

    const newScrollPosition = movieListRef.current.scrollLeft - widthOfOneMovie;

    const canScrollBackwards = movieListRef.current.scrollLeft - widthOfOneMovie >= 0;

    if (!canScrollBackwards) {
      // Adjust the scroll position to make space for the prepended movies
      movieListRef.current.scrollLeft += movies.length * widthOfOneMovie;

      // Prepend the last set of movies to simulate looping
      const nodesToPrepend = Array.from(movieListRef.current.children).slice(-movies.length);
      nodesToPrepend.reverse().forEach(node => {
        const clonedNode = node.cloneNode(true);
        movieListRef.current.prepend(clonedNode);
      });
    }

    window.requestAnimationFrame(() => {
      // Smoothly adjust the scrollLeft position
      movieListRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setIsScrolling(false);  // Re-enable scrolling after completion
        updateScrollState(movieListRef);
      }, 850);  // Scroll animation duration
    });
  }
};






  useEffect(() => {
    // Fetch popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setPopularMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));

    // Fetch comedy movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=35`)
      .then(response => response.json())
      .then(data => setComedyMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));

    // Fetch drama movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=18`)
      .then(response => response.json())
      .then(data => setDramaMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));

      // Fetch family movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=10751`)
    .then(response => response.json())
    .then(data => setFamilyMovies(data.results.slice(0, 24)))
    .catch(error => console.error(error));

    // Fetch horror movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&with_genres=27`)
      .then(response => response.json())
      .then(data => setHorrorMovies(data.results.slice(0, 24)))
      .catch(error => console.error(error));
  }, []);

  const handleMouseEnter = sectionName => {
    setHoveredSection(sectionName);
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  const getGenreLink = genreId => `/genres/${genreId}`;

  return (
    <div>
      <Hero />
    <div className="page-content">
    
    <div className="section" onMouseEnter={() => handleMouseEnter('popular')} onMouseLeave={handleMouseLeave}>
  
  <h2 className="section-title">
    <Link to="/popular-movies" className='first-section-title'>Popular Movies</Link>
  </h2>
  
  <div className="movie-list" ref={popularMoviesRef}>
    {popularMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  
  {hoveredSection === 'popular' && (
    <>
      
{popularRightClicked && (
  <div className="section-link-container-left">
    <Link 
      to="/popular-movies" 
      className="section-link" 
      onClick={(e) => {
        e.preventDefault();
        if (!isScrolling) { 
          scrollMovieListLeft(popularMoviesRef, popularMovies);
        }
      }}>
      &lt;
    </Link>
    <div className="section-link-shadow-left"></div>
  </div>
)}
      
      
<div className="section-link-container">
  <Link 
    to="/popular-movies" 
    className="section-link" 
    onClick={(e) => {
      e.preventDefault();
      if (!isScrolling) { 
        scrollMovieList(popularMoviesRef, popularMovies);
        setPopularRightClicked(true);
      }
    }}>
    &gt;
  </Link>
  <div className="section-link-shadow"></div>
</div>
      
    </>
  )}
</div>

{/* Comedy Movies Section */}
<div className="section" onMouseEnter={() => handleMouseEnter('comedy')} onMouseLeave={handleMouseLeave}>
  
  <h2 className="section-title">
    <Link to="/comedy-movies" className='first-section-title'>Comedy Films</Link>
  </h2>
  
  <div className="movie-list" ref={comedyMoviesRef}>
    {comedyMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  
  {hoveredSection === 'comedy' && (
    <>
      {/* LEFT ARROW */}
      {comedyRightClicked && (
        <div className="section-link-container-left">
          <Link 
            to="/comedy-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              if (!isScrolling) { // Only allow click if not currently scrolling
                scrollMovieListLeft(comedyMoviesRef, comedyMovies);
              }
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/comedy-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            if (!isScrolling) { // Only allow click if not currently scrolling
              scrollMovieList(comedyMoviesRef, comedyMovies);
              setComedyRightClicked(true);
            }
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )}
</div>

{/* Drama Section */}
<div className="section" onMouseEnter={() => handleMouseEnter('drama')} onMouseLeave={handleMouseLeave}>
  
  <h2 className="section-title">
    <Link to="/drama-movies" className='first-section-title'>Drama Films</Link>
  </h2>
  
  <div className="movie-list" ref={dramaMoviesRef}>
    {dramaMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  
  {hoveredSection === 'drama' && (
    <>
      {/* LEFT ARROW */}
      {dramaRightClicked && (
        <div className="section-link-container-left">
          <Link 
            to="/drama-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              if (!isScrolling) { // Only allow click if not currently scrolling
                scrollMovieListLeft(dramaMoviesRef, dramaMovies);
              }
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/drama-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            if (!isScrolling) { // Only allow click if not currently scrolling
              scrollMovieList(dramaMoviesRef, dramaMovies);
              setDramaRightClicked(true);
            }
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )}
</div>




{/* Family Movies Section */}
<div className="section" onMouseEnter={() => handleMouseEnter('family')} onMouseLeave={handleMouseLeave}>
  
  <h2 className="section-title">
    <Link to="/family-movies" className='first-section-title'>Family Films</Link>
  </h2>
  
  <div className="movie-list" ref={familyMoviesRef}>
    {familyMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  
  {hoveredSection === 'family' && (
    <>
      {/* LEFT ARROW */}
      {familyRightClicked && (
        <div className="section-link-container-left">
          <Link 
            to="/family-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              if (!isScrolling) { // Only allow click if not currently scrolling
                scrollMovieListLeft(familyMoviesRef, familyMovies);
              }
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/family-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            if (!isScrolling) { // Only allow click if not currently scrolling
              scrollMovieList(familyMoviesRef, familyMovies);
              setFamilyRightClicked(true);
            }
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )}
</div>


{/* Horror Movies Section */}
<div className="section" onMouseEnter={() => handleMouseEnter('horror')} onMouseLeave={handleMouseLeave}>
  
  <h2 className="section-title">
    <Link to="/horror-movies" className='first-section-title'>Horror Movies</Link>
  </h2>
  
  <div className="movie-list" ref={horrorMoviesRef}>
    {horrorMovies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  
  {hoveredSection === 'horror' && (
    <>
      {/* LEFT ARROW */}
      {horrorRightClicked && (
        <div className="section-link-container-left">
          <Link 
            to="/horror-movies" 
            className="section-link" 
            onClick={(e) => {
              e.preventDefault();
              if (!isScrolling) { // Only allow click if not currently scrolling
                scrollMovieListLeft(horrorMoviesRef, horrorMovies);
              }
            }}>
            &lt;
          </Link>
          <div className="section-link-shadow-left"></div>
        </div>
      )}
      
      {/* RIGHT ARROW */}
      <div className="section-link-container">
        <Link 
          to="/horror-movies" 
          className="section-link" 
          onClick={(e) => {
            e.preventDefault();
            if (!isScrolling) { // Only allow click if not currently scrolling
              scrollMovieList(horrorMoviesRef, horrorMovies);
              setHorrorRightClicked(true);
            }
          }}>
          &gt;
        </Link>
        <div className="section-link-shadow"></div>
      </div>
    </>
  )}
</div>
    </div>
    </div>
  );
};

export default HomePage;