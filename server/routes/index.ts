import * as express from 'express';
import api from './api';
import { auth } from './auth';
import User, { iUserModel } from '../models/User';
import Order from '../models/Order';
import { title1, title2, description } from './dictionary';

const router = express.Router();
router.use('/api', api);
router.get('/generate', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);
      const orders = generateArray(title1, title2, description, user);
      Order.insertMany(orders, function(error, docs) {});
      return;
    })
    .catch(next);
});

export default router;

function generateArray(
  title1: string[] /* 96 */,
  title2: string[] /* 186 */,
  description: string[] /* 300 */,
  user: iUserModel
) {
  title1 = title1.map(item => item.trim());
  title2 = title2.map(item => item.trim());
  description = description.map(item => item.trim());
  const array: any[] = [];
  for (let index = 0; index < 20; index++) {
    const dateOrder = new Date(getRandom(1565909435547, 1565996098657));
    const dateDeadline = new Date(getRandom(1577826000000, dateOrder.getTime() + 86400000 * 2));
    let element = {
      title: getTitle(title1, title2),
      description: getDescription(description),
      priceOrder: getRandom(10000, 50),
      dateOrder: dateOrder,
      dateDeadline: dateDeadline,
      author: user
    };
    array.push(element);
  }
  return array;
}

function getRandom(max: number, min: number = 0) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
function getTitle(title1: string[], title2: string[]) {
  return title1[getRandom(96)] + ' ' + title2[getRandom(186)];
}
function getDescription(description: string[]) {
  const countWords = getRandom(250, 50);
  let descr = '';
  for (let index = 0; index < countWords; index++) {
    descr += ' ' + description[getRandom(300)];
  }
  return descr;
}
