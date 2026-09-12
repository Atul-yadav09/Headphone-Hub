import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerRegister() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://headphone-hub.onrender.com/api/auth/seller/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            alert("Seller registration successful ✅");

            navigate("/seller-login");

        } catch (error) {
            console.log("Registration error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <h2 className="text-center mb-4">
                        Seller Registration
                    </h2>

                    <form onSubmit={handleRegister}>

                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                        >
                            Register as Seller
                        </button>

                    </form>

                    <button
                        className="btn btn-link w-100 mt-3"
                        onClick={() => navigate("/seller-login")}
                    >
                        Already have seller account? Login
                    </button>

                </div>
            </div>
        </div>
    );
}

export default SellerRegister;