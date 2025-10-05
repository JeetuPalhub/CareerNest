import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getJobById, postJob, getAdminJobs, getAllJobs } from "../controllers/job.controller.js";

const router = express.Router();

//Jobs
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs); // public route
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);

export default router;
