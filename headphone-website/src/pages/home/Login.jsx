
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
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
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login successful ✅");

            navigate("/");

        } catch (error) {
            console.log("Login error:", error);
            alert("Unable to connect with server ❌");
        }

        setLoading(false);
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "#f5f7fb",
                padding: "40px 15px"
            }}
        >

            <div
                className="card border-0 shadow-lg overflow-hidden"
                style={{
                    maxWidth: "900px",
                    width: "100%",
                    borderRadius: "20px"
                }}
            >

                <div className="row g-0">

                    {/* Left Side */}
                    <div
                        className="col-md-6 d-flex align-items-center justify-content-center text-white p-5"
                        style={{
                            background:
                                "linear-gradient(135deg, #0d6efd, #6610f2)"
                        }}
                    >
                        <div className="text-center">

                            <div
                                style={{
                                    fontSize: "70px",
                                    marginBottom: "20px"
                                }}
                            >
                                🎧
                            </div>

                            <h1 className="fw-bold">
                                Headphone Hub
                            </h1>

                            <p className="mt-3 mb-0">
                                Premium headphones,
                                gadgets and more.
                            </p>

                            <p className="opacity-75">
                                Your music. Your style.
                            </p>

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="col-md-6 bg-white p-4 p-md-5">

                        <h2 className="fw-bold mb-2">
                            Welcome Back 👋
                        </h2>

                        <p className="text-muted mb-4">
                            Login to continue shopping
                        </p>

                        <form onSubmit={handleLogin}>

                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >
                                        {showPassword
                                            ? "🙈"
                                            : "👁️"}
                                    </button>

                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 mt-3"
                                disabled={loading}
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>

                        </form>

                        <div className="text-center mt-4">

                            <span className="text-muted">
                                Don't have an account?
                            </span>

                            <a
                                onClick={() => navigate("/register")}
                                role="button"
                                className="fw-bold text-decoration-none ms-2"
                            >
                                Register
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;

