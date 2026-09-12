
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                "https://headphone-hub.onrender.com/api/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("GET ORDERS ERROR:", error);
            alert("Unable to load orders ❌");
        }

        setLoading(false);
    };

    useEffect(() => {
        getOrders();
    }, []);

    const cancelOrder = async (orderId) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://headphone-hub.onrender.com/api/orders/${orderId}/cancel`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            alert("Order cancelled successfully ✅");

            getOrders();

        } catch (error) {
            console.log("CANCEL ORDER ERROR:", error);
            alert("Unable to cancel order ❌");
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <h4>Loading orders...</h4>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <h2 className="fw-bold mb-4">
                My Orders 📦
            </h2>

            {orders.length === 0 ? (
                <div className="text-center py-5">
                    <h4>No orders found 😔</h4>

                    <a
                        onClick={() => navigate("/")}
                        role="button"
                        className="btn btn-primary mt-3"
                    >
                        Continue Shopping
                    </a>
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        key={order._id}
                        className="card shadow-sm border-0 mb-4"
                    >
                        <div className="card-body">

                            {/* ORDER HEADER */}
                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Order #{order._id.slice(-6)}
                                    </h5>

                                    <small className="text-muted">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </small>
                                </div>

                                <span
                                    className={`badge ${
                                        order.status === "cancelled"
                                            ? "bg-danger"
                                            : order.status === "delivered"
                                            ? "bg-success"
                                            : order.status === "shipped"
                                            ? "bg-info"
                                            : "bg-warning text-dark"
                                    }`}
                                >
                                    {order.status}
                                </span>

                            </div>

                            {/* PRODUCTS */}
                            {order.items.map((item) => (
                                <div
                                    key={item._id}
                                    className="d-flex justify-content-between border-bottom py-2"
                                >
                                    <div>
                                        <strong>
                                            {item.product?.title ||
                                                "Product"}
                                        </strong>

                                        <div className="text-muted">
                                            Quantity: {item.quantity}
                                        </div>
                                    </div>

                                    <div>
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            ))}

                            {/* TOTAL */}
                            <div className="d-flex justify-content-between mt-3">
                                <strong>
                                    Total Amount
                                </strong>

                                <strong>
                                    ₹{order.totalAmount}
                                </strong>
                            </div>

                            {/* ADDRESS */}
                            <div className="mt-3 p-3 bg-light rounded">
                                <strong>
                                    Delivery Address
                                </strong>

                                <p className="mb-0 mt-1">
                                    {order.shippingAddress?.name}
                                    <br />
                                    {order.shippingAddress?.phone}
                                    <br />
                                    {order.shippingAddress?.address}
                                    <br />
                                    {order.shippingAddress?.city} -{" "}
                                    {order.shippingAddress?.pincode}
                                </p>
                            </div>

                            {/* CANCEL BUTTON */}
                            {order.status !== "cancelled" &&
                                order.status !== "delivered" && (
                                    <button
                                        className="btn btn-danger mt-3"
                                        onClick={() =>
                                            cancelOrder(order._id)
                                        }
                                    >
                                        Cancel Order
                                    </button>
                                )}

                        </div>
                    </div>
                ))
            )}

        </div>
    );
}

export default Orders;