import {
  LOADING_ALBUM,
  FILE_FOLDER_IMAGES,
  CURRENT_DIRECTORY,
  FALSE_RESPONSE
} from '../actions/types';

const initialState = {
  text: '',
  loading: true,
  images: {},
  imageCount: 0,
  folder: {},
  file: {},
  rootDir: '',
  currentDir: '',
  response: true
};

export default function (state = initialState, action) {
  switch (action.type) {

    case FALSE_RESPONSE: 
      return {
        ...state,
        response: false,
        loading: false
      }
      
    case CURRENT_DIRECTORY:
      return {
        ...state,
        currentDir: action.payload
      }

    case FILE_FOLDER_IMAGES:
      return {
        ...state,
        response: "Success",
        folder: action.payload.data.folder,
        file: action.payload.data.file,
        rootDir: action.payload.data.root,
        currentDir: action.payload.data.root,
        loading: false
      }

    case LOADING_ALBUM:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
