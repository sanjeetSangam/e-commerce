import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../pages";
import axiosInstance from "../../utils/axiosApi";

export const fetchUserCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get("/api/cart", { withCredentials: true });
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return rejectWithValue(error?.response?.data?.message || "Fetching cart failed");
		} else {
			return rejectWithValue("Fetching cart failed");
		}
	}
});

export const addItemToCart = createAsyncThunk(
	"cart/addItemToCart",
	async (data: Product, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/api/cart", data, { withCredentials: true });
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error?.response?.data?.message || "Adding item to cart failed"
				);
			} else {
				return rejectWithValue("Adding item to cart failed");
			}
		}
	}
);

export const removeItemFromCart = createAsyncThunk(
	"cart/removeItemFromCart",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(`/api/cart/${id}`, {
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error?.response?.data?.message || "Removing item from cart failed"
				);
			} else {
				return rejectWithValue("Removing item from cart failed");
			}
		}
	}
);

export const updateCartItem = createAsyncThunk(
	"cart/updateCartItem",
	async (data: { id: string; quantity: number }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(`/api/cart/${data.id}`, data);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(
					error?.response?.data?.message || "Updating cart item failed"
				);
			} else {
				return rejectWithValue("Updating cart item failed");
			}
		}
	}
);

export interface Cart {
	product: Product;
	quantity: number;
	_id: string;
}

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [] as Cart[],
		loading: false,
		error: null as string | null,
		cartTotalBill: 0,
		totalItems: 0,
	},
	reducers: {
		clearCart: (state) => {
			state.cart = [];
		},
		calculateCartPrice: (state) => {
			let total = 0;
			state.cart.forEach((item) => {
				total += item.product.price * item.quantity;
			});
			state.cartTotalBill = total;
		},
		calculateTotalItems: (state) => {
			let total = 0;
			state.cart.forEach((item) => {
				total += item.quantity;
			});
			state.totalItems = total;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserCart.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUserCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload.items;
				cartSlice.caseReducers.calculateCartPrice(state);
				cartSlice.caseReducers.calculateTotalItems(state);
			})
			.addCase(fetchUserCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(addItemToCart.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addItemToCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload.items;
				cartSlice.caseReducers.calculateCartPrice(state);
				cartSlice.caseReducers.calculateTotalItems(state);
			})
			.addCase(addItemToCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(removeItemFromCart.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeItemFromCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload.items;
				cartSlice.caseReducers.calculateCartPrice(state);
				cartSlice.caseReducers.calculateTotalItems(state);
			})
			.addCase(removeItemFromCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(updateCartItem.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCartItem.fulfilled, (state, action) => {
				state.loading = false;
				state.cart = action.payload.items;
				cartSlice.caseReducers.calculateCartPrice(state);
				cartSlice.caseReducers.calculateTotalItems(state);
			})
			.addCase(updateCartItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default cartSlice.reducer;

export const { clearCart, calculateCartPrice } = cartSlice.actions;
