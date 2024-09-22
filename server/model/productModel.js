import mongoose from "mongoose";

const esquemaResena = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const esquemaPregunta = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  pregunta: {
    type: String,
    required: true
  },
  respuesta: {
    type: String,
    default: null
  },
  fechaRespuesta: Date
}, { timestamps: true });

const esquemaProducto = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      required: true,
    },
    subcategoria: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    imagen: {
      type: String,
      required: true,
    },
    imagenes: [String],
    activo: {
      type: Boolean,
      default: true,
    },
    promocion: {
      type: Boolean,
      default: false,
    },
    nuevo: {
      type: Boolean,
      default: true,
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    enOferta: {
      type: Boolean,
      default: false,
    },
    precioOferta: {
      type: Number,
      min: 0,
    },
    resenas: [esquemaResena],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numResenas: {
      type: Number,
      default: 0,
    },
    preguntas: [esquemaPregunta],
    marca: {
      type: String,
    },
    peso: {
      type: Number,
      min: 0,
    },
    dimensiones: {
      largo: Number,
      ancho: Number,
      alto: Number,
    },
    etiquetas: [String],
    vendidos: {
      type: Number,
      default: 0,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual para calcular el descuento
esquemaProducto.virtual('descuento').get(function() {
  if (this.enOferta && this.precioOferta) {
    return ((this.precio - this.precioOferta) / this.precio * 100).toFixed(2);
  }
  return 0;
});

// Índices para mejorar el rendimiento de las búsquedas
esquemaProducto.index({ nombre: 'text', descripcion: 'text' });
esquemaProducto.index({ categoria: 1, subcategoria: 1 });
esquemaProducto.index({ precio: 1 });

export default mongoose.model("Producto", esquemaProducto);