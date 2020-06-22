import {
  LOADING_ALBUM,
  INCREMENT_COUNT,
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

    case INCREMENT_COUNT:
      return {
        ...state,
        imageCount: state.imageCount + 1
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
