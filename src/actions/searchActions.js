import { SEARCH_MOVIE, FETCH_MOVIES, FETCH_MOVIE, LOADING, FETCH_IMAGES } from './types';
import axios from 'axios';

import { APIKey } from '../APIKey';

export const searchMovie = text => dispatch => {
  dispatch({
    type: SEARCH_MOVIE,
    payload: text
  });
};


export const fetchImages = () => dispatch => {
  axios
    .get(`http://localhost:8000/api/`)
    .then(response =>
      dispatch({
        type: FETCH_IMAGES,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};


export const fetchMovies = text => dispatch => {
  axios
    .get(`https://www.omdbapi.com/?apikey=${APIKey}&s=${text}`)
    .then(response =>
      dispatch({
        type: FETCH_MOVIES,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const fetchMovie = id => dispatch => {
  axios
    .get(`https://www.omdbapi.com/?apikey=${APIKey}&i=${id}`)
    .then(response =>
      dispatch({
        type: FETCH_MOVIE,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const setLoading = () => {
  return {
    type: LOADING
  };
};
