import * as express from "express";
import * as mongoose from "mongoose";
import { auth } from "../auth";
const router = express.Router();
var User = mongoose.model("User");

// Preload user profile on routes with ':username'
router.param("username", function(req: any, res: any, next: any, username: any) {
  User.findOne({ username: username })
    .then(function(user: any) {
      if (!user) {
        return res.sendStatus(404);
      }

      req.profile = user;

      return next();
    })
    .catch(next);
});

router.get("/:username", auth.optional, function(req: any, res: any, next: any) {
  if (req.payload) {
    User.findById(req.payload.id).then(function(user: any) {
      if (!user) {
        return res.json({ profile: req.profile.toProfileJSONFor(false) });
      }

      return res.json({ profile: req.profile.toProfileJSONFor(user) });
    });
  } else {
    return res.json({ profile: req.profile.toProfileJSONFor(false) });
  }
});

router.post("/:username/follow", auth.required, function(req: any, res: any, next: any) {
  var profileId = req.profile._id;

  User.findById(req.payload.id)
    .then(function(user: any) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.follow(profileId).then(function() {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
});

router.delete("/:username/follow", auth.required, function(req: any, res: any, next: any) {
  var profileId = req.profile._id;

  User.findById(req.payload.id)
    .then(function(user: any) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.unfollow(profileId).then(function() {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
});

export default router;
