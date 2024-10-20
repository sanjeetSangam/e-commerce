// NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<img
				src="/images/404.svg" // Use your own image or a placeholder URL
				alt="Page not found"
				className="w-80 mb-8"
			/>
			<h1 className="text-4xl font-bold text-gray-700 mb-4">404 - Page Not Found</h1>
			<p className="text-lg text-gray-500 mb-8">
				Sorry, the page you're looking for doesn't exist.
			</p>
			<Link
				to="/"
				className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
			>
				Go Back Home
			</Link>
		</div>
	);
};

export default NotFound;
