import { LOADING, FETCH_IMAGES, INCREMENT_COUNT, FETCH_MORE_IMAGES } from './types';
import axios from 'axios';

import { APIKey } from '../APIKey';

export const incrementCount = () => {
  return {
    type: INCREMENT_COUNT
  };
};

export const getMoreImages = (page) => dispatch => {
  axios
    .get(`http://localhost:8000/api/?page=` + page)
    .then(response =>
      dispatch({
        type: FETCH_MORE_IMAGES,
        payload: response.data
      })
    )
    .catch(err => console.log(err));
};

export const fetchImages = () => dispatch => {
  axios
    .get(`http://localhost:8000/api/?page=1`)
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
