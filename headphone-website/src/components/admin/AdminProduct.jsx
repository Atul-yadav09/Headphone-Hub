import React, { useEffect, useState } from "react";

function AdminProducts() {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/products"
            );

            const data = await response.json();

            setProducts(data.products);

        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {
                // UI se bhi product hata do
                setProducts(
                    products.filter((product) => product._id !== id)
                );
            }

        } catch (error) {
            console.log("Delete error:", error);
        }
    };


    return (
        <div className="container py-5">

            <h2 className="mb-4">
                Admin Products
            </h2>

            <div className="row">

                {products.map((product) => (

                    <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={product._id}
                    >

                        <div className="card p-3">

                            <img
                                src={product.image}
                                alt={product.title}
                                className="img-fluid"
                            />

                            <h4 className="mt-3">
                                {product.title}
                            </h4>

                            <p>
                                ₹{product.price}
                            </p>

                            <p>
                                Stock: {product.stock}
                            </p>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    deleteProduct(product._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AdminProducts;