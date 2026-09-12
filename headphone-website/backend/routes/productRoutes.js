import express from "express";
import upload from "../middleware/uploadMiddleware.js"
import {
    protect,
    isSeller
} from "../middleware/authMiddleware.js"
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();


router.post("/", protect, isSeller, upload.single("image"),createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", protect, isSeller, upload.single("image"),updateProduct);

router.delete("/:id", protect, isSeller, deleteProduct);

export default router;