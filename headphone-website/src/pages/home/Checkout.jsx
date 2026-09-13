import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [cart, setCart] = useState({ items: [] });

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "https://headphone-hub.onrender.com/api/orders",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        shippingAddress: form,
                        paymentMethod: paymentMethod
                    })
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            alert("Order placed successfully 🎉");

            navigate("/orders");

        } catch (error) {
            console.log("Order error:", error);
            alert("Unable to place order ❌");
        }
    };

    useEffect(() => {
        const getCart = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

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
                }
            } catch (error) {
                console.log("Cart error:", error);
            }
        };

        getCart();
    }, []);

    const DELIVERY_CHARGE = 49;

    const subtotal = cart.items.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    const totalAmount = subtotal + DELIVERY_CHARGE;


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
                <div className="mb-4">
                    <h2 className="fw-bold mb-1">
                        Checkout 🛒
                    </h2>

                    <p className="text-muted">
                        Complete your order and delivery details
                    </p>
                </div>

                <div className="row g-4">

                    {/* LEFT SIDE */}
                    <div className="col-lg-7">

                        <form onSubmit={placeOrder}>

                            {/* Delivery Information */}
                            <div className="card border-0 shadow-sm rounded-4 mb-4">
                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-1">
                                        Delivery Information
                                    </h4>

                                    <p className="text-muted mb-4">
                                        Enter your delivery details
                                    </p>

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Full Name
                                            </label>

                                            <input
                                                className="form-control"
                                                name="name"
                                                placeholder="Enter your name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Phone Number
                                            </label>

                                            <input
                                                className="form-control"
                                                name="phone"
                                                placeholder="Enter phone number"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label fw-semibold">
                                                Full Address
                                            </label>

                                            <textarea
                                                className="form-control"
                                                name="address"
                                                rows="3"
                                                placeholder="House no, street, area"
                                                value={form.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                City
                                            </label>

                                            <input
                                                className="form-control"
                                                name="city"
                                                placeholder="Enter city"
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Pincode
                                            </label>

                                            <input
                                                className="form-control"
                                                name="pincode"
                                                placeholder="Enter pincode"
                                                value={form.pincode}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* Payment */}
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">

                                    <h4 className="fw-bold mb-3">
                                        Payment Method
                                    </h4>

                                    <div className="border rounded-3 p-3">

                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                value="COD"
                                                checked={
                                                    paymentMethod === "COD"
                                                }
                                                onChange={(e) =>
                                                    setPaymentMethod(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <label className="form-check-label fw-semibold">
                                                Cash on Delivery
                                            </label>
                                        </div>

                                        <small className="text-muted ms-4">
                                            Pay when your order is delivered.
                                        </small>

                                    </div>

                                </div>
                            </div>

                            {/* Mobile button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 rounded-pill mt-4 d-lg-none"
                            >
                                Place Order 🎉
                            </button>

                        </form>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-lg-5">

                        <div className="card border-0 shadow-sm rounded-4 sticky-lg-top"
                            style={{ top: "20px" }}
                        >
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Order Summary
                                </h4>

                                {cart.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="d-flex justify-content-between align-items-center border-bottom py-3"
                                    >
                                        <div>
                                            <h6 className="fw-bold mb-1">
                                                {item.product.title}
                                            </h6>

                                            <small className="text-muted">
                                                Qty: {item.quantity}
                                            </small>
                                        </div>

                                        <strong>
                                            ₹
                                            {item.product.price *
                                                item.quantity}
                                        </strong>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-between mt-4">
                                    <span>Subtotal</span>

                                    <strong>
                                        ₹{subtotal}
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between mt-2">
                                    <span>Delivery</span>

                                    <span className="text-success fw-semibold">
                                        ₹{DELIVERY_CHARGE}
                                    </span>
                                </div>

                                <hr />

                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="fw-bold">
                                        Total
                                    </h5>

                                    <h5 className="fw-bold text-primary">
                                        ₹{totalAmount}
                                    </h5>
                                </div>

                                {/* Desktop button */}
                                <button
                                    type="submit"
                                    form="checkout-form"
                                    className="btn btn-primary btn-lg w-100 rounded-pill fw-bold d-none d-lg-block"
                                    onClick={placeOrder}
                                >
                                    Place Order 🎉
                                </button>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Checkout;