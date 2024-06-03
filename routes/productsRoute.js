import express from 'express';
import { createProductCtrl, getProductsCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productsRouter = express.Router();


productsRouter.post('/', isLoggedIn, createProductCtrl);
productsRouter.get('/', getProductsCtrl);

export default productsRouter;