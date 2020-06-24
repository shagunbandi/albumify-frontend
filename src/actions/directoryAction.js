import { LOADING_ALBUM, FILE_FOLDER_IMAGES, CURRENT_DIRECTORY, FALSE_RESPONSE, ALBUM_IMAGES, ADD_ALBUM, ALBUM_IMAGES_POP, LOADING_ALBUM_POP, CURRENT_DIRECTORY_POP } from './types';
import { BASE_URL } from './constants';
import axios from 'axios';


export const getAllImagesWithPath = () => dispatch => {
  axios
    .get(BASE_URL + 'api/folder')
    .then(response =>
      dispatch({
        type: FILE_FOLDER_IMAGES,
        payload: response.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
      })
    })
};

export const getAllAlbumsWithPathPopUp = () => dispatch => {
  axios
    .get(BASE_URL + 'api/album')
    .then(response =>
      dispatch({
        type: ALBUM_IMAGES_POP,
        payload: response.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
      })
    })
};


export const getAllAlbumsWithPath = () => dispatch => {
  axios
    .get(BASE_URL + 'api/album')
    .then(response =>
      dispatch({
        type: ALBUM_IMAGES,
        payload: response.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
      })
    })
};

export const addAlbumAtPath = (path, name) => dispatch => {
  axios
    .post(BASE_URL + 'api/album', {
      album_name: name,
      album_path: path,
    })
    .then(response =>
      dispatch({
        type: ADD_ALBUM,
        payload: response.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({
        type: FALSE_RESPONSE,
        payload: false
      })
    })
};

export const selectSubDirectoryGlobal = (subDir) => {
  return {
    type: CURRENT_DIRECTORY,
    payload: subDir
  }
}

export const selectSubDirectoryGlobalPop = (subDir) => {
  return {
    type: CURRENT_DIRECTORY_POP,
    payload: subDir
  }
}


export const setLoading = () => {
  return {
    type: LOADING_ALBUM
  };
};

export const setLoadingPop = () => {
  return {
    type: LOADING_ALBUM_POP
  };
};