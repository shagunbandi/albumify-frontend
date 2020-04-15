import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import photosReducer from './photosReducer';

export default combineReducers({
  album: albumReducer,
  photos: photosReducer
});
