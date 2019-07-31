import * as mongoose from "mongoose";
import { iUser } from "./User";
import { iArticle } from './Article';

var CommentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" }
  },
  { timestamps: true }
);

// Requires population of author
CommentSchema.methods.toJSONFor = function(user: mongoose.Model<mongoose.Document, {}>) {
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

export interface iComment extends mongoose.Document {
  body: string;
  author: iUser;
  article: iArticle;
  toJSONFor: (user: iUser | null) => void;
}
export default mongoose.model<iComment>("Comment", CommentSchema);
