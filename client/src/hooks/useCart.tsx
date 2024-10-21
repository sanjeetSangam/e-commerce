import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { addItemToCart, removeItemFromCart, updateCartItem } from "../store/slices/cartSlice";
import { Product } from "../pages";
import { toast } from "react-toastify";

const useCart = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);
	const addToCart = async (cartItem: Product) => {
		if (!user) {
			navigate("/auth/login");
			return;
		}

		try {
			await dispatch(addItemToCart(cartItem)).unwrap();
			toast.success("Item added to cart!");
		} catch (error) {
			console.log(error);
			toast.error("Failed to add item to cart");
		}
	};

	const removeFromCart = async (id: string) => {
		try {
			await dispatch(removeItemFromCart(id)).unwrap();
			toast.success("Item removed from cart!");
		} catch (error) {
			console.log(error);
			toast.error("Failed to remove item from cart");
		}
	};

	const updateCartItemQuantity = async (id: string, quantity: number) => {
		try {
			await dispatch(updateCartItem({ id, quantity })).unwrap();
			toast.success("Item quantity updated!");
		} catch (error) {
			console.log(error);
			toast.error("Failed to update item quantity");
		}
	};

	return {
		addToCart,
		removeFromCart,
		updateCartItemQuantity,
	};
};

export default useCart;
