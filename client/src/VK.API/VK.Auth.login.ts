export default function(callback: Function) {
  //eslint-disable-next-line no-undef
  VK.Auth.login(callback, neededRights);
}
const userRights = {
  notify: 1,
  friends: 2,
  photos: 4,
  audio: 8,
  video: 16,
  stories: 64,
  pages: 128,
  rightLink: 256,
  status: 1024,
  notes: 2048,
  docs: 131072,
  groups: 262144,
  notifications: 1048576,
  stats: 1048576,
  email: 4194304,
  market: 134217728
};

// in dev sum all rights
const neededRights = Object.values(userRights).reduce(
  (prev, cur) => prev + cur,
  0
);
