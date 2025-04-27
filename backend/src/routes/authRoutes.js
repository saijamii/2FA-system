import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register); // Registration Route

router.post("/login", login); // Login Route

router.post("/logout", logout); // Logout Route

router.get("/status", authStatus); // Auth Status Route

router.post("/2fa/setup", setup2FA); // 2FA setup

router.post("/2fa/verify", verify2FA); // verify 2FA

router.post("//2fa/reset", reset2FA); // reset 2FA

export default router;
