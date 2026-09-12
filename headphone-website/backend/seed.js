import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
    {
        title: "Beats",
        price: 995,
        image: "/assets/products/1.png",
        description: "Premium Beats headphone",
        category: "Headphones",
        stock: 10
    },
    {
        title: "Rocky Mountain",
        price: 895,
        image: "/assets/products/2.png",
        description: "Rocky Mountain headphone",
        category: "Headphones",
        stock: 10
    },
    {
        title: "Game Console Controller Cable",
        price: 695,
        image: "/assets/products/3.png",
        description: "Game console controller cable",
        category: "Gaming",
        stock: 10
    },
    {
        title: "White EliteBook Tablet 810",
        price: 595,
        image: "/assets/products/4.png",
        description: "White EliteBook Tablet",
        category: "Tablet",
        stock: 10
    },
    {
        title: "Gore Wear C7",
        price: 495,
        image: "/assets/products/5.png",
        description: "Gore Wear C7",
        category: "Gadgets",
        stock: 10
    },
    {
        title: "Gore Wear C7",
        price: 795,
        image: "/assets/products/6.jpg",
        description: "Gore Wear C7",
        category: "Gadgets",
        stock: 10
    },
    {
        title: "Beats",
        price: 995,
        image: "/assets/products/7.png",
        description: "Premium Beats headphone",
        category: "Headphones",
        stock: 10
    },
    {
        title: "Smartwatch 2.0 LTE Wifi",
        price: 995,
        image: "/assets/products/8.jpg",
        description: "Smartwatch with LTE and WiFi",
        category: "Smartwatch",
        stock: 10
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Product.deleteMany();

        await Product.insertMany(products);


        process.exit();
    } catch (error) {
        console.log("Error:", error.message);
        process.exit(1);
    }
};

seedProducts();