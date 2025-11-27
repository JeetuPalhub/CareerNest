import { Company } from "../models/company.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// ------------------------------------
// CREATE COMPANY (recruiter, admin)
// ------------------------------------
export const createCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "Company name and description are required");
  }

  // Recruiter can create only 1 company
  const existingCompany = await Company.findOne({ userId: req.user._id });
  if (existingCompany) {
    throw new ApiError(400, "You already have a registered company");
  }

  const company = await Company.create({
    name,
    description,
    website: website || "",
    location: location || "",
    logo: req.file ? req.file.path : "",
    userId: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Company created successfully", company));
});

// ------------------------------------
// GET ALL COMPANIES (admin, recruiter)
// ------------------------------------
export const getCompanies = asyncHandler(async (req, res) => {
  const companies =
    req.user.role === "admin"
      ? await Company.find() // admin sees all companies
      : await Company.find({ userId: req.user._id }); // recruiter sees only own companies

  return res
    .status(200)
    .json(new ApiResponse(200, "Companies fetched successfully", companies));
});

// ------------------------------------
// GET SINGLE COMPANY (any authenticated user)
// ------------------------------------
export const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Company fetched successfully", company));
});

// ------------------------------------
// UPDATE COMPANY (owner recruiter OR admin)
// ------------------------------------
export const updateCompany = asyncHandler(async (req, res) => {
  const { name, description, website, location } = req.body;

  const company = await Company.findById(req.params.id);
  if (!company) throw new ApiError(404, "Company not found");

  // Authorization: only admin OR company owner
  if (
    req.user.role !== "admin" &&
    company.userId.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You are not authorized to update this company");
  }

  // Update fields
  if (name) company.name = name;
  if (description) company.description = description;
  if (website) company.website = website;
  if (location) company.location = location;

  // Update logo if uploaded
  if (req.file) company.logo = req.file.path;

  await company.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Company updated successfully", company));
});
