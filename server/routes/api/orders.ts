import * as express from 'express';
import { auth } from '../auth';
import Order, { iOrderModel } from '../../models/Order';
import Note, { iNoteModel } from '../../models/Note';
import User from '../../models/User';
import { isNull } from 'util';
import Expense from '../../models/Expense';

const router = express.Router();

router.get('/', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error('Нет такого пользователя');
      Order.find({ author: user.id }, function(err, docs) {
        if (err) return new Error(err.message);
        return res.json(docs);
      });
    })
    .catch(next);
});

router.get('/byDateDeadline', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error('Нет такого пользователя');
      Order.find(
        {
          author: user.id,
          $or: [{ dateStartWork: { $exists: false } }, { dateStartWork: { $lte: new Date() } }],
          dateDeadline: { $exists: true }
        },
        function(err, docs) {
          if (err) return new Error(err.message);
          docs = docs.sort((a: any, b: any) => new Date(a.dateDeadline).getTime() - new Date(b.dateDeadline).getTime());
          return res.json(docs);
        }
      );
    })
    .catch(next);
});

router.get('/byDateStartWork', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error('Нет такого пользователя');
      Order.find(
        {
          author: user.id,
          $and: [{ dateStartWork: { $exists: true } }, { dateStartWork: { $gte: new Date() } }]
        },
        function(err, docs) {
          if (err) return new Error(err.message);
          docs = docs.sort(
            (a: any, b: any) => new Date(a.dateStartWork).getTime() - new Date(b.dateStartWork).getTime()
          );
          return res.json(docs);
        }
      );
    })
    .catch(next);
});

router.get('/notPayed', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error('Нет такого пользователя');
      Order.find({ author: user.id, dateFinishWork: { $exists: true }, datePay: { $exists: false } }, function(
        err,
        docs
      ) {
        if (err) return new Error(err.message);
        docs = docs.slice(0, 10);
        return res.json(docs);
      });
    })
    .catch(next);
});

router.get('/lastTen', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error('Нет такого пользователя');
      Order.find({ author: user.id })
        .limit(10)
        .sort({ createdAt: -1 })
        .then(value => res.json(value));
    })
    .catch(next);
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);
      const order = new Order(req.body.order);
      order.author = user;
      return order.save().then(function() {
        return res.json({ order: order.toJSON() });
      });
    })
    .catch(next);
});

router.get('/:order', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error('Нет такого пользователя');
      Order.findOne({ author: user.id, slug: req.params.order }, function(err, docs) {
        if (err) return new Error(err.message);
        return res.json(docs);
      });
    })
    .catch(next);
});

// update order
router.put('/', auth.required, function(req, res, next) {
  User.findById(req.user.id).then(function(user) {
    if (!user) throw new Error('Нет такого пользователя');
    Expense.insertMany([])
    Order.findOneAndUpdate({ _id: req.body.order._id }, req.body.order, { new: true }, function(err, doc) {
      if (doc) return res.json(doc);
      else return res.sendStatus(401);
    });
  });
});

// delete order
/* 
router.put('/', auth.required, function(req, res, next) {
  User.findById(req.user.id).then(function(user) {
    if (!user) throw new Error('Нет такого пользователя');
    Order.findById(req.body.order._id, function(err, docs) {
      //updateOne
      if (err) return new Error(err.message);
      if (isNull(docs)) return new Error('Не нашелся заказ для обновления');
      if (req.body.order.title) docs.title = req.body.order.title;
      if (req.body.order.dateStartWork) docs.dateStartWork = req.body.order.dateStartWork;
      if (req.body.order.priceOrder) docs.priceOrder = req.body.order.priceOrder;
      docs.save();
      return res.json(docs);
    });
  });
});
router.delete('/:order', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      if (req.order.author._id.toString() === req.user.id.toString()) {
        return req.order.remove().then(function() {
          return res.sendStatus(204);
        });
      } else {
        return res.sendStatus(403);
      }
    })
    .catch(next);
}); */

export default router;
