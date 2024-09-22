import express from "express";
import { obtenerNotificaciones, marcarNotificacionComoLeida } from "../controller/notificacionController.js";
import { protectRoute } from '../middleware/authMiddleware.js';

const notificacionRoutes = express.Router();

notificacionRoutes.get("/notificaciones", protectRoute, obtenerNotificaciones);
notificacionRoutes.put("/notificacion/:id", protectRoute, marcarNotificacionComoLeida);

export default notificacionRoutes;
