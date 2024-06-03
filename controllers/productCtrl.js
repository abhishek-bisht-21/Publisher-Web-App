import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";


// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProductCtrl = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { name, description, category, price, totalQty, user, brand } =
		req.body;
	//Product exists
	const productExists = await Product.findOne({ name });
	if (productExists) {
		throw new Error("Product Already Exists");
	}

	//create the product
	const product = await Product.create({
		name,
		description,
		category,
		price,
		user: req.userAuthId,
		totalQty,
		brand
	})

	res.json({
		status: "success",
		message: "Product created successfully",
		product,
	});
});

// @desc Get all products
// @route GET /api/v1/products
// @access  Public


export const getProductsCtrl = asyncHandler(async (req, res) => {
	// query
	let productQuery = Product.find()


	//search by name
	if (req.query.name) {
		productQuery = productQuery.find({
			name: { $regex: req.query.name, $options: "i" },
		});
	}

	// await the query
	const products = await productQuery;

	res.json({
		status: "Success",
		products
	})
})