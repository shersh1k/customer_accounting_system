import { Schema, Document, model } from 'mongoose';
import { iUserModel } from './User';
import { iOrderModel } from './Order';

var ExpenseSchema = new Schema<iExpenseModel>(
  {
    description: {
      type: String,
      required: [true, "can't be blank"]
    },
    cost: {
      type: Number,
      required: [true, "can't be blank"]
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' }
  },
  { timestamps: true }
);

ExpenseSchema.methods.toJSONFor = function() {
  return {
    id: this._id,
    description: this.description,
    cost: this.cost,
    order: this.order.toJSON(),
    author: this.author.toJSON(),
    spendDate: this.spendDate,
    createdAt: this.createdAt
  };
};

export interface iExpenseJSON {
  description: string;
  cost: number;
  order: iOrderModel;
  author: iUserModel;
  spendDate?: Date;
}

export interface iExpenseModel extends Document, iExpenseJSON {
  createdAt: Date;
  updatedAt: Date;
  toJSONFor: () => iExpenseJSON;
}
export default model<iExpenseModel>('Expense', ExpenseSchema);
