import exppress from "express";
import {
  createCouponCtrl,
  getAllCouponsCtrl,
  getCouponCtrl,
} from "../controllers/couponsCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponsRouter = exppress.Router();

couponsRouter.post("/", isLoggedIn, createCouponCtrl);

couponsRouter.get("/", getAllCouponsCtrl);

couponsRouter.get("/single", getCouponCtrl);
export default couponsRouter;