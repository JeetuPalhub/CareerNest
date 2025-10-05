import express from "express";
import { login, logout, register, updateProfile, getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout); 
router.route("/profile/update").post(isAuthenticated, updateProfile);
router.route("/profile").get(isAuthenticated, getProfile);

export default router;
