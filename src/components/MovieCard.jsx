import React, { useState } from 'react';
import '../styles/MovieCard.css';
import HoverContainer from '../components/HoverContainer';

const MovieCard = ({ movie, isFeatured }) => {
  const { title, poster_path, backdrop_path } = movie;
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;

  return (
    <div 
      className={isFeatured ? "featured-movie-card-wrapper" : "movie-card-container"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={isFeatured ? "featured-movie-card" : "movie-card"}>
        <img src={posterUrl} alt={title} />
        {isHovered && backdrop_path && <HoverContainer image={backdrop_path} title={title} />}
      </div>
    </div>
  );
};

export default MovieCard;
