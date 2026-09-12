import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './navigation.css';


function Header() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    navigate("/");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const [cartCount, setCartCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowProfile(false);

    navigate("/");
  };

  useEffect(() => {
    const getCartCount = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (data.success) {
          const count = data.cart.items.reduce(
            (total, item) => total + item.quantity,
            0
          );

          setCartCount(count);
        }
      } catch (error) {
        console.log("Cart count error:", error);
      }
    };

    getCartCount();

    const handleCartUpdate = () => {
      getCartCount();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, [user]);


  return (
    <header >
      <Container>
        <Navbar collapseOnSelect expand='lg' className="mb-3">
          <Container fluid>
            <Navbar.Brand role="button" onClick={() => navigate("/")}> 🎧 Headphone-Hub</Navbar.Brand>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="m-auto">
                  <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                  <Nav.Link onClick={() => scrollTo("products")}>Shop</Nav.Link>
                  <Nav.Link onClick={() => scrollTo("footer")}>About Us</Nav.Link>
                  <Nav.Link onClick={() => scrollTo("products")}>Products</Nav.Link>
                  <Nav.Link onClick={() => scrollTo("contact")}>Contact Us</Nav.Link>
                  <a
                    onClick={() => navigate("/cart")}
                    role="button"
                    className="position-relative text-decoration-none fs-3"

                    
                  >
                    🛒

                    {cartCount > 0 && (
                      <span
                        style={{
                          fontSize: "12px",

                        }}
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                      </span>
                    )}
                  </a>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>

            <div className='d-flex align-items-center header-action'>

              <div className="position-relative">

                <button
                  type="button"
                  className="btn0 btn-light rounded-circle"

                  onClick={() => setShowProfile(!showProfile)}
                >
                  
                  <i className="bi bi-person-circle me fs-4"></i>
                   
                </button>

                {showProfile && (
                  <div
                    className="position-absolute bg-white shadow rounded-3 p-3"
                    style={{
                      top: "50px",
                      right: "0",
                      width: "210px",
                      zIndex: 1050
                    }}>
                    {user ? (
                      <>
                        <div className="px-2 py-2 border-bottom">
                          <strong>{user.name}</strong>
                        </div>

                        <a
                          onClick={() => { setShowProfile(false); navigate("/orders"); }}
                          role="button"
                          className="d-block text-decoration-none text-dark py-2"
                        >
                          📦 My Orders
                        </a>

                        <a
                          onClick={() => { setShowProfile(false); navigate("/cart"); }}
                          role="button"
                          className="d-block text-decoration-none text-dark py-2"
                        >
                          🛒 My Cart
                        </a>

                        <button
                          className="btn btn-link text-danger text-decoration-none p-0 py-2"
                          onClick={handleLogout}
                        >
                          🚪 Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          onClick={() => { setShowProfile(false); navigate("/login"); }}
                          role="button"
                          className="dropdown-item py-2"
                        >
                          🔐 Login
                        </a>

                        <a
                          onClick={() => { setShowProfile(false); navigate("/register"); }}
                          role="button"
                          className="dropdown-item py-2"
                        >
                          📝 Register
                        </a>
                      </>
                    )}

                  </div>
                )}

              </div>
              <Navbar.Toggle className='me-3' aria-controls={`offcanvasNavbar-expand-lg`} />
            </div>
          </Container>
        </Navbar>
      </Container >
    </header >
  )
}

export default Header
