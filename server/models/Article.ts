import * as mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as slug from "slug";
import { iUser } from "./User";
import { iComment } from "./Comment";
const User = mongoose.model("User");

var ArticleSchema = new mongoose.Schema(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    description: String,
    body: String,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

ArticleSchema.plugin(uniqueValidator, { message: "is already taken" });

ArticleSchema.pre("validate", function(next) {
  if (!this.schema.obj.slug) {
    this.schema.methods.slugify();
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

ArticleSchema.methods.toJSONFor = function(user: any) {
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

export interface iArticle extends mongoose.Document {
  slug: string;
  title: string;
  description: string;
  body: string;
  favoritesCount: { type: Number; default: 0 };
  comments: iComment['_id'][];
  tagList: [{ type: string }];
  author: iUser['_id'];
  slugify: () => void;
  updateFavoriteCount: () => Promise<any>;
  toJSONFor: (user: iUser | null) => void;
}
export default mongoose.model<iArticle>("Article", ArticleSchema);
