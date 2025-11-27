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

// -------------------------------------------
// Recruiter/Admin → Create a job
// -------------------------------------------
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  createJob
);

// -------------------------------------------
// Recruiter/Admin → Get all jobs posted by them
// MUST BE ABOVE ":id" ROUTE
// -------------------------------------------
router.get(
  "/admin/jobs",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  getRecruiterJobs
);

// -------------------------------------------
// Public → Get all jobs (with filters + pagination)
// -------------------------------------------
router.get("/", getAllJobs);

// -------------------------------------------
// Public → Get job by ID
// MUST BE LAST OR IT OVERRIDES OTHER ROUTES
// -------------------------------------------
router.get("/:id", getJobById);

export default router;
