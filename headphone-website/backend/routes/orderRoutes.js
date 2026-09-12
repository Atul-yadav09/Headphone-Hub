import express from "express";

import {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} from "../controllers/orderController.js";

import {
    protect,
    isSeller
} from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

// Seller
router.get("/all", protect, isSeller, getAllOrders);

router.put("/:id/status", protect, isSeller, updateOrderStatus);

// User cancel order
router.put("/:id/cancel", protect, cancelOrder);

export default router;