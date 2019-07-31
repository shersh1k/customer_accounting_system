import * as mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { iArticle } from "./Article";

const secret = "secret";

const UserSchema = new mongoose.Schema(
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
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

UserSchema.methods.setPassword = function(password: any) {
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

UserSchema.methods.toProfileJSONFor = function(user: any) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "https://static.productionready.io/images/smiley-cyrus.jpg",
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.favorite = function(id: any) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }

  return this.save();
};

UserSchema.methods.unfavorite = function(id: any) {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = function(id: any) {
  return this.favorites.some(function(favoriteId: any) {
    return favoriteId.toString() === id.toString();
  });
};

UserSchema.methods.follow = function(id: any) {
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = function(id: any) {
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function(id: number) {
  return this.following.some(function(followId: number) {
    return followId.toString() === id.toString();
  });
};

export interface iUser extends mongoose.Document {
  username: string;
  email: string;
  bio: string;
  image: string;
  token: string;
  favorites: iArticle["_id"][];
  following: iUser["_id"][];
  hash: string;
  salt: string;
  validPassword: () => void;
  setPassword: (password: string) => void;
  generateJWT: () => void;
  toAuthJSON: () => iUser;
  toProfileJSONFor: () => void;
  favorite: (articleId: string) => Promise<any>;
  unfavorite: (articleId: string) => Promise<any>;
  isFavorite: () => void;
  follow: () => void;
  unfollow: () => void;
  isFollowing: () => void;
}

export default mongoose.model<iUser>("User", UserSchema);
