import express from "express";
import {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  actualizarCantidadCarrito,
  limpiarCarrito,
} from "../controller/cartController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const carritoRoutes = express.Router();

carritoRoutes.post("/agregar-carrito", protectRoute, agregarAlCarrito);
carritoRoutes.get("/obtener-carrito", protectRoute, obtenerCarrito);
carritoRoutes.delete(
  "/eliminar-carrito/:productoId",
  protectRoute,
  eliminarDelCarrito
);
carritoRoutes.put(
  "/actualizar-cantidad",
  protectRoute,
  actualizarCantidadCarrito
);
carritoRoutes.delete("/limpiar-carrito", protectRoute, limpiarCarrito);

export default carritoRoutes;
