import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import {
  createCompany,
  updateCompany,
  getCompanies,
  getCompanyById,
} from "../controllers/company.controller.js";

const router = express.Router();

// Create a company (only recruiters / admin)
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  createCompany
);

// Get all companies (admin + recruiter)
router.get(
  "/",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  getCompanies
);

// Get company by ID (allowed for all authenticated users)
router.get("/:id", isAuthenticated, getCompanyById);

// Update company (only owner recruiter or admin)
router.patch(
  "/:id",
  isAuthenticated,
  authorizeRoles("recruiter", "admin"),
  updateCompany
);

export default router;
