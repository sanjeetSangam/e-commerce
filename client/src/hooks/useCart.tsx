import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { addItemToCart, removeItemFromCart, updateCartItem } from "../store/slices/cartSlice";
import { Product } from "../pages";

const useCart = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);
	const addToCart = (cartItem: Product) => {
		if (!user) {
			navigate("/auth/login");
			return;
		}

		dispatch(addItemToCart(cartItem));
	};

	const removeFromCart = (id: string) => {
		dispatch(removeItemFromCart(id));
	};

	const updateCartItemQuantity = (id: string, quantity: number) => {
		dispatch(updateCartItem({ id, quantity }));
	};

	return {
		addToCart,
		removeFromCart,
		updateCartItemQuantity,
	};
};

export default useCart;
