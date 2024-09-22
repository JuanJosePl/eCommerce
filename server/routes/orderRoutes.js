import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  cancelOrder,
  updateShippingStatus,
  getShippingStates,
} from "../controller/orderController.js";
import { protectRoute, adminRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, createOrder)
  .get(protectRoute, adminRoute, getOrders);

router.get("/my-orders", protectRoute, getMyOrders);

router
  .route("/:id")
  .get(protectRoute, getOrderById)
  .put(protectRoute, adminRoute, updateShippingStatus);

router.put("/:id/pay", protectRoute, updateOrderToPaid);
router.put("/:id/deliver", protectRoute, adminRoute, updateOrderToDelivered);
router.get("/:id/shipping-states", protectRoute, getShippingStates);

export default router;
