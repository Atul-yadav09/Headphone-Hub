import React, { useState } from "react";

function AddProduct() {

    const [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
        stock: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...product,
                        price: Number(product.price),
                        stock: Number(product.stock)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setMessage("Product added successfully ✅");

                setProduct({
                    title: "",
                    price: "",
                    image: "",
                    description: "",
                    category: "",
                    stock: ""
                });
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.log(error);
            setMessage("Something went wrong ❌");
        }
    };

    return (
        <div className="container py-5">

            <h2 className="mb-4">Add Product</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Product Title</label>

                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="mb-3">
                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="mb-3">
                    <label>Image Path</label>

                    <input
                        type="text"
                        name="image"
                        className="form-control"
                        placeholder="/assets/products/1.jpg"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="mb-3">
                    <label>Description</label>

                    <textarea
                        name="description"
                        className="form-control"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>


                <div className="mb-3">
                    <label>Category</label>

                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className="mb-3">
                    <label>Stock</label>

                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add Product
                </button>

            </form>

            {message && (
                <p className="mt-3">
                    {message}
                </p>
            )}

        </div>
    );
}

export default AddProduct;