import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		price: { type: Number, required: true },
		category: { type: String, required: true },
		imageUrl: { type: String },
		stock: { type: Number, default: 0 },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
