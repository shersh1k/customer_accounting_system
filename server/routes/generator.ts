import { iUserModel } from '../models/User';
import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

interface iRandom {
  adjective: string[] /* 96 */;
  noun: string[] /* 186 */;
  description: string[] /* 300 */;
}

export default function generateArray(user: iUserModel, random: iRandom, params: any) {
  const orders: any[] = [];
  const expenses: any[] = [];
  const notes: any[] = [];

  for (let index = 0; index < params.count; index++) {
    const _id = mongoose.Types.ObjectId();
    const title = getTitle(random.adjective, random.noun);
    const description = getDescription(random.description);
    const priceOrder = getRandom(10000, 50);
    const dateOrder = new Date(getRandom(getTime(params.fromDate), getTime(params.toDate)));
    const dateDeadline = new Date(getRandom(dateOrder.getTime(), dateOrder.getTime() + msInDay * 21));
    const orderExpenses = getExpenses(dateOrder, _id, user, random.description);
    expenses.push(...orderExpenses);
    const orderNotes = getNotes(dateOrder, _id, user, random.description);
    let dateStartWork = undefined;
    let dateFinishWork = undefined;
    let datePay = undefined;
    if (dateDeadline.getTime() < new Date().getTime()) {
      dateStartWork = new Date(getRandom(dateOrder.getTime(), dateDeadline.getTime()));
      dateFinishWork = new Date(getRandom(dateStartWork.getTime(), dateDeadline.getTime()));
      if (dateFinishWork.getTime() > new Date().getTime() - msInDay * 21) datePay = undefined;
      else datePay = new Date(getRandom(dateDeadline.getTime(), dateDeadline.getTime() + msInDay * 21));
    }
    if (dateDeadline.getTime() < new Date().getTime() + msInDay * 21) dateStartWork = dateOrder;
    if (dateDeadline.getTime() >= new Date().getTime() + msInDay * 21)
      dateStartWork = new Date(getRandom(dateOrder.getTime(), dateDeadline.getTime()));
    orders.push({
      _id,
      title,
      description,
      priceOrder,
      dateOrder,
      dateDeadline,
      dateStartWork,
      dateFinishWork,
      datePay,
      expenses: orderExpenses.map(item => item._id),
      author: user
    });
  }
  return { orders, expenses, notes };
}

const msInDay = 24 * 60 * 60 * 1000;
function getRandom(min: number, max: number) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
function getTitle(title1: string[], title2: string[]) {
  return title1[getRandom(0, 95)] + ' ' + title2[getRandom(0, 185)];
}
function getDescription(description: string[], numWords: number = 100) {
  const countWords = getRandom(5, numWords);
  let descr = '';
  for (let index = 0; index < countWords; index++) {
    descr += ' ' + description[getRandom(0, 300)];
  }
  return descr;
}
function getExpenses(date: Date, order: ObjectID, author: iUserModel, description: string[]) {
  const expenses: any[] = [];
  const count = getRandom(0, 5);
  for (let index = 0; index < count; index++) {
    const _id = mongoose.Types.ObjectId();
    const desc = getDescription(description, 15);
    const cost = getRandom(0, 500);
    const spendDate = date;
    expenses.push({ description: desc, cost, spendDate, author, order, _id });
  }
  return expenses;
}
function getNotes(date: Date, _id: ObjectID, user: iUserModel, description: string[]) {
  const notes: any[] = [];
  return notes;
}
function getTime(date: Date) {
  return new Date(date).getTime();
}
