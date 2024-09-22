import express from "express";
import {
  register,
  verifyEmail,
  resendOTP,
  login,
  refreshToken,
  logout,
  checkAuthStatus,
  changePassword,
  requestResetPassword,
  resetPassword,
} from "../controller/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protected-route", protectRoute);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", protectRoute, logout);
router.get("/status", protectRoute, checkAuthStatus);
router.put("/change-password", protectRoute, changePassword);
router.post("/forgot-password", requestResetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;