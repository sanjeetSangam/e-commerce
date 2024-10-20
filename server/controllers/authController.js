import User from "../models/User.js";
import jwt from "jsonwebtoken";

const security = { httpOnly: true, secure: true };

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(400).json({ message: "User already exists" });
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		const token = generateToken(user._id);
		res.cookie("token", token, security).status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token,
		});
	} else {
		res.status(400).json({ message: "Invalid user data" });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id);
		res.cookie("token", token, security).status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token,
		});
	} else {
		res.status(401).json({ message: "Invalid email or password" });
	}
};

export const logoutUser = async (req, res) => {
	res.clearCookie("token", security).json({ message: "Logged out successfully" });
};
