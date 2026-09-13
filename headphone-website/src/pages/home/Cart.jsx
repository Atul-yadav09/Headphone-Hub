import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState({ items: [] });

    const getCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        try {
            const response = await fetch(
                "https://headphone-hub.onrender.com/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setCart(data.cart);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Cart error:", error);
        }
    };
    useEffect(() => {
        getCart();
    }, []);

    const updateQuantity = async (productId, quantity) => {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        if (quantity < 1) {
            return;
        }

        try {

            const response = await fetch(
                `https://headphone-hub.onrender.com/api/cart/update/${productId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        quantity: Number(quantity)
                    })
                }
            );


            const data = await response.json();


            if (data.success) {

                // Updated cart immediately show karo
                setCart(data.cart);

                // Header/cart count ko update karne ke liye
                window.dispatchEvent(
                    new Event("cartUpdated")
                );

            } else {

                alert(
                    data.message ||
                    "Unable to update cart"
                );
            }

        } catch (error) {

            console.log(
                "Update quantity error:",
                error
            );

            alert(
                "Unable to update cart quantity"
            );
        }
    };

    const removeItem = async (productId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `https://headphone-hub.onrender.com/api/cart/remove/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setCart(data.cart);
                window.dispatchEvent(new Event("cartUpdated"));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const totalAmount = cart.items.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    const deliverCharge=()=>{
        return 49;
    }
    return (
        <div
            className="container-fluid py-5"
            style={{
                background: "#f8f9fa",
                minHeight: "100vh"
            }}
        >
            <div className="container">

                {/* Heading */}
                <div className="mb-4" onClick={getCart}>
                    <h2 className="fw-bold mb-1">
                        Shopping Cart 🛒
                    </h2>

                    <p className="text-muted">
                        Review your items before checkout
                    </p>
                </div>

                <div className="row g-4">

                    {/* Cart Items */}
                    <div className="col-lg-8">

                        {cart.items.map((item) => (
                            <div
                                key={item.product._id}
                                className="card border-0 shadow-sm rounded-4 mb-3"
                            >
                                <div className="card-body p-3">

                                    <div className="row align-items-center">

                                        {/* Image */}
                                        <div className="col-3 col-md-2">
                                            <img
                                                src={
                                                    item.product.image?.startsWith("/uploads/")
                                                        ? `https://headphone-hub.onrender.com${item.product.image}`
                                                        : item.product.image
                                                }
                                                alt={item.product.title}
                                                className="img-fluid rounded-3"
                                                style={{
                                                    height: "90px",
                                                    width: "90px",
                                                    objectFit: "contain"
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.style.display = "none";
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="col-9 col-md-4">
                                            <h5 className="fw-bold mb-1">
                                                {item.product.title}
                                            </h5>

                                            <p className="text-muted mb-0">
                                                ₹{item.product.price}
                                            </p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="col-6 col-md-3 mt-3 mt-md-0">
                                            <div className="d-flex align-items-center gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    className="btn btn-outline-secondary btn-sm rounded-circle"
                                                >
                                                    −
                                                </button>

                                                <span
                                                    className="fw-bold"
                                                    style={{
                                                        minWidth: "30px",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="btn btn-outline-secondary btn-sm rounded-circle"
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>

                                        {/* Price + Remove */}
                                        <div className="col-6 col-md-3 text-md-end mt-3 mt-md-0">

                                            <h5 className="fw-bold">
                                                ₹{item.product.price * item.quantity}
                                            </h5>

                                            <button
                                                onClick={() => removeItem(item.product._id)}

                                                className="btn btn-sm btn-outline-danger rounded-pill"
                                            >
                                                🗑 Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Summary */}
                    <div className="col-lg-4">

                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Order Summary
                                </h4>

                                <div className="d-flex justify-content-between mb-3">
                                    <span>Subtotal</span>
                                    <strong>₹{totalAmount}</strong>
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <span>Delivery</span>
                                    <span className="text-success">
                                        ₹{deliverCharge}
                                    </span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="fw-bold">
                                        Total
                                    </h5>

                                    <h5 className="fw-bold text-primary">
                                        ₹{totalAmount + deliverCharge}
                                    </h5>
                                </div>

                                <a
                                    onClick={() => navigate("/checkout")}
                                    role="button"
                                    className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                                >
                                    Proceed to Checkout →
                                </a>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cart;