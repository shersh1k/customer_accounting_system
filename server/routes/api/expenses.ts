import * as express from 'express';
import * as mongoose from 'mongoose';
import Expense from '../../models/Expense';
import { auth } from '../auth';
import User from '../../models/User';
import Order from '../../models/Order';

var router = express.Router();

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);
      const expense = new Expense(req.body.expense);
      expense.author = user;
      return expense.save().then(function(expense) {
        return Order.findById(req.body.expense.order).then(function(order) {
          if (!order) return null;
          order.expenses.push(expense);
          order.save();
          return res.json({ expense: expense.toJSON() });
        });
      });
    })
    .catch(next);
});

export default router;
