import { GALLERY_COMPONENTS, GALLERY_CURRENT } from './types';

export const setGalleryComponents = (payload) => {
  return {
    type: GALLERY_COMPONENTS,
    payload: payload
  }
}

export const setCurrentValue = (current) => {
  return {
    type: GALLERY_CURRENT,
    current: current
  }
}