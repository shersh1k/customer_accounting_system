import { Schema, Document, model, Types } from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as slug from "slug";
import { iUserModel } from "./User";
import { iCommentModel } from "./Comment";
const User = model("User");

var ArticleSchema = new Schema<iArticle>(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    description: String,
    body: String,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    tagList: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

ArticleSchema.plugin(uniqueValidator, { message: "is already taken" });

ArticleSchema.pre<iArticle>("validate", function(next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

ArticleSchema.methods.slugify = function() {
  this.slug = slug(this.title) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

ArticleSchema.methods.updateFavoriteCount = function() {
  var article = this;
  return User.count({ favorites: { $in: [article._id] } }).then(function(count) {
    article.favoritesCount = count;
    return article.save();
  });
};

ArticleSchema.methods.toJSONFor = function(user: iUserModel) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

export interface iArticle extends Document {
  slug: string;
  title: string;
  description: string;
  body: string;
  favoritesCount: number;
  comments: Types.Array<iCommentModel>;
  tagList: string[];
  author: iUserModel;
  createdAt: Date;
  updatedAt: Date;
  slugify: () => void;
  updateFavoriteCount: () => Promise<any>;
  toJSONFor: (user: iUserModel) => void;
}
export default model<iArticle>("Article", ArticleSchema);
