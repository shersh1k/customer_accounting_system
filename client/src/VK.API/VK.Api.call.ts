let photos: iVKPhoto[] = [];
let isPhotoCached: boolean = false;

export function VKGetPhotos(callback: Function) {
    if (isPhotoCached) return callback(photos)
    return loadPhotos(0, 200);

    function loadPhotos(offset: number, count: number) {
        API(
            'photos.getAll',
            {
                extended: 1,
                offset: offset,
                count: count,
                v: '5.80'
            },
            (r: { response: iVKPhotoResponse }) => {
                photos = [...photos, ...r.response.items]
                if (offset <= r.response.count) {
                    offset += 200 // максимальное количество фото которое можно получить за 1 запрос
                    return loadPhotos(offset, count)
                } else {
                    isPhotoCached = true;
                    return callback(photos);
                }
            }
        )
    }
}

export function VKFriendsGet(callback: Function) {
    API(
        'friends.get',
        {
            fields: 'nickname, domain, sex, bdate, city, country, timezone, photo_50, photo_100, photo_200_orig, has_mobile, contacts,' +
                ' education, online, relation, last_seen, status, can_write_private_message, can_see_all_posts, can_post, universities',
            v: '5.80'
        },
        callback
    )
}

function API(command: string, options: any, callback: Function) {
    //eslint-disable-next-line no-undef
    VK.Api.call(command, options, callback)
}



export interface iVKPhoto {
    album_id: number;
    date: number;
    id: number;
    likes: iVKPhoto_Likes;
    owner_id: number;
    post_id: number;
    reposts: iVKPhoto_Reposts;
    sizes: iVKPhoto_Sizes[];
}

interface iVKPhotoResponse {
    count: number;
    items: iVKPhoto[];
}

interface iVKPhoto_Likes {
    count: number;
    user_likes: number;
}

interface iVKPhoto_Reposts {
    count: number;
}

interface iVKPhoto_Sizes {
    type: "m" | "o" | "p" | "q" | "r" | "s" | "x" | "y";
    url: string;
    width: number;
    height: number;
}