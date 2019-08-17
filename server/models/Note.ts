import { Schema, Document, model } from 'mongoose';
import { iUserModel } from './User';
import { iOrderModel } from './Order';

var NoteSchema = new Schema<iNoteModel>(
  {
    title: {
      type: String,
      required: [true, "can't be blank"]
    },
    body: {
      type: String,
      required: [true, "can't be blank"]
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' }
  },
  { timestamps: true }
);

NoteSchema.methods.toJSONFor = function() {
  return {
    id: this._id,
    title: this.title,
    body: this.body,
    order: this.order.toJSON(),
    author: this.author.toJSON(),
    createdAt: this.createdAt
  };
};

export interface iNoteJSON {
  title: string;
  body: string;
  order: iOrderModel;
  author: iUserModel;
  createdAt: Date;
}

export interface iNoteModel extends Document, iNoteJSON {
  updatedAt: Date;
  toJSONFor: () => iNoteJSON;
}
export default model<iNoteModel>('Note', NoteSchema);
