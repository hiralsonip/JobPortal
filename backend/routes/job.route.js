import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getAllJobs, getJobById, getJobByUserId, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
// router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getJobByUserId);
// router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/get/:id").get(getJobById);

export default router;