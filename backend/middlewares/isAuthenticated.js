import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  // 1️⃣ Get token from cookies
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2️⃣ OR get token from Authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }

  if (!token) {
    throw new ApiError(401, "Authentication required. Please login.");
  }

  // 3️⃣ Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token. Please login again.");
  }

  if (!decoded?.userId) {
    throw new ApiError(401, "Invalid token payload");
  }

  // 4️⃣ Fetch user from DB
  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  // 5️⃣ Attach user details to req
  req.user = user;
  req.id = user._id;
  req.role = user.role;

  next();
});

export default isAuthenticated;
