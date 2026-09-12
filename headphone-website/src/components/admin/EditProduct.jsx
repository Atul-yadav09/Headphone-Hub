import React, { useEffect, useState } from "react";

function EditProduct({ productId, onUpdated }) {

    const [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
        stock: ""
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(
                    `https://headphone-hub.onrender.com/api/products/${productId}`
                );

                const data = await response.json();

                if (data.success) {
                    setProduct(data.product);
                }

            } catch (error) {
                console.log("Error:", error);
            }
        };

        getProduct();
    }, [productId]);


    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("title", product.title);
            formData.append("price", Number(product.price));
            formData.append("description", product.description);
            formData.append("category", product.category);
            formData.append("stock", Number(product.stock));

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const response = await fetch(
                `https://headphone-hub.onrender.com/api/products/${productId}`,
                {
                    method: "PUT",
                    body: formData
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {
                alert("Product updated successfully ✅");

                if (onUpdated) {
                    onUpdated(data.product);
                }
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("Update error:", error);
        }
    };

    return (
        <div className="container py-5">

            <h2 className="mb-4">
                Edit Product
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="title"
                    placeholder="Product title"
                    value={product.title}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Update Product
                </button>

            </form>

        </div>
    );
}

export default EditProduct;