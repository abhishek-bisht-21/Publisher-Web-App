import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrhandler } from '../middlewares/globalErrHandler.js';


dbConnect();
const app = express();

//parse incoming data
app.use(express.json());

//routes
app.use('/', userRoutes);

//err middleware
app.use(globalErrhandler);

export default app;