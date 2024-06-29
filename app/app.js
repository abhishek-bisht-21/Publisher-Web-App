import express from 'express';
import dotenv from 'dotenv';
import Stripe from "stripe";
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import categoriesRouter from '../routes/categoriesRouter.js';
import { globalErrhandler, notFound } from '../middlewares/globalErrHandler.js';
import productsRouter from '../routes/productsRoute.js';
import brandsRouter from '../routes/brandsRouter.js';
import colorRouter from '../routes/colorRouter.js';
import reviewRouter from '../routes/reviewsRouter.js';
import orderRouter from '../routes/ordersRouter.js';
import Order from "../model/Order.js";
import couponsRouter from "../routes/couponsRouter.js";


dbConnect();
const app = express();

//Stripe webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_52e03d91547d4a90dfb03f811f9650aa17ef0b17cd4ffa699ff4447d0c4a0265";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("event");
    } catch (err) {
      console.log("err", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === "checkout.session.completed") {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      //find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        {
          new: true,
        }
      );
      console.log(order);
    } else {
      return;
    }
    response.send();
  }
);


//parse incoming data
app.use(express.json());

//routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use("/api/v1/brands/", brandsRouter);
app.use("/api/v1/color/", colorRouter);
app.use("/api/v1/reviews/", reviewRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/coupons/", couponsRouter);

//err middleware
app.use(notFound)
app.use(globalErrhandler);

export default app;