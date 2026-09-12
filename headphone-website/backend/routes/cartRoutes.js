import express from "express";

import {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete(
    "/remove/:productId",
    protect,
    removeFromCart
);

router.put(
    "/update/:productId",
    protect,
    updateCartQuantity
);

export default router;