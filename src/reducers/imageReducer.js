import {
  SEARCH_MOVIE,
  LOADING,
  FETCH_IMAGES
} from '../actions/types';

const initialState = {
  text: '',
  loading: false,
  images: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCH_IMAGES:
      console.log("Data Given Back")
      return {
        ...state,
        images: action.payload,
        loading: false
      };
    case SEARCH_MOVIE:
      return {
        ...state,
        text: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
