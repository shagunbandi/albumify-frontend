import {
    FETCH_IMAGES,
    LOADING_PHOTOS,
    FALSE_RESPONSE,
} from '../actions/types';

const initialState = {
    loading: true,
    images: {},
    dataLoaded: false,
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


        case FETCH_IMAGES:
            console.log("Images Fetched")
            return {
                ...state,
                images: action.payload,
                loading: false,
                dataLoaded: true
            };

        case LOADING_PHOTOS:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}
