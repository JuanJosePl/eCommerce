import Usuario from "../model/userModel.js";
import Producto from "../model/productModel.js";

// Añadir producto al carrito
export const agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    let usuario = await Usuario.findById(req.user._id);
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ mensaje: "Stock insuficiente." });
    }

    if (!usuario.carrito) {
      usuario.carrito = [];
    }

    const itemIndex = usuario.carrito.findIndex(
      (item) => item.producto.toString() === productoId
    );

    if (itemIndex > -1) {
      usuario.carrito[itemIndex].cantidad += cantidad;
    } else {
      usuario.carrito.push({ producto: productoId, cantidad });
    }

    await usuario.save();

    await usuario.populate("carrito.producto");

    res.status(200).json({
      mensaje: "Producto añadido al carrito.",
      carrito: usuario.carrito,
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener carrito del usuario
export const obtenerCarrito = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user._id).populate(
      "carrito.producto"
    );
    res.json(usuario.carrito);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar producto del carrito
export const eliminarDelCarrito = async (req, res) => {
  try {
    const { productoId } = req.params;
    const usuario = await Usuario.findById(req.user._id);

    usuario.carrito = usuario.carrito.filter(
      (item) => item.producto.toString() !== productoId
    );
    await usuario.save();

    await usuario.populate("carrito.producto");

    res.json({
      mensaje: "Producto eliminado del carrito.",
      carrito: usuario.carrito,
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Actualizar cantidad de un producto en el carrito
export const actualizarCantidadCarrito = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    const usuario = await Usuario.findById(req.user._id);

    const itemIndex = usuario.carrito.findIndex(
      (item) => item.producto.toString() === productoId
    );

    if (itemIndex > -1) {
      const producto = await Producto.findById(productoId);
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado." });
      }

      if (producto.stock < cantidad) {
        return res.status(400).json({ mensaje: "Stock insuficiente." });
      }

      usuario.carrito[itemIndex].cantidad = cantidad;
    } else {
      return res
        .status(404)
        .json({ mensaje: "Producto no encontrado en el carrito." });
    }

    await usuario.save();

    await usuario.populate("carrito.producto");

    res.json({
      mensaje: "Cantidad actualizada en el carrito.",
      carrito: usuario.carrito,
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Limpiar todo el carrito
export const limpiarCarrito = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user._id);
    usuario.carrito = [];
    await usuario.save();

    res.json({
      mensaje: "Carrito limpiado exitosamente.",
      carrito: usuario.carrito,
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};
