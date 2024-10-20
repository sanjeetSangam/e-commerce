import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/userSlice";
import { AppDispatch, RootState } from "../store/store";
import { toast } from "react-toastify";

interface RegisterFormInputs {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const { loading } = useSelector((state: RootState) => state.user);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormInputs>({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormInputs) => {
		try {
			const response = await dispatch(registerUser(data)).unwrap();
			toast.success(`Welcome ${response.name}!`);
			navigate("/");
		} catch (error) {
			toast.error(error as string);
			console.error("Registration failed:", error);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100  p-6 md:p-0">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
					Create your account
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Form Fields */}
					<div className="flex flex-col">
						<label htmlFor="name" className="text-sm font-semibold text-gray-600">
							Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="Enter your name"
							{...register("name")}
							className={`mt-1 px-4 py-2 rounded-lg border ${
								errors.name ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-2 focus:ring-blue-400`}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="email" className="text-sm font-semibold text-gray-600">
							Email
						</label>
						<input
							type="email"
							id="email"
							placeholder="Enter your email"
							{...register("email")}
							className={`mt-1 px-4 py-2 rounded-lg border ${
								errors.email ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-2 focus:ring-blue-400`}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label htmlFor="password" className="text-sm font-semibold text-gray-600">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Enter your password"
							{...register("password")}
							className={`mt-1 px-4 py-2 rounded-lg border ${
								errors.password ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-2 focus:ring-blue-400`}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
						)}
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="confirmPassword"
							className="text-sm font-semibold text-gray-600"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							placeholder="Confirm your password"
							{...register("confirmPassword")}
							className={`mt-1 px-4 py-2 rounded-lg border ${
								errors.confirmPassword ? "border-red-500" : "border-gray-300"
							} focus:outline-none focus:ring-2 focus:ring-blue-400`}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<button
						disabled={loading}
						type="submit"
						className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
					>
						Register
					</button>
				</form>

				{loading ? null : (
					<p className="text-sm text-center text-gray-600 mt-4">
						Already have an account?{" "}
						<Link to="/auth/login" className="text-blue-500 hover:underline">
							Login
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default Register;
