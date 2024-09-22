import mongoose from "mongoose";

const esquemaCupon = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  descuento: {
    type: Number,
    required: true,
  },
  tipoDescuento: {
    type: String,
    enum: ['porcentaje', 'cantidad'],
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  usoMaximo: {
    type: Number,
    default: null,
  },
  usosActuales: {
    type: Number,
    default: 0,
  },
  productosAplicables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  }],
  categoriasAplicables: [String],
}, { timestamps: true });

export default mongoose.model("Cupon", esquemaCupon);