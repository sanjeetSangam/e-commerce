import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/slices/productSlice";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import NoDataFoundCommon from "../components/NoDataFoundCommon";
import Loader from "../components/Loader";

export interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl: string;
	stock: number;
}

const ProductList = ({ showSidebar = true }: { showSidebar?: boolean }) => {
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const dispatch: AppDispatch = useDispatch();
	const { products, loading } = useSelector((state: RootState) => state.product);

	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [priceRange, setPriceRange] = useState<string>("");
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [sort, setSort] = useState("asc");
	const [searchParams, setSearchParams] = useSearchParams();

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value);
		setQueryParams({ category: event.target.value });
	};

	const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setPriceRange(event.target.value);
		setQueryParams({ priceRange: event.target.value });
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setQueryParams({ sort: event.target.value });
		setSort(event.target.value);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const clearFilters = () => {
		setSelectedCategory("");
		setPriceRange("");
		setQueryParams({ category: "", priceRange: "", sort: "" });
	};

	const setQueryParams = (newParams: { [key: string]: string }) => {
		const entries = Object.fromEntries(searchParams.entries());

		for (const [key, value] of Object.entries(newParams)) {
			if (value === "") {
				delete entries[key];
			} else {
				entries[key] = value;
			}
		}

		setSearchParams(entries);
	};

	useEffect(() => {
		setSelectedCategory(searchParams.get("category") || "");
		setPriceRange(searchParams.get("priceRange") || "");
		setSort(searchParams.get("sort") || "asc");
	}, [searchParams]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsSidebarOpen(true);
			} else {
				setIsSidebarOpen(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const params = {
			category: searchParams.get("category") as string,
			priceRange: searchParams.get("priceRange") as string,
			sort: searchParams.get("sort") as string,
		};
		dispatch(fetchProducts(params));
	}, [searchParams, dispatch]);

	return (
		<div className="flex relative">
			<div className="relative">
				{showSidebar && (
					<FilterSidebar
						isOpen={isSidebarOpen}
						clearFilters={clearFilters}
						selectedCategory={selectedCategory}
						onCategoryChange={handleCategoryChange}
						priceRange={priceRange}
						toggleSidebar={toggleSidebar}
						onPriceRangeChange={handlePriceRangeChange}
						onSortChange={handleSortChange}
						sort={sort}
					/>
				)}
			</div>

			<div className="flex-grow p-4">
				{loading ? (
					<Loader />
				) : products.length === 0 ? (
					<NoDataFoundCommon />
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{products.map((product) => (
							<ProductCard
								key={product._id}
								product={product}
								addToCart={addToCart}
								navigate={navigate}
							/>
						))}
					</div>
				)}
			</div>

			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 lg:hidden"
					onClick={toggleSidebar}
				></div>
			)}
		</div>
	);
};

export default ProductList;
