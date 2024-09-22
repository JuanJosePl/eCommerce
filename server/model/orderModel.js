import mongoose from "mongoose";

const esquemaEstadoEnvio = new mongoose.Schema({
  estado: {
    type: String,
    required: true
  },
  ubicacion: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    productosOrdenados: [
      {
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true, min: 1 },
        imagen: { type: String, required: true },
        precio: { type: Number, required: true },
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Producto",
        },
      },
    ],
    direccionEnvio: {
      calle: { type: String, required: true },
      ciudad: { type: String, required: true },
      codigoPostal: { type: String, required: true },
      pais: { type: String, required: true },
    },
    metodoPago: {
      type: String,
      required: true,
    },
    resultadoPago: {
      id: { type: String },
      estado: { type: String },
      fechaActualizacion: { type: String },
      emailPago: { type: String },
    },
    precioSubtotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    precioImpuestos: {
      type: Number,
      required: true,
      default: 0.0,
    },
    precioEnvio: {
      type: Number,
      required: true,
      default: 0.0,
    },
    precioTotal: {
      type: Number,
      required: true,
      default: 0.0,
    },
    estaPagado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaPago: {
      type: Date,
    },
    estaEntregado: {
      type: Boolean,
      required: true,
      default: false,
    },
    fechaEntrega: {
      type: Date,
    },
    estado: {
      type: String,
      required: true,
      enum: ["Pendiente", "Pagado", "Enviado", "Entregado", "Cancelado"],
      default: "Pendiente",
    },
    estadosEnvio: [esquemaEstadoEnvio],
    cuponAplicado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cupon'
    },
    descuentoAplicado: {
      type: Number,
      default: 0
    },
    notas: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para calcular el tiempo transcurrido desde la creación del pedido
orderSchema.virtual('tiempoTranscurrido').get(function() {
  return Date.now() - this.createdAt;
});

// Índices para mejorar el rendimiento de las búsquedas
orderSchema.index({ usuario: 1, createdAt: -1 });
orderSchema.index({ estado: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;