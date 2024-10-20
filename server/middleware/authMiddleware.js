import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
	let token;

	// Check if token is sent in the Authorization header
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}
	// Check if token is sent in cookies
	else if (req.cookies && req.cookies.token) {
		token = req.cookies.token;
	}

	// If token is found, verify it
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select("-password");
			next();
		} catch (err) {
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	} else {
		res.status(401).json({ message: "Not authorized, no token" });
	}
};

export const authenticateToken = (req, res, next) => {
	const token = req.cookies.accessToken; // Access token from cookies
	if (!token) return res.sendStatus(401);

	jwt.verify(token, "access-secret", (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user; // Attach user info to request
		next();
	});
};
