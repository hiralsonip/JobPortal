import express from "express";
import { registerCompany, getComapny, getComapnyByID, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/update/:id").post(isAuthenticated, updateCompany);
router.route("/get/:id").get(isAuthenticated, getComapnyByID);
router.route("/get").get(isAuthenticated, getComapny);

export default router