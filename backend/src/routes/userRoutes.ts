import express from "express";
import { getTest } from "../controller/userController";
const router = express.Router();
router.get("/test",getTest)
export default router