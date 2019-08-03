import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAIL
} from "./types";
import { iVKPhoto } from "../../helpers/VK.API/types";
import { VKGetPhotos } from "../../helpers/VK.API";

export function getPhotos(year: number) {
  return (dispatch: Function) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year
    });
    try {
      VKGetPhotos((photos: iVKPhoto[]) => {
        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: filterPhotosByYear(photos, year)
        });
      });
    } catch (e) {
      dispatch({
        type: GET_PHOTOS_FAIL,
        error: true,
        payload: new Error(e)
      });
    }
  };
}

const filterPhotosByYear = (photos: iVKPhoto[], selectedYear: number) => {
  return photos
    .filter(photo => selectedYear === getYear(photo.date))
    .sort((a, b) => b.likes.count - a.likes.count);
};

const getYear = (timeStampInSeconds: number) =>
  new Date(timeStampInSeconds * 1000).getFullYear();
