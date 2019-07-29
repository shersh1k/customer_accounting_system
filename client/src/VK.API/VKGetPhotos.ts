import { VKAPI } from ".";
import { iVKPhoto, iVKPhotoResponse } from "./types";

let photos: iVKPhoto[] = [];
let isPhotosCached: boolean = false;

export default function(callback: Function) {
  if (isPhotosCached) return callback(photos);
  return loadPhotos(0, 200);

  function loadPhotos(offset: number, count: number) {
    VKAPI(
      "photos.getAll",
      {
        extended: 1,
        offset: offset,
        count: count,
        v: "5.80"
      },
      (r: iVKPhotoResponse) => {
        photos = [...photos, ...r.response.items];
        if (offset <= r.response.count) {
          offset += 200; // максимальное количество фото которое можно получить за 1 запрос
          return loadPhotos(offset, count);
        } else {
          isPhotosCached = true;
          return callback(photos);
        }
      }
    );
  }
}
