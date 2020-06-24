import {
  LOADING_ALBUM,
  FILE_FOLDER_IMAGES,
  CURRENT_DIRECTORY,
  FALSE_RESPONSE,
  ALBUM_IMAGES,
  ADD_ALBUM,
  ALBUM_IMAGES_POP,
  LOADING_ALBUM_POP,
  CURRENT_DIRECTORY_POP
} from '../actions/types';

const initialState = {
  directory: {
    text: '',
    loading: true,
    images: {},
    imageCount: 0,
    folder: {},
    file: {},
    rootDir: '',
    currentDir: '',
    response: true,
    addAlbum: false,
    addAlbumResponse: false
  },
  directory_pop: {
    text: '',
    loading: true,
    images: {},
    imageCount: 0,
    folder: {},
    file: {},
    rootDir: '',
    currentDir: '',
    response: true,
    addAlbum: false,
    addAlbumResponse: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {

    case FALSE_RESPONSE:
      return {
        ...state,
        directory: {
          ...state.directory,
          response: false,
          loading: false
        },
        directory_pop: { ...state.directory_pop },
      }

    case CURRENT_DIRECTORY:
      return {
        ...state,
        directory: {
          ...state.directory,
          currentDir: action.payload
        },
        directory_pop: { ...state.directory_pop },
      }

    case CURRENT_DIRECTORY_POP:
      return {
        ...state,
        directory: {
          ...state.directory,
        },
        directory_pop: {
          ...state.directory_pop,
          currentDir: action.payload
        },
      }

    case FILE_FOLDER_IMAGES:
      return {
        ...state,
        directory: {
          ...state.directory,
          response: "Success",
          folder: action.payload.data.folder,
          file: action.payload.data.file,
          rootDir: action.payload.data.root,
          currentDir: action.payload.data.root,
          loading: false,
          addAlbum: false
        },
        directory_pop: { ...state.directory_pop },
      }

    case ADD_ALBUM:
      if (action.payload.response === "Success") {

        return {
          ...state,
          directory: {
            ...state.directory,
            addAlbumResponse: "Success",
            folder: action.payload.data.folder,
            file: action.payload.data.file,
            rootDir: action.payload.data.root,
            currentDir: action.payload.current_directory,
            loading: false,
            addAlbum: true
          },
          directory_pop: { ...state.directory_pop },
        }
      }

      return {
        ...state,
        directory: {
          ...state.directory,
          addAlbumResponse: "Fail",
          message: action.payload.response.message
        },
        directory_pop: { ...state.directory_pop },
      }

    case ALBUM_IMAGES_POP:
      return {
        ...state,
        directory: {
          ...state.directory
        },
        directory_pop: {
          ...state.directory_pop,
          response: "Success",
          folder: action.payload.data.folder,
          file: action.payload.data.file,
          rootDir: action.payload.data.root,
          currentDir: action.payload.data.root,
          loading: false,
          addAlbum: true
        },
      }

    case ALBUM_IMAGES:
      return {
        ...state,
        directory: {
          ...state.directory,
          response: "Success",
          folder: action.payload.data.folder,
          file: action.payload.data.file,
          rootDir: action.payload.data.root,
          currentDir: action.payload.data.root,
          loading: false,
          addAlbum: true
        },
        directory_pop: { ...state.directory_pop },
      }

    case LOADING_ALBUM:
      return {
        ...state,
        directory: {
          ...state.directory,
          loading: true
        },
        directory_pop: { ...state.directory_pop },
      }

    case LOADING_ALBUM_POP:
      return {
        ...state,
        directory: {
          ...state.directory,
        },
        directory_pop: {
          ...state.directory_pop,
          loading: true
        },
      }

    default:
      return state;
  }
}
