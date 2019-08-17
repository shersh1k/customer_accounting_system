import { Schema, Document, model } from 'mongoose';
import { iUserModel } from './User';
import { iOrderModel } from './Order';

var CustomerSchema = new Schema<iCustomerModel>(
  {
    fullName: {
      type: String,
      required: [true, "can't be blank"]
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    phone: Number,
    email: String,
    address: String
  },
  { timestamps: true }
);

CustomerSchema.methods.toJSONFor = function() {
  return {
    id: this._id,
    fullName: this.fullName,
    phone: this.phone,
    orders: this.orders.map(item => item.toJSON()),
    createdAt: this.createdAt
  };
};

export interface iCustomerJSON {
  fullName: string;
  orders: iOrderModel[];
  phone?: number;
  email?: string;
  address?: string;
}

export interface iCustomerModel extends Document, iCustomerJSON {
  createdAt: Date;
  updatedAt: Date;
  toJSONFor: () => iCustomerJSON;
}
export default model<iCustomerModel>('Customer', CustomerSchema);
