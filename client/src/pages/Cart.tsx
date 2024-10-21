import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import NoDataFound from "../components/NoDataFound";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";

const Cart = () => {
	const { cart, cartTotalBill, totalItems } = useSelector((state: RootState) => state.cart);
	const { removeFromCart, updateCartItemQuantity } = useCart();
	const navigate = useNavigate();

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(id);
			return;
		}
		updateCartItemQuantity(id, quantity);
	};

	const handleCheckout = () => {
		toast.success("Purchase successful!");
		navigate("/");
	};

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

			{cart.length === 0 ? (
				<NoDataFound />
			) : (
				<>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{cart.map((item) => {
							const product = item.product;
							return (
								<div
									key={item._id}
									className="flex items-center bg-white shadow-md p-4 rounded-lg"
								>
									<Link to={`/products/${product._id}`}>
										<img
											src={product.imageUrl}
											alt={product.name}
											className="w-20 h-20 object-cover rounded-lg"
										/>
									</Link>
									<div className="ml-4 flex-1">
										<h2 className="text-lg font-bold">{product.name}</h2>
										<p className="text-sm text-gray-500">
											{product.description}
										</p>
										<p className="text-blue-600 font-semibold">
											${product?.price?.toFixed(2)}
										</p>

										{/* Quantity controls */}
										<div className="mt-2 flex items-center">
											<button
												className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
												onClick={() =>
													updateQuantity(item._id, item.quantity - 1)
												}
											>
												-
											</button>
											<span className="px-4 py-1 bg-gray-100 text-center">
												{item.quantity}
											</span>
											<button
												className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
												onClick={() =>
													updateQuantity(item._id, item.quantity + 1)
												}
											>
												+
											</button>
										</div>

										{/* Remove button */}
										<button
											className="mt-2 text-red-600 hover:text-red-800 text-sm"
											onClick={() => removeFromCart(item._id)}
										>
											Remove
										</button>
									</div>
								</div>
							);
						})}
					</div>

					{/* Summary Section */}
					<div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
						<h2 className="text-xl font-bold">Order Summary</h2>
						<div className="flex justify-between text-gray-700">
							<p>Total Items</p>
							<p>{totalItems}</p>
						</div>
						<div className="flex justify-between text-gray-700">
							<p>Total Price</p>
							<p>${cartTotalBill.toFixed(2)}</p>
						</div>

						<button
							onClick={handleCheckout}
							className="block w-full mt-4 px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
						>
							Proceed to Checkout
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
