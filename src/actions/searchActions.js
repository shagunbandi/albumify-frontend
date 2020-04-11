import { LOADING, FETCH_IMAGES, INCREMENT_COUNT, FETCH_MORE_IMAGES, FILE_FOLDER_IMAGES } from './types';
import { BASE_URL } from './constants';
import axios from 'axios';

export const incrementCount = () => {
  return {
    type: INCREMENT_COUNT
  };
};

export const getAllImagesWithPath = () => dispatch => {
  axios
    .get(BASE_URL + '/api/folder')
    .then(response =>
      dispatch({
        type: FILE_FOLDER_IMAGES,
        payload: response.data
      })
    )
    .catch(err => console.log(err))
};

export const getMoreImages = (page) => dispatch => {
  axios
    .get(BASE_URL + `/api/?page=` + page)
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
    .get(BASE_URL + `/api/?page=1`)
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
