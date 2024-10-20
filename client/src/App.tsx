import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Cart, Login, NotFound, Product, ProductList, Register } from "./pages";
import AppLayout from "./routes/AppLayout.tsx";
import AuthLayout from "./routes/AuthLayout.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <NotFound />,
		children: [
			{
				path: "",
				element: <ProductList />,
			},
			{
				path: "products/:id",
				element: <Product />,
			},
			{
				path: "cart",
				element: <Cart />,
			},
			{
				path: "auth",
				element: <AuthLayout />,
				children: [
					{
						path: "login",
						element: <Login />,
					},
					{
						path: "register",
						element: <Register />,
					},
				],
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
