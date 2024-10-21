import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";
import { logoutUser } from "../store/slices/userSlice";
import { AppDispatch, RootState } from "../store/store";

const Navbar = () => {
	const dispatch: AppDispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);
	const { cart } = useSelector((state: RootState) => state.cart);
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = async () => {
		try {
			await dispatch(logoutUser()).unwrap();
			dispatch(clearCart());
			navigate("/");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	const showBackButton = location.key !== "default";

	return (
		<nav className="bg-white shadow-md sticky top-0 z-50  mx-auto px-5 py-3 md:px-14 md:py-3 flex justify-between items-center">
			<div className="flex items-center gap-10">
				<div className="text-2xl font-bold text-blue-600">
					<Link to="/">HOME</Link>
				</div>
				{showBackButton && (
					<button
						onClick={handleBack}
						className="text-gray-800 hover:text-blue-600 flex items-center"
						title="Go Back"
					>
						← Back
					</button>
				)}
			</div>

			<div className="flex items-center gap-10 justify-end text-lg duration-150">
				<Link
					to="/cart"
					className="flex items-center relative text-gray-800 hover:text-blue-600"
					title="Cart"
				>
					<FaShoppingCart />{" "}
					<span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
						{cart?.length ?? 0}
					</span>
				</Link>

				{user ? (
					<button
						onClick={handleLogout}
						className="text-gray-800 hover:text-blue-600"
						title="Logout"
					>
						<MdLogout />
					</button>
				) : (
					<Link
						to="/auth/login"
						className="text-gray-800 hover:text-blue-600"
						title="Login"
					>
						Login
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
