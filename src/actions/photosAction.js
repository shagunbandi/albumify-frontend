import { LOADING_PHOTOS, FETCH_IMAGES } from './types';
import { BASE_URL } from './constants';
import axios from 'axios';

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
        type: LOADING_PHOTOS
    };
};
