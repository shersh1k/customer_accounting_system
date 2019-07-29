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

export interface iVKPhotoResponse {
  response: {
    count: number;
    items: iVKPhoto[];
  };
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
