import React, { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies,fetchAsyncShows } from '../../featuresR/movies/movieSlice';

//we use dispatch to execute the action creators

export default function Home() {
const dispatch = useDispatch()
const movieText = 'Avatar'
const movieShow = 'jackie-chan'

useEffect(() => {
dispatch(fetchAsyncMovies(movieText))
dispatch(fetchAsyncShows(movieShow))
},[dispatch])

  return (
    <div>
      <div className='banner-img'></div>
      <MovieListing/>
    </div>
  );
}
