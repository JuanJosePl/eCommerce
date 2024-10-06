import express from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
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

// Configuración de multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

const upload = multer({ storage });

// Rutas para productos
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