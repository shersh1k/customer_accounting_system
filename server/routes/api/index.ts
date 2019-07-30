import * as express from "express";
import users from "./users";
import profiles from "./profiles";
import articles from "./articles";
import tags from "./tags";

const router = express.Router();

router.use("/", users);
router.use("/profiles", profiles);
router.use("/articles", articles);
router.use("/tags", tags);

router.use(function(err: any, req: any, res: any, next: any) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors: any, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
