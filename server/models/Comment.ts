import * as mongoose from "mongoose";

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

mongoose.model("Comment", CommentSchema);
export default CommentSchema;
