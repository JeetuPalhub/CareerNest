import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = null;

    // Check cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Check Authorization header -> "Bearer token"
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
      throw new ApiError(401, "User not authenticated");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded?.userId) {
      throw new ApiError(401, "Invalid token");
    }

    // Check if user still exists
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    // Attach user data to request
    req.user = user;
    req.id = user._id;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default isAuthenticated;
