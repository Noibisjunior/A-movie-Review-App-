 import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import movieApi from '../../common/apis/movieApi';
import { APIkey } from '../../common/apis/movieApiKey';

//creating the action creator that will make the Api call to the omdb Api based on the movie
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', 
async (term) => {
    
    const response = await movieApi
      .get(`?apiKey=${APIkey}&s=${term}&type=movie`)
    // console.log("Api Respone",response);
    return response.data
}) //returning an async action creator


//creating the action creator that will make the Api call to the omdb Api based on the show
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', 
async (term) => {
    
  const response = await movieApi
      .get(`?apiKey=${APIkey}&s=${term}&type=series`)
    // console.log("Api Respone",response);
    return response.data
}) //returning the second async action creator


//creating the action creator that will make the Api call to the omdb Api based on the id and plot
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIkey}&i=${id}&Plot=full`);
    // console.log("Api Respone",response);
    return response.data;
  }
); 



 const initialState = {
    movies: {},
    shows:{},
    selectMovieOrShow:{}
 }

 const movieSlice = createSlice({
   name: 'movies',
   initialState,
   reducers: {
    removeSelectedMovieOrShow : (state) => {
      state.selectMovieOrShow = {}
    }
   },
   extraReducers: {
     //making an async request to server and we get the data and added the data to the store

     [fetchAsyncMovies.pending]: () => {
       console.log('pending');
     },
     [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
       console.log('fetched successfully');
       return { ...state, movies: payload };
     },
     [fetchAsyncMovies.rejected]: () => {
       console.log('Rejected');
     },

     [fetchAsyncShows.fulfilled]: (state, { payload }) => {
       console.log('fetched successfully');
       return { ...state, shows: payload };
     },

     //making an async request to server and we get the data and added the data to the store
     [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
       console.log('fetched successfully');
       return { ...state, selectMovieOrShow: payload };
     },
   },
 });

 export const { removeSelectedMovieOrShow } = movieSlice.actions;
 export const getAllMovies = (state) => state.movies.movies
 export const getAllShows = (state) => state.movies.shows
 export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow
 export default movieSlice.reducer;