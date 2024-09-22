import express from "express";
import { agregarAWishlist, obtenerWishlist, eliminarDeWishlist } from "../controller/wishlistController.js";
import { protectRoute } from '../middleware/authMiddleware.js';

const wishlistRoutes = express.Router();

wishlistRoutes.post("/wishlist", protectRoute, agregarAWishlist);
wishlistRoutes.get("/wishlist", protectRoute, obtenerWishlist);
wishlistRoutes.delete("/wishlist/:productoId", protectRoute, eliminarDeWishlist);

export default wishlistRoutes;
