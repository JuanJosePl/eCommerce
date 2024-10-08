import Usuario from "../model/userModel.js";
import bcrypt from "bcryptjs";
import Order from "../model/orderModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Crear un nuevo usuario
export const crear = async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      role: role || "user" // Por defecto, el rol será "user" si no se especifica
    });

    const datosGuardados = await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado exitosamente.", id: datosGuardados._id });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    const query = search
      ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
      : {};

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .select('-password');

    res.json({
      users,
      currentPage: page,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, email, role, password } = req.body;

    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    // Actualizar campos
    usuarioExistente.nombre = nombre || usuarioExistente.nombre;
    usuarioExistente.email = email || usuarioExistente.email;
    usuarioExistente.role = role || usuarioExistente.role;

    // Si se proporciona una nueva contraseña, hashearla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuarioExistente.password = await bcrypt.hash(password, salt);
    }

    const datosActualizados = await usuarioExistente.save();
    res.status(200).json({ mensaje: "Usuario actualizado exitosamente.", usuario: datosActualizados });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const usuarioExistente = await Usuario.findById(id).select('-password');
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }
    res.status(200).json(usuarioExistente);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Cambiar rol de usuario
export const cambiarRolUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ mensaje: "Rol no válido." });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    res.status(200).json({ mensaje: "Rol de usuario actualizado exitosamente.", usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Añadir dirección de envío
export const agregarDireccionEnvio = async (req, res) => {
  try {
    const { calle, ciudad, codigoPostal, pais } = req.body;
    const usuario = await Usuario.findById(req.user._id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    usuario.direccionesEnvio.push({ calle, ciudad, codigoPostal, pais });
    await usuario.save();

    res.status(201).json({ mensaje: "Dirección de envío añadida exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener historial de compras del usuario
export const obtenerHistorialCompras = async (req, res) => {
  try {
    const pedidos = await Order.find({ user: req.user._id })
                                .sort('-createdAt')
                                .populate('orderItems.product', 'nombre precio');
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el perfil del usuario" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    const user = await Usuario.findById(req.user._id);

    if (user) {
      user.nombre = nombre || user.nombre;
      user.email = email || user.email;
      user.telefono = telefono || user.telefono;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        nombre: updatedUser.nombre,
        email: updatedUser.email,
        telefono: updatedUser.telefono,
        role: updatedUser.role,
        avatar: updatedUser.avatar
      });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el perfil del usuario" });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: "No se ha subido ningún archivo" });
    }

    const user = await Usuario.findById(req.user._id);
    if (user) {
      if (user.avatar) {
        const publicId = user.avatar.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      
      user.avatar = req.file.path;
      await user.save();
      res.json({ mensaje: "Avatar actualizado con éxito", avatarUrl: user.avatar });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el avatar:", error);
    res.status(500).json({ mensaje: "Error al actualizar el avatar" });
  }
};

// Obtener avatar del usuario
export const obtenerAvatar = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (user.avatar) {
      res.json({ avatarUrl: user.avatar });
    } else {
      res.status(404).json({ mensaje: "El usuario no tiene un avatar" });
    }
  } catch (error) {
    console.error("Error al obtener el avatar:", error);
    res.status(500).json({ mensaje: "Error al obtener el avatar" });
  }
};


