import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../pages";

export const fetchProducts = createAsyncThunk(
	"product/fetchProducts",
	async (params: { category?: string; priceRange?: string }, { rejectWithValue }) => {
		try {
			const response = await axios.get("/api/products", { params });
			return response.data;
		} catch (error) {
			return rejectWithValue(error || "Fetching products failed");
		}
	}
);

const initialState = {
	products: [] as Product[],
	loading: false,
	error: null as string | null,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default productSlice.reducer;
