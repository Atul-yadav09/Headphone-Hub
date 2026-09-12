import Product from "../models/Product.js";


// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const {
            title,
            price,
            description,
            category,
            stock
        } = req.body;

        const image = req.file
            ? `/uploads/${req.file.filename}`
            : req.body.image;

        if (!title || !price || !category || !image) {
            return res.status(400).json({
                success: false,
                message: "Title, price, category and image are required"
            });
        }

        const product = await Product.create({
            title,
            price: Number(price),
            image,
            description: description || "",
            category,
            stock: Number(stock) || 0
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.log("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const { title, price, description, category, stock } = req.body;

        product.title = title;
        product.price = price;
        product.description = description;
        product.category = category;
        product.stock = stock;

        // Agar new image upload hui hai
        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};