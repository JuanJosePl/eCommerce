import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { errorHandler } from "./utils/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import logger from "./utils/logger.js";
import carritoRoutes from "./routes/cartRoutes.js";
import cuponRoutes from "./routes/couponRoutes.js";
import devolucionRoutes from "./routes/returnRoutes.js";
import notificacionRoutes from "./routes/notificationRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import { MONGO_URL } from "./config/config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGOURLC = MONGO_URL;

// Configuración de Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted.cdn.com"],
        styleSrc: ["'self'", "https://trusted.cdn.com", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "http://localhost:8000"],
        connectSrc: ["'self'", "http://localhost:8000"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// Configuración de CORS
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  "https://desarrollo-e-commerce-blond-nu.vercel.app",
  "https://ecommerce-1o8n.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some((allowed) => allowed instanceof RegExp ? allowed.test(origin) : allowed === origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type", "Accept"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Conectar a MongoDB y arrancar el servidor
mongoose
  .connect(MONGOURLC)
  .then(() => {
    logger.info("Conexión a la base de datos exitosa.");
    app.listen(PORT, () => {
      logger.info(`El servidor está corriendo en el puerto: ${PORT}`);
    });
  })
  .catch((error) => logger.error(error));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Hola, bienvenido al servidor!");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Definir las rutas de la API
app.use("/api/usuarios", apiLimiter, usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productos", apiLimiter, productRoutes);
app.use("/api/orders", apiLimiter, orderRoutes);
app.use("/api/cart", carritoRoutes);
app.use("/api/cupons", apiLimiter, cuponRoutes);
app.use("/api/devoluciones", apiLimiter, devolucionRoutes);
app.use("/api/notificaciones", apiLimiter, notificacionRoutes);
app.use("/api/wishlist", apiLimiter, wishlistRoutes);

// Manejo de errores global
app.use(errorHandler);

export default app;
