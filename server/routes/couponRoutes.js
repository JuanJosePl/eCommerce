import express from "express";
import { aplicarCupon } from "../controller/cuponesController.js";
import { protectRoute } from '../middleware/authMiddleware.js';

const cuponRoutes = express.Router();

cuponRoutes.post("/cupon", protectRoute, aplicarCupon);

export default cuponRoutes;
