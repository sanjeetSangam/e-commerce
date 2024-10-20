import React from "react";
import { categories } from "../utils/filters";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

interface FilterSidebarProps {
	isOpen: boolean;
	// toggleSidebar: () => void;
	clearFilters: () => void;
	selectedCategory: string;
	onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	priceRange: string;
	toggleSidebar: () => void;
	onPriceRangeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	isOpen,
	clearFilters,
	selectedCategory,
	onCategoryChange,
	priceRange,
	onPriceRangeChange,
	toggleSidebar,
}) => {
	return (
		<div
			className={`transition-transform transform ${
				isOpen ? "translate-x-0" : "-translate-x-[290px]"
			} fixed lg:sticky min-h-screen top-[56] left-0 h-full lg:h-auto min-w-[300px] max-w-[300px] bg-white border-r border-gray-200 p-4 z-10 lg:z-auto`}
		>
			<button
				className="lg:hidden bg-blue-500 text-white p-3 rounded-full -right-[35px] top-3 z-20 absolute "
				onClick={toggleSidebar}
			>
				{isOpen ? <FaArrowCircleLeft /> : <FaArrowCircleRight />}
			</button>

			<div className="mb-6 border-b-2 pb-4">
				<div className="flex justify-between items-center">
					<h3 className="text-xl font-semibold mb-4">Filters</h3>
					<button
						onClick={clearFilters}
						className="bg-slate-600 text-white py-2 px-4 rounded-lg text-sm"
					>
						Clear All
					</button>
				</div>
				<div className="flex flex-col gap-4">
					<div>
						<label htmlFor="category" className="block mb-2 text-gray-700">
							Category
						</label>
						<select
							id="category"
							value={selectedCategory}
							onChange={onCategoryChange}
							className="border rounded p-2 w-full"
						>
							<option value="">All Categories</option>
							{categories?.map((category) => (
								<option key={category.value} value={category.value}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="priceRange" className="block mb-2 text-gray-700">
							Price Range
						</label>
						<select
							id="priceRange"
							value={priceRange}
							onChange={onPriceRangeChange}
							className="border rounded p-2 w-full"
						>
							<option value="">All Prices</option>
							<option value="0-50">$0 - $50</option>
							<option value="50-100">$50 - $100</option>
							<option value="100-200">$100 - $200</option>
							<option value="200-500">$200 - $500</option>
							<option value="500-1000">$500 - $1000</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;
