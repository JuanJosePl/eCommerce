import mongoose from "mongoose";

const esquemaNotificacion = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['pedido', 'oferta', 'stock', 'general'],
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  leida: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Notificacion", esquemaNotificacion);