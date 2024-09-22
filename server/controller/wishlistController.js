import Usuario from "../model/userModel.js";
import Producto from "../model/productModel.js";

// Añadir producto a la wishlist
export const agregarAWishlist = async (req, res) => {
  try {
    const { productoId } = req.body;
    const usuario = await Usuario.findById(req.user._id);
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    if (!usuario.wishlist.includes(productoId)) {
      usuario.wishlist.push(productoId);
      await usuario.save();
    }

    res.status(200).json({ mensaje: "Producto añadido a la wishlist.", wishlist: usuario.wishlist });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener wishlist del usuario
export const obtenerWishlist = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user._id).populate('wishlist');
    res.json(usuario.wishlist);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Eliminar producto de la wishlist
export const eliminarDeWishlist = async (req, res) => {
  try {
    const { productoId } = req.params;
    const usuario = await Usuario.findById(req.user._id);

    usuario.wishlist = usuario.wishlist.filter(id => id.toString() !== productoId);
    await usuario.save();

    res.json({ mensaje: "Producto eliminado de la wishlist.", wishlist: usuario.wishlist });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};