import * as express from "express";
import { auth } from "../auth";
import Order, { iOrder } from "../../models/Order";
import Comment, { iCommentModel } from "../../models/Comment";
import User from "../../models/User";

const router = express.Router();

// Preload order objects on routes with ':order'
router.param("order", function(req, res, next, slug) {
  Order.findOne({ slug: slug })
    .populate("author")
    .then(function(order) {
      if (!order) return res.sendStatus(404);
      req.order = order;
      return next();
    })
    .catch(next);
});

router.param("comment", function(req, res, next, id) {
  Comment.findById(id)
    .then(function(comment) {
      if (!comment) return res.sendStatus(404);
      req.comment = comment;
      return next();
    })
    .catch(next);
});

router.get("/feed", auth.required, function(req, res, next) {
  let limit = 20;
  let offset = 0;

  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset;
  }

  User.findById(req.user.id).then(function(user) {
    if (!user) {
      return res.sendStatus(401);
    }

    Promise.all([
      Order.find({ author: { $in: user.following } })
        .limit(Number(limit))
        .skip(Number(offset))
        .populate("author")
        .exec(),
      Order.count({ author: { $in: user.following } })
    ])
      .then(function(results) {
        let orders = results[0];
        let ordersCount = results[1];

        return res.json({
          orders: orders.map(function(order) {
            return order.toJSONFor(user);
          }),
          ordersCount: ordersCount
        });
      })
      .catch(next);
    return;
  });
});

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

// return a order
router.get("/:order", auth.optional, function(req, res, next) {
  Promise.all([req.user ? User.findById(req.user.id) : null, req.order.populate("author").execPopulate()])
    .then(function(results) {
      let user = results[0];
      if (!user) return;
      return res.json({ order: req.order.toJSONFor(user) });
    })
    .catch(next);
});

// update order
router.put("/:order", auth.required, function(req, res, next) {
  User.findById(req.user.id).then(function(user) {
    if (req.order.author._id.toString() === req.user.id.toString()) {
      if (typeof req.body.order.title !== "undefined") {
        req.order.title = req.body.order.title;
      }

      if (typeof req.body.order.description !== "undefined") {
        req.order.description = req.body.order.description;
      }

      req.order
        .save()
        .then(function(order: iOrder) {
          if (!user) return;
          return res.json({ order: order.toJSONFor(user) });
        })
        .catch(next);
    } else {
      return res.sendStatus(403);
    }
    return;
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

// return an order's comments
router.get("/:order/comments", auth.optional, function(req, res, next) {
  Promise.resolve(req.user ? User.findById(req.user.id) : null)
    .then(function(user) {
      return req.order
        .populate({
          path: "comments",
          populate: {
            path: "author"
          },
          options: {
            sort: {
              createdAt: "desc"
            }
          }
        })
        .execPopulate()
        .then(function(order: iOrder) {
          return res.json({
            comments: req.order.comments.map(function(comment) {
              if (!user) return;
              return comment.toJSONFor(user);
            })
          });
        });
    })
    .catch(next);
});

// create a new comment
router.post("/:order/comments", auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);

      let comment = new Comment(req.body.comment);
      comment.order = req.order;
      comment.author = user;

      comment.save().then(function() {
        req.order.comments.push(comment);
        return req.order.save().then(function(order: iOrder) {
          res.json({ comment: comment.toJSONFor(user) });
        });
      });
      return;
    })
    .catch(next);
});

router.delete("/:order/comments/:comment", auth.required, function(req: any, res, next) {
  if (req.comment.author.toString() === req.user.id.toString()) {
    req.order.comments.remove(req.comment._id);
    req.order
      .save()
      .then(
        Comment.find({ _id: req.comment._id })
          .remove()
          .exec()
      )
      .then(function() {
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
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

/* 
router.get("/", auth.optional, function(req, res, next) {
  let query: any = {};
  let limit = 20;
  let offset = 0;

  if (typeof req.query.limit !== "undefined") {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== "undefined") {
    offset = req.query.offset;
  }

  if (typeof req.query.tag !== "undefined") {
    query.tagList = { $in: [req.query.tag] };
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ])
    .then(function(results) {
      let author = results[0];
      let favoriter = results[1];

      if (author) {
        query.author = author._id;
      }

      if (favoriter) {
        query._id = { $in: favoriter.favorites };
      } else if (req.query.favorited) {
        query._id = { $in: [] };
      }

      return Promise.all([
        Order.find(query)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ createdAt: "desc" })
          .populate("author")
          .exec(),
        Order.count(query).exec(),
        req.user ? User.findById(req.user.id) : null
      ]).then(function(results) {
        let orders = results[0];
        let ordersCount = results[1];
        let user = results[2];

        return res.json({
          orders: orders.map(function(order) {
            if (user) return order.toJSONFor(user);
          }),
          ordersCount: ordersCount
        });
      });
    })
    .catch(next);
});


// Favorite an order
router.post("/:order/favorite", auth.required, function(req, res, next) {
  let orderId = req.order._id;

  User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.favorite(orderId).then(function() {
        return req.order.updateFavoriteCount().then(function(order: iOrder) {
          return res.json({ order: order.toJSONFor(user) });
        });
      });
    })
    .catch(next);
}); */

// Unfavorite an order
/* router.delete("/:order/favorite", auth.required, function(req, res, next) {
  let orderId = req.order._id;

  User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.unfavorite(orderId).then(function() {
        return req.order.updateFavoriteCount().then(function(order: iOrder) {
          return res.json({ order: order.toJSONFor(user) });
        });
      });
    })
    .catch(next);
}); 
*/
