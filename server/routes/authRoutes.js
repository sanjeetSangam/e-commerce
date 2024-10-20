import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
// import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

// router.route("/getUser").get(authenticateToken, getUser);

export default router;
