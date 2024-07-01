import express  from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from "../controllers/categoriesCtrl.js";
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import catetgoryFileUpload from "../config/categoryUpload.js";


const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, catetgoryFileUpload.single("file"),createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id", deleteCategoryCtrl);
categoriesRouter.put("/:id", updateCategoryCtrl);

export default categoriesRouter
