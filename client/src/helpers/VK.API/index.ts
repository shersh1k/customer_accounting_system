import VKLogin from "./VK.Auth.login";
import VKGetPhotos from "./VKGetPhotos";
import VKGetFriends from "./VKGetFriends";

//decision for eslint
const VKAPI = (command: string, options: any, callback: Function) =>
  //eslint-disable-next-line no-undef
  VK.Api.call(command, options, callback);

export { VKAPI, VKLogin, VKGetPhotos, VKGetFriends };
