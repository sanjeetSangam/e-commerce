import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import { AppDispatch } from "../store/store";

interface LoginFormInputs {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormInputs) => {
		try {
			const payload = {
				email: data.email,
				password: data.password,
			};
			await dispatch(loginUser(payload)).unwrap();
			navigate("/");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100 p-6 md:p-0">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
					Login to your account
				</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Email Field */}
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

					{/* Password Field */}
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

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
					>
						Login
					</button>
				</form>

				<p className="text-sm text-center text-gray-600 mt-4">
					Don't have an account?{" "}
					<Link to="/auth/register" className="text-blue-500 hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
