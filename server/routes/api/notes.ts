import * as express from "express";
import * as mongoose from "mongoose";

var router = express.Router();
var Order = mongoose.model("Order");

// return a list of tags
router.get("/", function(req: any, res: any, next: any) {
  Order.find()
    .distinct("tagList")
    .then(function(tags: any) {
      return res.json({ tags: tags });
    })
    .catch(next);
});

export default router;
