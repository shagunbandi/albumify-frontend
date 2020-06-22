import {
  GALLERY_COMPONENTS, GALLERY_CURRENT, CLOSE_GALLERY_VIEW
} from '../actions/types';

const initialState = {
  current: null,
  show: false,
  images: [],
};

export default function (state = initialState, action) {
  switch (action.type) {

    case GALLERY_CURRENT:
      return {
        ...state,
        current: action.current
      }

    case CLOSE_GALLERY_VIEW:
      return {
        current: null,
        show: false,
        images: []
      }

    case GALLERY_COMPONENTS:
      return {
        current: action.payload.current,
        show: action.payload.show,
        images: action.payload.images
      }

    default:
      return state;
  }
}
