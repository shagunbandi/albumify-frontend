import {
    LOADING,
    FETCH_IMAGES,
    INCREMENT_COUNT,
    FETCH_MORE_IMAGES,
} from '../actions/types';

const initialState = {
    loading: true,
    images: {},
    imageCount: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {

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

        case FETCH_IMAGES:
            console.log("Images Fetched")
            return {
                ...state,
                images: action.payload,
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
