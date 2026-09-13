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

        

        //  Product ka seller frontend se nahi aayega.

        //  Backend khud login seller ki ID lega.
       

        const product = await Product.create({
            seller: req.user.id,

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
// Ye PUBLIC route hai.
// User/Home page par:
// Seller A + Seller B + Seller C
// sabke products aayenge.

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .populate("seller", "name email");

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



// GET ONLY LOGGED-IN SELLER PRODUCTS
// Ye Admin Dashboard ke liye hai.
export const getSellerProducts = async (req, res) => {

    try {

        const products = await Product.find({
            seller: req.user.id
        }).populate("seller", "name email");

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {

        console.log("GET SELLER PRODUCTS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// GET SINGLE PRODUCT

export const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("seller", "name email");

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

// Seller sirf apna product update kar sakta hai.

export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        // Product owner check
        if (
            product.seller &&
            product.seller.toString() !== req.user.id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "You can only update your own products"
            });

        }

        const {
            title,
            price,
            description,
            category,
            stock
        } = req.body;

        product.title = title;
        product.price = Number(price);
        product.description = description || "";
        product.category = category;
        product.stock = Number(stock) || 0;

        // New image upload hui ho
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

        console.error("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// DELETE PRODUCT
// Seller sirf apna product delete kar sakta hai.

export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        // Owner check
        if (
            product.seller &&
            product.seller.toString() !== req.user.id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message: "You can only delete your own products"
            });

        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log("DELETE PRODUCT ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};