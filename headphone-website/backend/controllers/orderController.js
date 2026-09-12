import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        // Check stock + decrease stock
        for (const item of cart.items) {

            const product = item.product;

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.title} has only ${product.stock} items left`
                });
            }

            totalAmount += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            // 🔥 Stock decrease
            product.stock = product.stock - item.quantity;

            await product.save();
        }

        // Create order
        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || "COD"
        });

        // Empty cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.log("PLACE ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order is already cancelled"
            });
        }

        if (order.status === "delivered") {
            return res.status(400).json({
                success: false,
                message: "Delivered order cannot be cancelled"
            });
        }

        // Restore stock
        for (const item of order.items) {
            const product = await Product.findById(item.product);

            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.status = "cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        console.log("CANCEL ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};