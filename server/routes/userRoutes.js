import express from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import {
  crear,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  obtenerTodosLosUsuarios,
  cambiarRolUsuario,
  agregarDireccionEnvio,
  obtenerHistorialCompras,
  getUserProfile,
  updateUserProfile,
  updateAvatar
} from "../controller/userController.js";
import { protectRoute, adminRoute } from '../middleware/authMiddleware.js';

const usuarioRoutes = express.Router();


// Configuración de multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars', // Carpeta para avatares en Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
  },
});

const upload = multer({ storage });

// Rutas para usuarios
usuarioRoutes.post("/usuario", protectRoute, adminRoute, crear);
usuarioRoutes.get("/usuarios", protectRoute, adminRoute, obtenerTodosLosUsuarios);
usuarioRoutes.get("/usuario/:id", protectRoute, obtenerUsuarioPorId);
usuarioRoutes.put("/actualizar/usuario/:id", protectRoute, actualizarUsuario);
usuarioRoutes.delete("/eliminar/usuario/:id", protectRoute, adminRoute, eliminarUsuario);
usuarioRoutes.patch("/cambiar-rol/:id", protectRoute, adminRoute, cambiarRolUsuario);
usuarioRoutes.post("/agregar-direccion", protectRoute, agregarDireccionEnvio);
usuarioRoutes.get("/historial-compras", protectRoute, obtenerHistorialCompras);
usuarioRoutes.get('/profile', protectRoute, getUserProfile);
usuarioRoutes.put('/update/profile', protectRoute, updateUserProfile);
usuarioRoutes.post('/avatar', protectRoute, upload.single('avatar'), updateAvatar);

export default usuarioRoutes;
