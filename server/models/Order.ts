import { Schema, Document, model, Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as slug from 'slug';
import { iUserModel } from './User';
import Note, { iNoteModel } from './Note';
import Expense, { iExpenseModel } from './Expense';
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

OrderSchema.methods.toJSONWithChild = function() {
  const notes = Note.find({ _id: { $in: this.notes } }).exec();
  const expenses = Expense.find({ _id: { $in: this.expenses } }).exec();
  return Promise.all([notes, expenses]).then(([notes, expenses]) => {
    return {
      id: this._id,
      slug: this.slug,
      title: this.title,
      priceOrder: this.priceOrder,
      description: this.description,
      dateOrder: this.dateOrder,
      dateStartWork: this.dateStartWork,
      dateFinishWork: this.dateFinishWork,
      dateDeadline: this.dateDeadline,
      datePay: this.datePay,
      expenses: expenses.map(item => item.toJSON()),
      notes: notes.map(item => item.toJSON()),
      customer: this.customer
    };
  });
};

OrderSchema.methods.toJSONForList = function() {
  return {
    id: this._id,
    slug: this.slug,
    title: this.title,
    priceOrder: this.priceOrder,
    dateOrder: this.dateOrder,
    dateStartWork: this.dateStartWork,
    dateFinishWork: this.dateFinishWork,
    dateDeadline: this.dateDeadline,
    datePay: this.datePay
  };
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
  expenses: iExpenseModel[];
  notes: iNoteModel[];
  customer: iCustomerModel;
  author: iUserModel;
}

export interface iOrderModel extends Document, iOrderJSON {
  createdAt: Date;
  updatedAt: Date;
  slugify: () => void;
  toJSONWithChild: () => Promise<any>;
  toJSONForList: () => any;
}
export default model<iOrderModel>('Order', OrderSchema);
