import {
  SEARCH_MOVIE,
  FETCH_MOVIES,
  FETCH_MOVIE,
  LOADING,
  FETCH_IMAGES
} from '../actions/types';

const initialState = {
  text: '',
  movies: [],
  loading: false,
  movie: [],
  urls: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCH_IMAGES:
      console.log("Data Given Back")
      return {
        ...state,
        new_var: "New Var",
        urls: action.payload,
        loading: false
      };
    case SEARCH_MOVIE:
      return {
        ...state,
        text: action.payload,
        loading: false
      };
    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
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
