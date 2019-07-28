import { GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAIL } from "./types";
import { VKFriendsGet } from "../../VK.API/VK.Api.call";

export function getFriends() {
    return (dispatch: any) => {
        dispatch({
            type: GET_FRIENDS_REQUEST,
            payload: 'year',
        })
        loadFriends(dispatch)
    }
}

function loadFriends(dispatch: Function) {
    VKFriendsGet((r: { response: iVKPhotoResponse }) => {
        try {
            dispatch({
                type: GET_FRIENDS_SUCCESS,
                payload: r.response.items,
            })
        } catch (e) {
            dispatch({
                type: GET_FRIENDS_FAIL,
                error: true,
                payload: new Error(e),
            })
        }
    })
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

interface iVKPhotoResponse {
    count: number;
    items: iVKPhoto[];
}