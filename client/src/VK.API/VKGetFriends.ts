import { VKAPI } from ".";

let friends: any[] = [];
let isFriendsCached: boolean = false;

export default function(callback: Function) {
  if (isFriendsCached) return callback(friends);
  VKAPI(
    "friends.get",
    {
      fields:
        "nickname, domain, sex, bdate, city, country, timezone, photo_50, photo_100, photo_200_orig, has_mobile, contacts," +
        " education, online, relation, last_seen, status, can_write_private_message, can_see_all_posts, can_post, universities",
      v: "5.80"
    },
    (r: { response: any }) => {
      friends = r.response.items;
      isFriendsCached = true;
      return callback(friends);
    }
  );
}
