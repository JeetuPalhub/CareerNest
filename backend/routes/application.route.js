import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// -------------------------------
// STUDENT ROUTES
// -------------------------------

// Apply for a job
router.post(
  "/jobs/:jobId/apply",
  isAuthenticated,
  authorizeRoles("student"),
  applyJob
);

// Get all jobs applied by the student
router.get(
  "/applications",
  isAuthenticated,
  authorizeRoles("student"),
  getAppliedJobs
);

// -------------------------------
// RECRUITER / ADMIN ROUTES
// -------------------------------

// Get applicants of a specific job
router.get(
  "/jobs/:jobId/applicants",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  getApplicants
);

// Update status of an application
router.patch(
  "/applications/:id/status",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  updateStatus
);

export default router;
