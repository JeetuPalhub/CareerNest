import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

// ---------------------------
// Register
// ---------------------------
export const register = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  if (!fullname || !email || !phoneNumber || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(400, "User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Account created successfully"));
});

// ---------------------------
// Login
// ---------------------------
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(400, "Incorrect email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(400, "Incorrect email or password");
  }

  const token = generateToken(user._id);

  user = user.toObject();
  delete user.password;

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(200, `Welcome back ${user.fullname}`, {
        user,
        token,
      })
    );
});

// ---------------------------
// Logout
// ---------------------------
export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

// ---------------------------
// Get Profile
// ---------------------------
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return res.status(200).json(new ApiResponse(200, "User fetched", user));
});

// ---------------------------
// Update Profile
// ---------------------------
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullname, phoneNumber, bio, skills } = req.body;
  const file = req.file;

  const user = await User.findById(req.id);
  if (!user) throw new ApiError(404, "User not found");

  if (fullname) user.fullname = fullname;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;

  if (skills) {
    user.profile.skills = skills.split(",").map((s) => s.trim());
  }

  // TODO: resume upload logic coming later

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", user));
});
