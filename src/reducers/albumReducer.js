import {
  SEARCH_MOVIE,
  LOADING,
  FETCH_IMAGES,
  INCREMENT_COUNT,
  FETCH_MORE_IMAGES,
  FILE_FOLDER_IMAGES,
  CURRENT_DIRECTORY
} from '../actions/types';

const initialState = {
  text: '',
  loading: true,
  images: {},
  imageCount: 0,
  folder: {},
  file: {},
  rootDir: '',
  currentDir: ''
};

export default function (state = initialState, action) {
  switch (action.type) {

    case CURRENT_DIRECTORY:
      return {
        ...state,
        currentDir: action.payload
      }

    case FETCH_MORE_IMAGES:
      console.log("Fetching More Data");
      let prev_images = state.images.data;
      let images = action.payload;
      images.data = prev_images.concat(images.data);
      return {
        ...state,
        images: action.payload,
        loading: false
      }

    case FILE_FOLDER_IMAGES:
      console.log("GOT FOLDER FILE DATA");
      return {
        ...state,
        folder: action.payload.data.folder,
        file: action.payload.data.file,
        rootDir: action.payload.data.root,
        currentDir: action.payload.data.root,
        loading: false
      }

    case FETCH_IMAGES:
      console.log("Images Fetched")
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

    case INCREMENT_COUNT:
      return {
        ...state,
        imageCount: state.imageCount + 1
      }

    case LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
