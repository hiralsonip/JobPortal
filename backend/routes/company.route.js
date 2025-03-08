import express from "express";
import { registerCompany, getComapny, getComapnyByID, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/update/:id").post(isAuthenticated, singleUpload, updateCompany);
router.route("/get/:id").get(isAuthenticated, getComapnyByID);
router.route("/get").get(isAuthenticated, getComapny);

export default router