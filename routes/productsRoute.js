import express from 'express';
import { createProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl, deleteProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

import upload from "../config/fileUpload.js";

const productsRouter = express.Router();


productsRouter.post('/', isLoggedIn,   isAdmin, upload.array("files"),createProductCtrl);
productsRouter.get('/', getProductsCtrl);
productsRouter.get('/:id',getProductCtrl);
productsRouter.put('/:id',isLoggedIn ,isAdmin ,updateProductCtrl);
productsRouter.delete("/:id/delete", isLoggedIn,isAdmin ,deleteProductCtrl);

export default productsRouter;