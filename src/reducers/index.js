import { combineReducers } from 'redux';
import directoryReducer from './directoryReducer';
import photosReducer from './photosReducer';
import galleryReducer from './galleryReducer';

export default combineReducers({
  directory: directoryReducer,
  photos: photosReducer,
  gallery: galleryReducer
});
