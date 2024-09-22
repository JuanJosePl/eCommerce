import mongoose from "mongoose";

const esquemaDevolucion = new mongoose.Schema({
  orden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    },
    motivo: {
      type: String,
      required: true
    }
  }],
  estado: {
    type: String,
    enum: ['Pendiente', 'Aprobada', 'Rechazada', 'Completada'],
    default: 'Pendiente'
  },
  comentarios: String
}, { timestamps: true });

export default mongoose.model("Devolucion", esquemaDevolucion);