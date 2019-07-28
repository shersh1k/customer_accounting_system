import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL } from "./types";
import { VKGetPhotos, iVKPhoto } from './../../VK.API/VK.Api.call';

export function getPhotos(year: number) {
    return (dispatch: any) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year,
        })
        loadPhotos(year, dispatch)
    }
}

function loadPhotos(year: number, dispatch: Function) {
    VKGetPhotos((photos: iVKPhoto[]) => {
        try {
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: makeYearPhotos(photos, year),
            })
        } catch (e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: new Error(e),
            })
        }
    })
}

const makeYearPhotos = (photos: iVKPhoto[], selectedYear: number) => {
    return photos
        .filter(photo => selectedYear === getYear(photo.date))
        .sort((a, b) => b.likes.count - a.likes.count);
}

const getYear = (timeStampInSeconds: number) => new Date(timeStampInSeconds * 1000).getFullYear()

