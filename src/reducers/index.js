import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import photosReducer from './photosReducer';
import galleryReducer from './galleryReducer';

export default combineReducers({
  album: albumReducer,
  photos: photosReducer,
  gallery: galleryReducer
});
