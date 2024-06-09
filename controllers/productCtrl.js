import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";


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

	//find the category
	const categoryFound = await Category.findOne({
		name: category,
	});
	if (!categoryFound) {
		throw new Error(
			"Category not found, please create category first or check category name"
		);
	}

	//find the brand
	const brandFound = await Brand.findOne({
		name: "addidas",
	});

	if (!brandFound) {
		throw new Error(
			"Brand not found, please create brand first or check brand name"
		);
	}

	//create the product
	const product = await Product.create({
		name,
		description,
		category,
		price,
		user: req.userAuthId,
		totalQty,
		brand,
		sizes,
		colors
	})

	//push the product into category
	categoryFound.products.push(product._id);
	//resave
	await categoryFound.save();
	//push the product into brand
	brandFound.products.push(product._id);
	//resave
	await brandFound.save();



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
		total,
		results: products.length,
		pagination,
		message: "products fetched successfully",
		products
	})
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductCtrl = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		throw new Error("Prouduct not found");
	}
	res.json({
		status: "success",
		message: "Product fetched successfully",
		product,
	});
});

// @desc    update  product
// @route   PUT /api/products/:id/update
// @access  Private/Admin
export const updateProductCtrl = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		category,
		user,
		price,
		totalQty,
		brand,
		sizes,
		colors
	} = req.body;
	//validation

	//update
	const product = await Product.findByIdAndUpdate(
		req.params.id,
		{
			name,
			description,
			category,
			user,
			price,
			totalQty,
			brand,
			sizes,
			colors
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.json({
		status: "success",
		message: "Product updated successfully",
		product,
	});
});

// @desc    delete  product
// @route   DELETE /api/products/:id/delete
// @access  Private/Admin
export const deleteProductCtrl = asyncHandler(async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.json({
		status: "success",
		message: "Product deleted successfully",
	});
});

