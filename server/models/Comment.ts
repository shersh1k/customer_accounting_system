import { Schema, Document, Model, model } from "mongoose";
import { iUserModel } from "./User";
import { iArticle } from "./Article";

var CommentSchema = new Schema<iCommentModel>(
  {
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    article: { type: Schema.Types.ObjectId, ref: "Article" }
  },
  { timestamps: true }
);

// Requires population of author
CommentSchema.methods.toJSONFor = function(user: iUserModel) {
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user) as iUserModel  // TODO чето надо сделать тут
  };
};
export interface iCommentJSON {
  // id?: any;
  body: string;
  author: iUserModel;
  createdAt: Date;
}
export interface iCommentModel extends Document, iCommentJSON {
  author: iUserModel;
  article: iArticle;
  createdAt: Date;
  updatedAt: Date;
  toJSONFor: (user: iUserModel) => iCommentJSON;
}
export default model<iCommentModel>("Comment", CommentSchema);
