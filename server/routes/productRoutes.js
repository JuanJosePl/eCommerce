import express from "express";
import multer from 'multer';
import path from 'path';
import {
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  obtenerTodosLosProductos,
  buscarProductos,
  obtenerProductosPorCategoria,
  actualizarStock,
  obtenerCategorias,
  agregarResenaProducto,
  obtenerProductosDestacados,
  obtenerProductosEnOferta
} from "../controller/productController.js";
import { protectRoute, adminRoute } from '../middleware/authMiddleware.js';

const productoRoutes = express.Router();

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Añade la extensión original del archivo
  }
});

const upload = multer({ storage: storage });

productoRoutes.post("/producto", protectRoute, adminRoute, upload.single('imagen'), crearProducto);
productoRoutes.put("/actualizar/producto/:id", protectRoute, adminRoute, upload.single('imagen'), actualizarProducto);
productoRoutes.get("/productos", obtenerTodosLosProductos);
productoRoutes.get("/producto/:id", obtenerProductoPorId);
productoRoutes.delete("/eliminar/producto/:id", protectRoute, adminRoute, eliminarProducto);
productoRoutes.get("/buscar", buscarProductos);
productoRoutes.get("/categoria/:categoria", obtenerProductosPorCategoria);
productoRoutes.put("/stock/:id", protectRoute, adminRoute, actualizarStock);
productoRoutes.get("/categorias", obtenerCategorias);
productoRoutes.post("/resena/:id", protectRoute, agregarResenaProducto);
productoRoutes.get("/destacados", obtenerProductosDestacados);
productoRoutes.get("/oferta", obtenerProductosEnOferta);

export default productoRoutes;
