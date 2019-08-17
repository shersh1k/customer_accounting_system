import { Schema, Document, model, Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as slug from 'slug';
import { iUserModel } from './User';
import { iNoteModel } from './Note';
import { iExpenseModel } from './Expense';
import { iCustomerModel } from './Customer';

var OrderSchema = new Schema<iOrderModel>(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    priceOrder: Number,
    description: String,
    dateOrder: Date,
    dateStartWork: Date,
    dateDeadline: Date,
    dateFinishWork: Date,
    datePay: Date,
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

OrderSchema.plugin(uniqueValidator, { message: 'is already taken' });

OrderSchema.pre<iOrderModel>('validate', function(next) {
  if (!this.slug) this.slugify();
  next();
});

OrderSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

interface iOrderJSON {
  slug: string;
  title: string;
  priceOrder: number;
  description: string;
  dateOrder: Date;
  dateStartWork: Date;
  dateFinishWork: Date;
  dateDeadline: Date;
  datePay: Date;
  priceMaterials: number;
  expenses: iExpenseModel[];
  notes: iNoteModel[];
  customer: iCustomerModel;
  author: iUserModel;
}

export interface iOrderModel extends Document, iOrderJSON {
  createdAt: Date;
  updatedAt: Date;
  slugify: () => void;
}
export default model<iOrderModel>('Order', OrderSchema);
