import Product from "../models/Product.js";

// Create a new product
export const createProduct = async (req, res) => {
	const { name, description, price, category, imageUrl, stock } = req.body;

	const product = new Product({ name, description, price, category, imageUrl, stock });

	try {
		const createdProduct = await product.save();
		res.status(201).json(createdProduct);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get all products
export const getProducts = async (req, res) => {
	const { category, priceRange } = req.query;

	const filter = {};
	if (category) {
		filter.category = category;
	}
	if (priceRange) {
		const [min, max] = priceRange.split("-");
		filter.price = { $gte: min, $lte: max };
	}

	try {
		const products = await Product.find(filter);
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a product by ID
export const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update a product
export const updateProduct = async (req, res) => {
	const { name, description, price, category, imageUrl, stock } = req.body;

	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		product.name = name || product.name;
		product.description = description || product.description;
		product.price = price || product.price;
		product.category = category || product.category;
		product.imageUrl = imageUrl || product.imageUrl;
		product.stock = stock || product.stock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete a product
export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await product.remove();
		res.json({ message: "Product removed" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
