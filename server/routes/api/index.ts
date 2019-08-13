import * as express from "express";
import users from "./users";
import orders from "./orders";
import notes from "./notes";

const router = express.Router();
router.use("/", users);
router.use("/orders", orders);
router.use("/tags", notes);

export default router;
