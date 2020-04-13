import { LOADING_ALBUM, FILE_FOLDER_IMAGES, CURRENT_DIRECTORY } from './types';
import { BASE_URL } from './constants';
import axios from 'axios';


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

export const selectSubDirectoryGlobal = (subDir) => {
  return {
    type: CURRENT_DIRECTORY,
    payload: subDir
  }
}

export const setLoading = () => {
  return {
    type: LOADING_ALBUM
  };
};