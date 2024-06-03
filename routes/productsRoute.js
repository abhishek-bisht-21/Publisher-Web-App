import express from 'express';
import { createProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productsRouter = express.Router();


productsRouter.post('/', isLoggedIn, createProductCtrl);

export default productsRouter;