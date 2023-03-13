import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies,getAllShows } from '../../featuresR/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.css'
import Slider from 'react-slick'
import { settings } from '../../common/settings';

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  let renderMovies,renderShows = '';
  renderMovies =
    movies.Response === 'True' ? (
      movies.Search.map((movie, index) => {
       return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    )
  renderShows =
    shows.Response === 'True' ? (
      shows.Search.map((movie, index) => {
         return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="shows-error">
        <h3>{shows.Error}</h3>
      </div>
    );

  return (
    <>
    <div className="movie-wrapper">
      <div className="movie-list">
        <h3>Movies</h3>
        <div className="movie-container">
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="show-list">
        <h3>Shows</h3>
        <div className="movie-container">
          <Slider {...settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
    </>
  );
};

export default MovieListing;
