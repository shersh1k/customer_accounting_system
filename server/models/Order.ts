import { Schema, Document, model, Types } from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as slug from "slug";
import { iUserModel } from "./User";
import { iCommentModel } from "./Comment";

var OrderSchema = new Schema<iOrder>(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    dateOrder: Date,
    dateStartWork: Date,
    dateFinishWork: Date,
    datePay: Date,
    recipient: [String], // Заказчик
    priceOrder: Number, //стоимость заказа
    priceMaterials: Number, //стоимость материалов
    description: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

OrderSchema.plugin(uniqueValidator, { message: "is already taken" });

OrderSchema.pre<iOrder>("validate", function(next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

OrderSchema.methods.slugify = function() {
  this.slug = slug(this.title) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

OrderSchema.methods.toJSONFor = function(user: iUserModel) {
  return {
    slug: this.slug,
    title: this.title,
    dateOrder: this.dateOrder,
    dateDeadline: this.dateDeadline,
    recipient: this.recipient,
    priceOrder: this.priceOrder,
    priceMaterials: this.priceMaterials,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toProfileJSONFor(user)
  };
};

interface iOrderJSON {
  slug: string; //для url-строки
  title: string;
  dateOrder: Date;
  dateDeadline: Date;
  recipient: any[]; // Заказчик
  priceOrder: number; //стоимость заказа
  priceMaterials: number; //стоимость материалов
  author: any; //iUserModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface iOrder extends Document, iOrderJSON {
  dateStartWork?: Date;
  dateFinishWork?: Date;
  datePay?: Date;
  description?: string;
  notes: Types.Array<iCommentModel>; //коменты типа (по ходу работы заметки?)
  slugify: () => void;
  toJSONFor: (user: iUserModel) => iOrderJSON;
}
export default model<iOrder>("Order", OrderSchema);
