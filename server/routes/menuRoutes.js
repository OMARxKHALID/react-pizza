import express  from "express";
import { getMenu } from "../controllers/menuControllers.js";

const router = express.Router();

router.get("/", getMenu)

export default router;