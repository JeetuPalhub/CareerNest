import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getProfile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { validateRegister, validateLogin } from "../validations/user.validation.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

// Auth
router.post("/register", validateRegister, validateRequest, register);
router.post("/login", validateLogin, validateRequest, login);
router.post("/logout", isAuthenticated, logout);

// Profile routes
router.get("/me", isAuthenticated, getProfile);
router.patch("/me", isAuthenticated, updateProfile);

export default router;
