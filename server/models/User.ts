import { Schema, Document, model, Types } from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { iArticle } from "./Article";

const secret = "secret";

const UserSchema = new Schema<iUserModel>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    bio: String,
    image: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    hash: String,
    salt: String
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

UserSchema.methods.validPassword = function(password: string) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: exp.getTime() / 1000
    },
    secret
  );
};

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = function(user: iUserModel) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "https://static.productionready.io/images/smiley-cyrus.jpg",
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.favorite = function(id: string) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }

  return this.save();
};

UserSchema.methods.unfavorite = function(id: string) {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = function(id: string) {
  return this.favorites.some(function(favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

UserSchema.methods.follow = function(id: string) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = function(id: string) {
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function(id: number) {
  return this.following.some(function(followId) {
    return followId.toString() === id.toString();
  });
};
export interface iUserJSON {
  username: string;
  bio: string;
  image: string;
  email?: string;
  token?: string | void;
  following?: any; // TODO чето надо сделать тут
}
export interface iUserModel extends Document, iUserJSON {
  following: Types.Array<iUserModel>;
  favorites: Types.Array<iArticle>;
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  validPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  generateJWT: () => string;
  toAuthJSON: () => iUserJSON;
  toProfileJSONFor: (user: iUserModel) => iUserJSON;
  favorite: (articleId: string) => Promise<iUserModel>;
  unfavorite: (articleId: string) => Promise<iUserModel>;
  isFavorite: (id: string) => void;
  follow: (id: string) => void;
  unfollow: (id: string) => void;
  isFollowing: (id: number) => boolean;
}

export default model<iUserModel>("User", UserSchema);
