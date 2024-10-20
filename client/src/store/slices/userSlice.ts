import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosApi";

interface UserState {
	user: { name: string; email: string } | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
};

// Async thunks for login, register, and logout
export const loginUser = createAsyncThunk(
	"user/login",
	async (credentials: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/api/auth/login", credentials);
			return response.data; // Assuming response contains user info
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error?.response?.data?.message || "Login failed");
			} else {
				return rejectWithValue("Login failed");
			}
		}
	}
);

export const registerUser = createAsyncThunk(
	"user/register",
	async (newUser: { name: string; email: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post("/api/auth/register", newUser);
			return response.data; // Assuming response contains user info
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error?.response?.data?.message || "Registration failed");
			} else {
				return rejectWithValue("Registration failed");
			}
		}
	}
);

export const logoutUser = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
	try {
		await axiosInstance.post("/api/auth/logout");
		return null;
	} catch (error) {
		return rejectWithValue(error || "Logout failed");
	}
});

// User slice
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Register
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				console.log(action.payload);
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			// Logout
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default userSlice.reducer;
