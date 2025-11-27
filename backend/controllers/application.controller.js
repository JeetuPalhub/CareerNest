import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


// -------------------------------------------
// APPLY FOR A JOB (Students ONLY)
// -------------------------------------------
export const applyJob = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { jobId } = req.params;

  if (!jobId) throw new ApiError(400, "Job ID is required");

  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found");

  // Prevent applying to your own job
  if (job.created_by.toString() === userId.toString()) {
    throw new ApiError(400, "You cannot apply to your own job");
  }

  // Students only
  if (req.user.role !== "student") {
    throw new ApiError(403, "Only students can apply to jobs");
  }

  // Check existing application
  const existing = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (existing) {
    throw new ApiError(400, "You have already applied to this job");
  }

  // Create new application
  const application = await Application.create({
    job: jobId,
    applicant: userId,
  });

  // Link application to job
  job.applications.push(application._id);
  await job.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Application submitted successfully", application));
});


// -------------------------------------------
// GET JOBS APPLIED BY CURRENT STUDENT
// -------------------------------------------
export const getAppliedJobs = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const applications = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      populate: { path: "company" },
    });

  return res
    .status(200)
    .json(new ApiResponse(200, "Applied jobs fetched successfully", applications));
});


// -------------------------------------------
// GET APPLICANTS FOR A JOB (Recruiter/Admin)
// -------------------------------------------
export const getApplicants = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found");

  // Only admin or the recruiter who posted the job
  if (
    req.user.role !== "admin" &&
    job.created_by.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You are not authorized to view applicants");
  }

  const applicants = await Application.find({ job: jobId })
    .sort({ createdAt: -1 })
    .populate("applicant", "fullname email phoneNumber profile")
    .populate("job", "title company");

  return res
    .status(200)
    .json(new ApiResponse(200, "Applicants fetched successfully", applicants));
});


// -------------------------------------------
// UPDATE APPLICATION STATUS (Recruiter/Admin)
// -------------------------------------------
export const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) throw new ApiError(400, "Status is required");

  const validStatuses = ["pending", "accepted", "rejected"];
  const normalized = status.toLowerCase();

  if (!validStatuses.includes(normalized)) {
    throw new ApiError(
      400,
      "Invalid status. Allowed: pending, accepted, rejected"
    );
  }

  const application = await Application.findById(id).populate("job");
  if (!application) throw new ApiError(404, "Application not found");

  // Only owner recruiter or admin
  if (
    req.user.role !== "admin" &&
    application.job.created_by.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You are not allowed to update this status");
  }

  application.status = normalized;
  await application.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Application status updated", application));
});
