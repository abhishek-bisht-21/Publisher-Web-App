import express from 'express';
import dotenv from 'dotenv';
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


dbConnect();
const app = express();

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

//err middleware
app.use(notFound)
app.use(globalErrhandler);

export default app;