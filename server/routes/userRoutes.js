import express from "express";
import multer from 'multer';
import path from 'path';
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

// Configuración de multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 }, // Limita el tamaño del archivo a 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// Función para verificar el tipo de archivo
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Solo se permiten imágenes!');
  }
}

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
