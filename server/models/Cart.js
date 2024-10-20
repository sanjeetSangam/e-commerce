import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		items: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
				quantity: { type: Number, required: true, default: 1 },
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
