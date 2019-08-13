import * as express from "express";
import { auth } from "../auth";
import Order, { iOrder } from "../../models/Order";
import Comment, { iCommentModel } from "../../models/Notes";
import User from "../../models/User";
import { isNull } from "util";

const router = express.Router();

router.post("/", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }
      let order = new Order(req.body.order);
      order.author = user;
      return order.save().then(function() {
        return res.json({ order: order.toJSONFor(user) });
      });
    })
    .catch(next);
});

router.get("/", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error("Нет такого пользователя");
      Order.find({ author: user.id }, function(err, docs) {
        if (err) return new Error(err.message);
        return res.json(docs);
      });
    })
    .catch(next);
});

router.get("/lastTen", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error("Нет такого пользователя");
      Order.find({ author: user.id }, function(err, docs) {
        if (err) return new Error(err.message);
        docs = docs.reverse().slice(0, 10);
        return res.json(docs);
      });
    })
    .catch(next);
});

router.get("/notPayed", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error("Нет такого пользователя");
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

router.get("/byDateStartWork", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error("Нет такого пользователя");
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

router.get("/byDateDeadline", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error("Нет такого пользователя");
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

// return a order
router.get("/:order", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) throw new Error("Нет такого пользователя");
      Order.findOne({ author: user.id, slug: req.params.order }, function(err, docs) {
        if (err) return new Error(err.message);
        return res.json(docs);
      });
    })
    .catch(next);
});

// update order
router.put("/", auth.required, function(req, res, next) {
  User.findById(req.user.id).then(function(user) {
    if (!user) throw new Error("Нет такого пользователя");
    Order.findById(req.body.order._id, function(err, docs) {
      //updateOne
      if (err) return new Error(err.message);
      if (isNull(docs)) return new Error("Не нашелся заказ для обновления");
      if (req.body.order.title) docs.title = req.body.order.title;
      if (req.body.order.dateStartWork) docs.dateStartWork = req.body.order.dateStartWork;
      if (req.body.order.priceOrder) docs.priceOrder = req.body.order.priceOrder;
      docs.save() /* .then(() => res.json(docs)) */;
      return res.json(docs);
    });
  });
});

// delete order
router.delete("/:order", auth.required, function(req, res, next) {
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
});

export default router;
declare global {
  namespace Express {
    interface Request {
      comment: iCommentModel;
      order: iOrder;
    }
  }
}
