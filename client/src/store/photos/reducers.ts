import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL } from './types'

const initialState = {
    year: null,
    photos: [],
    isFetching: false,
    error: '',
}

export function photosReducer(state = initialState, action: any) {
    switch (action.type) {
        case GET_PHOTOS_REQUEST: return { ...state, year: action.payload, isFetching: true, error: '' }
        case GET_PHOTOS_SUCCESS: return { ...state, photos: action.payload, isFetching: false, error: '' }
        case GET_PHOTOS_FAIL: return { ...state, error: action.payload.message, isFetching: false }
        default: return state
    }
}