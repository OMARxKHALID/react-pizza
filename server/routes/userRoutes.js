import express from "express";
import {setUser} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", setUser);

export default router;