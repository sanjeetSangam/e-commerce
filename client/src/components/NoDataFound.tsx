import React from "react";
import { Link } from "react-router-dom";
import NO_CART_ITEMS from "../assets/cart.png";

const NoDataFound: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full py-20 text-center">
			<img
				src={NO_CART_ITEMS}
				alt=""
				className="aspect-square w-[100px] pointer-events-none select-none "
			/>
			<h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
			<p className="text-gray-500 mt-2">
				It looks like you haven't added anything to your cart yet.
			</p>
			<Link
				to="/"
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Continue Shopping
			</Link>
		</div>
	);
};

export default NoDataFound;
