import { Schema, Document, model } from "mongoose";
import { iUserModel } from "./User";
import { iOrder } from "./Order";

var CommentSchema = new Schema<iCommentModel>(
  {
    body: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    order: { type: Schema.Types.ObjectId, ref: "Order" }
  },
  { timestamps: true }
);

// Requires population of author
CommentSchema.methods.toJSONFor = function(user: iUserModel) {
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user) as iUserModel // TODO чето надо сделать тут
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
  order: iOrder;
  createdAt: Date;
  updatedAt: Date;
  toJSONFor: (user: iUserModel) => iCommentJSON;
}
export default model<iCommentModel>("Comment", CommentSchema);
