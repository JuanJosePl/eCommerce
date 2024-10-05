import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const esquemaDireccion = new mongoose.Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  pais: { type: String, required: true },
});

const esquemaUsuario = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    telefono: {
      type: String,
      required: false,
    },
    direccionesEnvio: [esquemaDireccion],
    carrito: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
      },
    ],
    emailVerificado: {
      type: Boolean,
      default: false, // Se inicializa como false
    },
    avatar: {
      type: String,
      default: null,
    },
    otp: String,
    otpExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

esquemaUsuario.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

esquemaUsuario.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Usuario", esquemaUsuario);
