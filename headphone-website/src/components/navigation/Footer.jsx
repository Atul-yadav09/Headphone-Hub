import React from 'react'
import { useNavigate } from 'react-router-dom'
import './navigation.css';
function Footer() {
  const navigate = useNavigate();
  const scrollTo = (id) => {
    navigate("/");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  return (
    <>
       <footer
        id="footer"
        className="mt-2"
        style={{
          background: "#f1f5f9",
          color: "#1e293b"
        }}
      >
        <div className="container py-4">

          <div className="row g-4">

            {/* Brand */}
            <div className="col-md-5">
              <h2 className="fw-bold text-primary">
                🎧 Headphone Hub
              </h2>

              <p className="text-muted mt-3 mb-0">
                Premium headphones, gadgets and more.
                Find your perfect sound with us.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-3">
              <h3 className="fw-bold mb-3">
                Quick Links
              </h3>

              <a
                onClick={() => navigate("/")}
                role="button"
                className="d-block text-muted text-decoration-none mb-2"
              >
                Home
              </a>

              <a
                onClick={() => scrollTo("products")}
                role="button"
                className="d-block text-muted text-decoration-none mb-2"
              >
                Products
              </a>

              <a
                onClick={() => navigate("/cart")}
                role="button"
                className="d-block text-muted text-decoration-none mb-2"
              >
                Cart
              </a>
            </div>

            {/* Contact */}
            <div className="col-md-4" id="contact">
              <h3 className="fw-bold mb-3">
                Contact
              </h3>

              <p className="text-muted mb-2">
                📧 support@headphonehub.com
              </p>

              <p className="text-muted mb-2">
                📞 +91 98765 43210
              </p>

              <p className="text-muted mb-0">
                📍 India
              </p>
            </div>

          </div>

          <hr />

          <div className="text-center text-muted">
            © 2026 Headphone Hub. All rights reserved.
          </div>
          <p className="text-center text-muted">
            Created by-Atul kumar
          </p>

        </div>
      </footer>

     
      
    </>
  )
}

export default Footer
