import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// -------------------------------------------
// CREATE JOB (recruiter / admin only)
// -------------------------------------------
export const createJob = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    experience,
    location,
    jobType,
    position,
    companyId,
  } = req.body;

  // Required fields check
  const requiredFields = {
    title,
    description,
    requirements,
    salary,
    experience,
    location,
    jobType,
    position,
    companyId,
  };

  for (const key in requiredFields) {
    if (!requiredFields[key] || requiredFields[key].trim() === "") {
      throw new ApiError(400, `${key} is required`);
    }
  }

  // Company must exist
  const company = await Company.findById(companyId);
  if (!company) throw new ApiError(404, "Company not found");

  // Only admin or company owner can post jobs
  const isOwner = company.userId.toString() === req.user._id.toString();
  if (req.user.role !== "admin" && !isOwner) {
    throw new ApiError(403, "You are not authorized to post jobs for this company");
  }

  // Creating job
  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(",").map((r) => r.trim()),
    salary: Number(salary),
    experienceLevel: Number(experience),
    location,
    jobType,
    position: Number(position),
    company: companyId,
    created_by: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Job created successfully", job));
});

// -------------------------------------------
// GET ALL JOBS (PUBLIC)
// With filters + pagination
// -------------------------------------------
export const getAllJobs = asyncHandler(async (req, res) => {
  const {
    keyword = "",
    location,
    jobType,
    experience,
    minSalary,
    maxSalary,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  };

  if (location) query.location = location;
  if (jobType) query.jobType = jobType;
  if (experience) query.experienceLevel = Number(experience);

  if (minSalary || maxSalary) {
    query.salary = {};
    if (minSalary) query.salary.$gte = Number(minSalary);
    if (maxSalary) query.salary.$lte = Number(maxSalary);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const jobs = await Job.find(query)
    .populate("company")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Job.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(200, "Jobs fetched successfully", {
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    })
  );
});

// -------------------------------------------
// GET JOB BY ID (PUBLIC)
// -------------------------------------------
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("company");

  if (!job) throw new ApiError(404, "Job not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "Job fetched successfully", job));
});

// -------------------------------------------
// GET JOBS POSTED BY LOGGED-IN RECRUITER
// -------------------------------------------
export const getRecruiterJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ created_by: req.user._id })
    .populate("company")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, "Recruiter jobs fetched successfully", jobs));
});
