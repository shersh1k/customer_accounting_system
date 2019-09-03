import * as express from 'express';
import api from './api';
import { auth } from './auth';
import User from '../models/User';
import Order from '../models/Order';
import { title1, title2, description } from './dictionary';
import generateArray from './generator';

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
