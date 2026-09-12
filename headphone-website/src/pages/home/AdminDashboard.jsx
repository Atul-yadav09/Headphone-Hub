import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "../../components/admin/EditProduct";


function AdminDashboard() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("products");
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        customers: 0,
        sales: 0
    });

    const [form, setForm] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        category: "",
        stock: ""
    });

    const [editId, setEditId] = useState(null);


    // GET PRODUCTS
    const getProducts = async () => {

        try {

            const response = await fetch(
                "https://headphone-hub.onrender.com/api/products"
            );

            const data = await response.json();

            setProducts(data.products);

            setStats((prev) => ({
                ...prev,
                products: data.products.length
            }));

        } catch (error) {
            console.log(error);
        }
    };




    const getOrders = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "https://headphone-hub.onrender.com/api/orders/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);

                const uniqueCustomers = new Set(
                    data.orders.map((order) => order.user?._id)
                );

                const totalSales = data.orders
                    .filter((order) => order.status !== "cancelled")
                    .reduce(
                        (total, order) => total + order.totalAmount,
                        0
                    );

                setStats((prev) => ({
                    ...prev,
                    orders: data.orders.length,
                    customers: uniqueCustomers.size,
                    sales: totalSales
                }));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Orders error:", error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `https://headphone-hub.onrender.com/api/orders/${orderId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Order status updated ✅");
                getOrders();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Status update error:", error);
        }
    };

    useEffect(() => {
        getProducts();
        getOrders();
    }, []);

    // INPUT CHANGE
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    // ADD / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("price", form.price);
            formData.append("description", form.description);
            formData.append("category", form.category);
            formData.append("stock", form.stock);

            // Image file
            if (form.image) {
                formData.append("image", form.image);
            }

            const url = "https://headphone-hub.onrender.com/api/products";
            const method = "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Something went wrong");
                return;
            }

            alert(
                "Product added successfully ✅"
            );

            setForm({
                title: "",
                price: "",
                image: "",
                description: "",
                category: "",
                stock: ""
            });

            setEditingProduct(null);

            getProducts();

        } catch (error) {
            console.log("PRODUCT ERROR:", error);
            alert("Something went wrong ❌");
        }
    }
    // EDIT
    const handleEdit = (product) => {
        setEditId(product._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // DELETE
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `https://headphone-hub.onrender.com/api/products/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("Product deleted ✅");

                getProducts();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

        }

    };


    // LOGOUT
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/seller-login");

    };


    return (

        <div
            className="container-fluid py-4"
            style={{
                background: "#f8f9fa",
                minHeight: "100vh"
            }}
        >

            {/* HEADER */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1">
                    Seller Dashboard
                </h2>

                <p className="text-muted mb-0">
                    Manage your products and orders
                </p>
            </div>
            {/* Stats Section */}
            <div className="d-flex align-items-start gap-4 mb-4">

                {/* Stats Cards */}
                <div className="row g-3 flex-grow-1">

                    <div className="col-12 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="text-muted">
                                    📦 Total Products
                                </h5>
                                <h2 className="fw-bold">
                                    {stats.products}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="text-muted">
                                    🛒 Total Orders
                                </h5>
                                <h2 className="fw-bold">
                                    {stats.orders}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="text-muted">
                                    👥 Customers
                                </h5>
                                <h2 className="fw-bold">
                                    {stats.customers}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="text-muted">
                                    💰 Total Sales
                                </h5>
                                <h2 className="fw-bold">
                                    ₹{stats.sales}
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Logout */}
                <div className="pt-3">
                    <button
                        type="button"
                        className="btn btn-danger px-4"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>

            </div>

            {editId && (
                <EditProduct
                    productId={editId}
                    onUpdated={(updatedProduct) => {
                        setEditId(null);
                        getProducts();
                    }}
                />
            )}
            {/* PRODUCT FORM */}
            {activeTab === "products" &&(

                <div className="card ">
                    <h4>
                        Manage your products
                    </h4>
                    <div className="card p-4 mt-5">
                        <h3 className="mb-4">

                            {editId
                                ? "Edit Product"
                                : "Add Product"}

                        </h3>


                        <form onSubmit={handleSubmit}>

                            <div className="card border-0 shadow-sm rounded-4 mb-4">
                                <div className="card-body p-4">

                                    <h3 className="fw-bold mb-1">
                                        {editId
                                            ? "Edit Product"
                                            : "Add Product"}
                                    </h3>

                                    <p className="text-muted mb-4">
                                        {editId ? "Edit product to your store"
                                            : "Add product details to your store"}
                                    </p>

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Product Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                placeholder="Enter product name"
                                                value={form.title}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                placeholder="Enter price"
                                                value={form.price}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Category
                                            </label>
                                            <input
                                                type="text"
                                                name="category"
                                                className="form-control"
                                                placeholder="e.g. Headphones"
                                                value={form.category}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                className="form-control"
                                                placeholder="Enter stock"
                                                value={form.stock}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">
                                                Product Image
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        image: e.target.files[0]
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">
                                                Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Enter product description"
                                            />
                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 mt-4"
                                    >

                                        {editId
                                            ? "Update Product"
                                            : "Add Product"}

                                    </button>

                                </div>
                            </div>





                            {editId && (

                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() => {

                                        setEditId(null);

                                        setForm({
                                            title: "",
                                            price: "",
                                            image: "",
                                            description: "",
                                            category: "",
                                            stock: ""
                                        });

                                    }}
                                >
                                    Cancel
                                </button>

                            )}

                        </form>
                    </div>
                </div>
            )}

            {/* PRODUCTS */}


            {activeTab === "products" && (

                <div className="row">
                    <h3 className="mb-4">
                        All Products ({products.length})
                    </h3>

                    {products.map((product) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={product._id}
                        >

                            <div className="card h-100 p-3">

                                <img
                                    src={
                                        product.image?.startsWith("/uploads/")
                                            ? `https://headphone-hub.onrender.com${product.image}`
                                            : product.image
                                    }
                                    alt={product.title}
                                />

                                <h4 className="mt-3">
                                    {product.title}
                                </h4>

                                <h5>
                                    ₹{product.price}
                                </h5>

                                <p>
                                    Category: {product.category}
                                </p>

                                <p>
                                    Stock: {product.stock}
                                </p>


                                <div className="mt-auto">

                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

            <hr className="my-5" />

            <div>

                <h4>
                    Manage your Orders
                </h4>
                <h2 className="mb-4">
                    Orders 📦
                </h2>

                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    orders.map((order) => (
                        <div className="card p-4 mb-4" key={order._id}>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5>Order ID: {order._id}</h5>

                                    <p className="mb-1">
                                        Customer: {order.user?.name}
                                    </p>

                                    <p>
                                        Email: {order.user?.email}
                                    </p>
                                </div>

                                <div>
                                    <strong>
                                        ₹{order.totalAmount}
                                    </strong>
                                </div>
                            </div>

                            <hr />

                            <h6>Products:</h6>

                            {order.items.map((item) => (
                                <div
                                    className="mb-2"
                                    key={item._id}
                                >
                                    <strong>
                                        {item.product?.title}
                                    </strong>

                                    <span className="ms-3">
                                        Qty: {item.quantity}
                                    </span>

                                    <span className="ms-3">
                                        ₹{item.price}
                                    </span>
                                </div>
                            ))}

                            <hr />

                            <p>
                                <strong>Address:</strong>{" "}
                                {order.shippingAddress?.address},{" "}
                                {order.shippingAddress?.city} -{" "}
                                {order.shippingAddress?.pincode}
                            </p>

                            <select
                                className="form-select"
                                value={order.status}
                                onChange={(e) =>
                                    updateOrderStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="pending">
                                    Pending
                                </option>

                                <option value="confirmed">
                                    Confirmed
                                </option>

                                <option value="shipped">
                                    Shipped
                                </option>

                                <option value="delivered">
                                    Delivered
                                </option>

                                <option value="cancelled">
                                    Cancelled
                                </option>
                            </select>

                        </div>
                    ))
                )}
            </div>
        </div>

    );

}

export default AdminDashboard;