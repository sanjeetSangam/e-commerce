import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const AuthLayout = () => {
	const { user } = useSelector((state: RootState) => state.user);
	if (user) return <Navigate to="/" />;
	return <Outlet />;
};

export default AuthLayout;
