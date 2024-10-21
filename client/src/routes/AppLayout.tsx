import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchUserCart } from "../store/slices/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
	const dispatch: AppDispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		if (user) dispatch(fetchUserCart());
	}, []);

	return (
		<div>
			<ToastContainer />
			<Navbar />
			<Outlet />
		</div>
	);
};

export default AppLayout;
