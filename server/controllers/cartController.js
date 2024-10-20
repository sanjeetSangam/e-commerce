import Cart from "../models/Cart.js";

// Helper function to fetch the user's cart
const getUserCart = async (userId) => {
	return await Cart.findOne({ user: userId }).populate("items.product");
};

// Helper function to handle cart not found
const handleCartNotFound = (cart, res) => {
	if (!cart) {
		res.status(404).json({ message: "Cart not found" });
		return true;
	}
	return false;
};

// Get the current user's cart
export const getCart = async (req, res) => {
	try {
		const cart = await getUserCart(req.user._id);
		if (handleCartNotFound(cart, res)) return;
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Add an item to the cart
export const addToCart = async (req, res) => {
	const { _id: productId, quantity = 1 } = req.body;

	try {
		let cart = await Cart.findOne({ user: req.user._id });

		if (cart) {
			const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

			if (itemIndex > -1) {
				cart.items[itemIndex].quantity += +quantity;
			} else {
				cart.items.push({ product: productId, quantity });
			}
			await cart.save();
		} else {
			cart = await Cart.create({
				user: req.user._id,
				items: [{ product: productId, quantity }],
			});
		}

		const updatedCart = await getUserCart(req.user._id);
		res.status(cart ? 200 : 201).json(updatedCart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
	const { quantity } = req.body;

	try {
		const cart = await getUserCart(req.user._id);
		if (handleCartNotFound(cart, res)) return;

		const itemIndex = cart.items.findIndex((item) => item._id.toString() === req.params.id);
		if (itemIndex > -1) {
			cart.items[itemIndex].quantity = quantity;
			await cart.save();
			res.json(cart);
		} else {
			res.status(404).json({ message: "Item not found in cart" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
	try {
		const cart = await getUserCart(req.user._id);
		if (handleCartNotFound(cart, res)) return;

		cart.items = cart.items.filter((item) => item._id.toString() !== req.params.id);
		await cart.save();
		res.json(cart);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
