import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../hooks/useCart";

interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl: string;
	stock: number;
}

const Product = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>();
	const { addToCart } = useCart();

	const fetchProduct = async () => {
		try {
			const { data } = await axios.get(`/api/products/${id}`, { withCredentials: true });
			setProduct(data);
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (!product) {
		return (
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-semibold mb-2">Product</h1>
				<p className="text-gray-600 mb-4">Loading...</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 mt-10">
			<div
				className={`flex flex-col md:flex-row items-start transition-opacity duration-700 ${
					isLoaded ? "opacity-100" : "opacity-0"
				}`}
			>
				{/* Image Section */}
				<div className="w-full md:w-1/2">
					<img
						className="w-1/2 m-auto h-auto object-cover rounded-lg animate-fadeIn"
						src={product.imageUrl}
						alt="Product"
					/>
				</div>

				{/* Details Section */}
				<div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
					<h1
						className={`text-2xl md:text-4xl font-semibold mb-2 transition-transform transform ${
							isLoaded ? "translate-y-0" : "-translate-y-4"
						}`}
					>
						{product.name}
					</h1>
					<p
						className={`text-gray-600 mb-4 transition-transform transform ${
							isLoaded ? "translate-y-0" : "-translate-y-4"
						}`}
					>
						{product.description}
					</p>
					<p
						className={`text-lg md:text-2xl font-bold text-blue-600 mb-4 transition-transform transform ${
							isLoaded ? "translate-y-0" : "-translate-y-4"
						}`}
					>
						${product.price}
					</p>

					{/* Action Buttons */}
					<div className="flex flex-row space-x-4 mt-4">
						<button
							className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition ease-in-out duration-300 ${
								isLoaded ? "translate-y-0" : "translate-y-2"
							}`}
						>
							Buy Now
						</button>
						<button
							className={`bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500 transition ease-in-out duration-300 ${
								isLoaded ? "translate-y-0" : "translate-y-2"
							}`}
							onClick={() => addToCart(product)}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
