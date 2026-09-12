import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://headphone-hub.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            // Seller check
            if (data.user.role !== "seller") {
                alert("Only seller can access dashboard ❌");
                return;
            }

            // Token save
            localStorage.setItem("token", data.token);

            // User information save
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Seller login successful ✅");

            navigate("/admin");

        } catch (error) {
            console.log("Login error:", error);
            alert("Something went wrong");
        }
    };


    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <h2 className="mb-4">
                        Seller Login
                    </h2>

                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="btn btn-link w-100 mt-3"
                            onClick={() => navigate("/seller-register")}
                        >
                            New Seller? Register here
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default SellerLogin;