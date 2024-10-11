import Producto from "../model/productModel.js";
import { v2 as cloudinary } from 'cloudinary';


// Crear un nuevo producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    const imagenes = req.files ? req.files.map(file => file.path) : [];

    if (imagenes.length === 0) {
      return res.status(400).json({ mensaje: "Se requiere al menos una imagen para el producto." });
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
      imagen: imagenes[0],
      imagenes
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
    const nuevasImagenes = req.files ? req.files.map(file => file.path) : [];

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
    };

    if (nuevasImagenes.length > 0) {
      // Eliminar imágenes antiguas de Cloudinary
      for (let imagen of productoExistente.imagenes) {
        const publicId = imagen.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
      datosActualizados.imagen = nuevasImagenes[0];
      datosActualizados.imagenes = nuevasImagenes;
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

export const obtenerProductosRelacionados = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    const productosRelacionados = await Producto.find({
      categoria: producto.categoria,
      _id: { $ne: id }
    }).limit(4);
    res.json(productosRelacionados);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const agregarPreguntaProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta } = req.body;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    producto.preguntas.push({
      usuario: req.user._id,
      pregunta
    });
    await producto.save();
    res.status(201).json({ mensaje: "Pregunta añadida exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const responderPreguntaProducto = async (req, res) => {
  try {
    const { id, preguntaId } = req.params;
    const { respuesta } = req.body;
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    const pregunta = producto.preguntas.id(preguntaId);
    if (!pregunta) {
      return res.status(404).json({ mensaje: "Pregunta no encontrada." });
    }
    pregunta.respuesta = respuesta;
    pregunta.fechaRespuesta = Date.now();
    await producto.save();
    res.json({ mensaje: "Respuesta añadida exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const obtenerPreguntasProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('preguntas.usuario', 'nombre');
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    res.json(producto.preguntas);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const filtrarProductos = async (req, res) => {
  try {
    const { categoria, precioMin, precioMax, ordenar } = req.query;
    let query = {};
    if (categoria) query.categoria = categoria;
    if (precioMin || precioMax) {
      query.precio = {};
      if (precioMin) query.precio.$gte = parseFloat(precioMin);
      if (precioMax) query.precio.$lte = parseFloat(precioMax);
    }
    
    let sortOption = {};
    if (ordenar === 'precio_asc') sortOption.precio = 1;
    else if (ordenar === 'precio_desc') sortOption.precio = -1;
    else if (ordenar === 'nombre_asc') sortOption.nombre = 1;
    else if (ordenar === 'nombre_desc') sortOption.nombre = -1;
    
    const productos = await Producto.find(query).sort(sortOption);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const actualizarVisitasProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndUpdate(id, { $inc: { visitas: 1 } });
    res.json({ mensaje: "Visitas actualizadas." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const obtenerProductosMasVendidos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ vendidos: -1 }).limit(10);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const obtenerProductosNuevos = async (req, res) => {
  try {
    const unaSemanaAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const productos = await Producto.find({ createdAt: { $gte: unaSemanaAtras } }).sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const actualizarEtiquetasProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { etiquetas } = req.body;
    const producto = await Producto.findByIdAndUpdate(id, { etiquetas }, { new: true });
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

