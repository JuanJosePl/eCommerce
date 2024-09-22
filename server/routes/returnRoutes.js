import express from "express";
import {
  solicitarDevolucion,
  actualizarEstadoDevolucion,
} from "../controller/devolucionController.js";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

const devolucionRoutes = express.Router();

devolucionRoutes.post("/devolucion", protectRoute, solicitarDevolucion);
devolucionRoutes.put(
  "/devolucion/:id",
  protectRoute,
  adminRoute,
  actualizarEstadoDevolucion
);

export default devolucionRoutes;
