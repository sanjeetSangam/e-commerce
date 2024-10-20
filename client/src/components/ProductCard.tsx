import React from "react";
import { Product } from "../pages/ProductList";

interface ProductCardProps {
	product: Product;
	addToCart: (product: Product) => void;
	navigate: (path: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, navigate }) => {
	return (
		<div className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
			<img
				src={product.imageUrl}
				alt={product.name}
				onClick={() => navigate(`/products/${product._id}`)}
				className="w-full aspect-[1/1] object-contain m-auto mb-4 border border-gray-200 rounded p-3 cursor-pointer hover:scale-95 duration-100"
			/>
			<h2
				onClick={() => navigate(`/products/${product._id}`)}
				title={product.name}
				className="text-lg font-bold mb-2 line-clamp-1 cursor-pointer hover:text-blue-500 duration-100"
			>
				{product.name}
			</h2>
			<p className="text-gray-600 mb-4 line-clamp-2" title={product.description}>
				{product.description}
			</p>
			<p className="font-semibold mb-2">
				${product.price}
				{product.stock > 0 && <span> - ({product.stock} available)</span>}
			</p>
			{product.stock > 0 ? (
				<button
					onClick={() => addToCart(product)}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
				>
					Add to Cart
				</button>
			) : (
				<span className="text-red-500 font-semibold">Out of Stock</span>
			)}
		</div>
	);
};

export default ProductCard;
