import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.js";
import { uploadCV } from "../middlewares/uploadCV.middleware.js";

const router = express.Router();

router.post("/apply", protect,uploadCV.single("cv"), applyForJob);
router.get("/my-applications", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsForJob);
router.put("/:id", protect,uploadCV.single("cv"), updateApplication);
router.delete("/:id", protect, deleteApplication);

export default router;
