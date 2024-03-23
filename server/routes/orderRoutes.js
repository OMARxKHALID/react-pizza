import express from "express";
import { createOrder, getOrder, updateOrder } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/:_id", getOrder);
router.patch("/:_id", updateOrder);


export default router;