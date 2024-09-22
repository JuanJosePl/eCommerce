import Order from '../model/orderModel.js';
import Producto from '../model/productModel.js';
import { AppError } from '../utils/errorHandler.js';

// Crear un nuevo pedido
export const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      throw new AppError('No hay artículos en el pedido', 400);
    }

    // Verificar si todos los productos existen y tienen suficiente stock
    for (let item of orderItems) {
      const product = await Producto.findById(item.product);
      if (!product) {
        throw new AppError(`Producto no encontrado: ${item.product}`, 404);
      }
      if (product.stock < item.qty) {
        throw new AppError(`Stock insuficiente para el producto: ${product.nombre}`, 400);
      }
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Actualizar el stock de productos
    for (let item of orderItems) {
      await Producto.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty }
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// Obtener pedido por ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'nombre email');

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    // Verificar si el pedido pertenece al usuario logueado o si el usuario es un administrador
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new AppError('No autorizado para ver este pedido', 403);
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Actualizar pedido a pagado
export const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Actualizar pedido a entregado
export const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new AppError('Pedido no encontrado', 404);
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Obtener los pedidos del usuario logueado
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Obtener todos los pedidos (solo admin)
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate('user', 'id nombre');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Cancelar un pedido
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Order.findById(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado." });
    }

    if (pedido.estado === 'Entregado') {
      return res.status(400).json({ mensaje: "No se puede cancelar un pedido ya entregado." });
    }

    pedido.estado = 'Cancelado';
    await pedido.save();

    // Devolver stock
    for (let item of pedido.orderItems) {
      await Producto.findByIdAndUpdate(item.product, {
        $inc: { stock: item.qty }
      });
    }

    res.json({ mensaje: "Pedido cancelado exitosamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Obtener estadísticas de pedidos
export const getOrderStatistics = async (req, res) => {
  try {
    const totalPedidos = await Order.countDocuments();
    const pedidosCompletados = await Order.countDocuments({ estado: 'Entregado' });
    const pedidosCancelados = await Order.countDocuments({ estado: 'Cancelado' });
    const ingresoTotal = await Order.aggregate([
      { $match: { estado: 'Entregado' } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.json({
      totalPedidos,
      pedidosCompletados,
      pedidosCancelados,
      ingresoTotal: ingresoTotal[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

// Controlador de Seguimiento de Pedidos
export const updateShippingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, ubicacion } = req.body;
    const orden = await Order.findById(id);

    if (!orden) {
      return res.status(404).json({ mensaje: "Orden no encontrada." });
    }

    orden.estadosEnvio.push({ estado, ubicacion });
    await orden.save();

    res.json({ mensaje: "Estado de envío actualizado.", orden });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};

export const getShippingStates = async (req, res) => {
  try {
    const { id } = req.params;
    const orden = await Order.findById(id).select('estadosEnvio');

    if (!orden) {
      return res.status(404).json({ mensaje: "Orden no encontrada." });
    }

    res.json(orden.estadosEnvio);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
};