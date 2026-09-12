

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/home/Cart";
import Home from "./pages/home/Home";
import SellerLogin from "./pages/home/SellerLogin";
import AdminDashboard from "./pages/home/AdminDashboard";
import Checkout from "./pages/home/Checkout";
import Orders from "./pages/home/Orders";
import Login from "./pages/home/Login";
import Register from "./pages/home/Register";


function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || user.role !== "seller") {
        return <Navigate to="/seller-login" />;
    }

    return children;
}


function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />
                {/* Normal Website */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Seller Login */}
                <Route
                    path="/seller-login"
                    element={<SellerLogin />}
                />

                {/* Seller Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;