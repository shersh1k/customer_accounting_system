import * as express from 'express';
import Note from '../../models/Note';
import { auth } from '../auth';
import User from '../../models/User';
import Order from '../../models/Order';

var router = express.Router();

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.user.id)
    .then(function(user) {
      if (!user) return res.sendStatus(401);
      const note = new Note(req.body.note);
      note.author = user;
      return note.save().then(function(note) {
        return Order.findById(req.body.note.order).then(function(order) {
          if (!order) return null;
          order.notes.push(note);
          order.save();
          return res.json({ note: note.toJSON() });
        });
      });
    })
    .catch(next);
});

export default router;
