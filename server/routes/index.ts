import * as express from 'express';
import api from './api';
import { auth } from './auth';
import User from '../models/User';
import Order from '../models/Order';
import { noun, adjective, description } from './dictionary';
import generateArray from './generator';
import Note from '../models/Note';
import Expense from '../models/Expense';

const router = express.Router();
router.use('/api', api);
router.get('/generate', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);
      const orders = generateArray(user, { noun, adjective, description }, req.query);
      Order.insertMany(orders.orders, function(error, docs) {});
      Expense.insertMany(orders.expenses, function(error, docs) {});
      Note.insertMany(orders.notes, function(error, docs) {});
      return;
    })
    .catch(next);
});

export default router;
