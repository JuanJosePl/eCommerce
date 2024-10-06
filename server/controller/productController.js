import Producto from "../model/productModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    const imagen = req.file ? req.file.path : null;

    if (!imagen) {
      return res.status(400).json({ mensaje: "Se requiere una imagen para el producto." });
    }

    const productoExistente = await Producto.findOne({ nombre });
    if (productoExistente) {
      return res.status(400).json({ mensaje: "El producto ya existe." });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      stock: parseInt(stock),
      imagen
    });

    const datosGuardados = await nuevoProducto.save();
    res.status(201).json({ mensaje: "Producto creado exitosamente.", datosGuardados });
  } catch (error) {
    console.error("Error en la creación del producto:", error);
    res.status(500).json({ mensajeError: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    const imagen = req.file ? req.file.path : undefined;

    const productoExistente = await Producto.findById(id);
    if (!productoExistente) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    const datosActualizados = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      stock: parseInt(stock),
      ...(imagen && { imagen })
    };

    if (imagen && productoExistente.imagen) {
      const publicId = productoExistente.imagen.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, datosActualizados, { new: true });
    res.status(200).json({ mensaje: "Producto actualizado exitosamente.", productoActualizado });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const productoExistente = await Producto.findById(id);
    if (!productoExistente) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    res.status(200).json(productoExistente);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    if (producto.imagen) {
      const publicId = producto.imagen.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Producto.findByIdAndDelete(id);
    res.status(200).json({ mensaje: "Producto eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};


// Buscar productos
export const buscarProductos = async (req, res) => {
  try {
    const { query } = req.query;
    const productos = await Producto.find({
      $or: [
        { nombre: { $regex: query, $options: "i" } },
        { descripcion: { $regex: query, $options: "i" } },
      ],
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener productos por categoría
export const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const productos = await Producto.find({ categoria });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Actualizar stock de un producto
export const actualizarStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    producto.stock += cantidad;
    await producto.save();

    res.json({
      mensaje: "Stock actualizado exitosamente.",
      nuevoStock: producto.stock,
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener todos los productos con paginación
export const obtenerTodosLosProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Producto.countDocuments();
    const productos = await Producto.find().skip(startIndex).limit(limit);

    res.json({
      productos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Producto.distinct('categoria');
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Añadir reseñas a productos
export const agregarResenaProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comentario } = req.body;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    const resena = {
      usuario: req.user._id,
      rating: Number(rating),
      comentario,
    };

    producto.resenas.push(resena);
    producto.numResenas = producto.resenas.length;
    producto.rating =
      producto.resenas.reduce((acc, item) => item.rating + acc, 0) /
      producto.resenas.length;

    await producto.save();
    res.status(201).json({ mensaje: "Reseña añadida exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener productos destacados
export const obtenerProductosDestacados = async (req, res) => {
  try {
    const productosDestacados = await Producto.find({ destacado: true }).limit(5);
    res.json(productosDestacados);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener productos en oferta
export const obtenerProductosEnOferta = async (req, res) => {
  try {
    const productosEnOferta = await Producto.find({ enOferta: true }).limit(10);
    res.json(productosEnOferta);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};
