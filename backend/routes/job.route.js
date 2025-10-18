import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob
} from "../controllers/job.controller.js";

const router = express.Router();


router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

export default router;
