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

// Student: Apply for a job
router.post(
  "/jobs/:jobId/apply",
  isAuthenticated,
  authorizeRoles("student"),
  applyJob
);

// Student: Get all jobs the student applied for
router.get(
  "/applications",
  isAuthenticated,
  authorizeRoles("student"),
  getAppliedJobs
);

// Recruiter/Admin: Get applicants for a job
router.get(
  "/jobs/:jobId/applicants",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  getApplicants
);

// Recruiter/Admin: Update application status
router.patch(
  "/applications/:id/status",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  updateStatus
);

export default router;
