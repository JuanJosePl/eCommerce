import express from "express";
import { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito } from "../controller/cartController.js";
import { protectRoute } from '../middleware/authMiddleware.js';

const carritoRoutes = express.Router();

carritoRoutes.post("/agregar-carrito", protectRoute, agregarAlCarrito);
carritoRoutes.get("/obtener-carrito", protectRoute, obtenerCarrito);
carritoRoutes.delete("/eliminar-carrito/:productoId", protectRoute, eliminarDelCarrito);

export default carritoRoutes;
