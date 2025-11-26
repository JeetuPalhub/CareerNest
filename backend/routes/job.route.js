import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

import {
  createJob,
  getJobById,
  getRecruiterJobs,
  getAllJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

// Recruiter/Admin: Create job
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  createJob
);

// Public: Get all jobs (with filters + pagination)
router.get("/", getAllJobs);

// Public: Get job details
router.get("/:id", getJobById);

// Recruiter/Admin: Get jobs posted by the logged-in recruiter
router.get(
  "/admin/jobs",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  getRecruiterJobs
);

export default router;
