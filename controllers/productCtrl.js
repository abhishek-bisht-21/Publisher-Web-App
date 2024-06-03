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


	//filter by name
	if (req.query.name) {
		productQuery = productQuery.find({
			name: { $regex: req.query.name, $options: "i" },
		});
	}

	//filter by brand
	if (req.query.brand) {
		productQuery = productQuery.find({
			brand: { $regex: req.query.brand, $options: "i" },
		});
	}

	//filter by category
	if (req.query.brand) {
		productQuery = productQuery.find({
			category: { $regex: req.query.category, $options: "i" },
		});
	}

	//filter by price range
	if (req.query.price) {
		const priceRange = req.query.price.split("-");
		//gte: greater or equal
		//lte: less than or equal to
		productQuery = productQuery.find({
			price: { $gte: priceRange[0], $lte: priceRange[1] },
		});
	}

	//pagination
	//page
	const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
	//limit
	const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
	//startIdx
	const startIndex = (page - 1) * limit;
	//endIdx
	const endIndex = page * limit;
	//total
	const total = await Product.countDocuments();

	productQuery = productQuery.skip(startIndex).limit(limit);

	//pagination results
	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	// await the query
	const products = await productQuery;

	res.json({
		status: "Success",
		products
	})
})