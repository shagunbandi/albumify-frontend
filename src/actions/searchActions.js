import { SEARCH_MOVIE, LOADING, FETCH_IMAGES, INCREMENT_COUNT } from './types';
import axios from 'axios';

import { APIKey } from '../APIKey';

export const searchMovie = text => dispatch => {
  dispatch({
    type: SEARCH_MOVIE,
    payload: text
  });
};

export const incrementCount = () => {
  return {
    type: INCREMENT_COUNT
  };
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


export const setLoading = () => {
  return {
    type: LOADING
  };
};
