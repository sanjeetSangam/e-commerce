import express from "express";
import dotenv from "dotenv";
import connectDB from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		// origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());

app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
