import React ,{ useEffect } from 'react'
import {useParams} from 'react-router'
import {useDispatch,useSelector} from 'react-redux'
import { fetchAsyncMovieOrShowDetail,getSelectedMovieOrShow, removeSelectedMovieOrShow } from '../../featuresR/movies/movieSlice'
import "./MovieDetail.css"

export default function MovieDetail() {
const {imdbID} = useParams()
const dispatch = useDispatch()

const data = useSelector(getSelectedMovieOrShow)
useEffect(() => {
  dispatch(fetchAsyncMovieOrShowDetail(imdbID));
return ()=>{
  dispatch(removeSelectedMovieOrShow());
}
}, [dispatch,imdbID])

  return (
    <div className="movie-section">
    {Object.keys(data).length === 0 ? (
      <div>...Loading</div>
    ) : (
    <>
      <div className="section-left">
        <div className="movie-title">{data.Title}</div>
        <div className="movie-rating">
          <span>
          IMDB Rating <i className='fa fa-star'></i> : {data.imdbRating}
          </span> 
          <span>
          IMDB votes <i className='fa fa-thumbs-up'></i> : {data.imdbVotes}
          </span> 
          <span>
          Runtime <i className='fa fa-film'></i> : {data.Runtime}
          </span> 
          <span>
          year <i className='fa fa-calendar'></i> : {data.Year}
          </span>
          <div className='movie-plot'>{data.Plot}</div> 
          <div className='movie-info'>
            <div>
              <span>Director</span>
              <span>{data.Director}</span>
            </div>
            <div>
              <span>Stars</span>
              <span>{data.Actors}</span>
            </div>
            <div>
              <span>Genres</span>
              <span>{data.Genres}</span>
            </div>
            <div>
              <span>Language</span>
              <span>{data.Language}</span>
            </div>
            <div>
              <span>Awards</span>
              <span>{data.Awards}</span>
            </div>
          </div>
          <div className='section-right'>
            <img src={data.Poster} alt={data.Title}/>
          </div>
        </div>
      </div>
      </>)}
      </div>
  );
  }
