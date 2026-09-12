import React from 'react'
import { motion } from 'framer-motion';
import "./card.css";
function ProductCard({ product, index = 0 }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.99 },
    visible: (i = 0) => ({
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 110,
        mass: 0.6,
        delay: 0.08 * i,
      },
    }),
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1
          })
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("Cart error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <motion.div className='product-card-wrapper'
      variants={cardVariants}
      custom={index} // pass index for stagger animation 
      initial="visible"
      transition={0.7 || 0.3}
      viewport={{ once: true, }}
    >

      {/* product card */}
      <div className='card product-card mb-4 border-0'>
        {/* product image */}
        <div className='card-img position-relative'>
          <img src={product.image} alt={product.title}
            className='img-fluid rounded-2 product-image' />
        </div>
        {/* product content */}
        <div className='card-des mt-3 mb-3'>
          <h4 className='card-title transition-color'>
            {product.title}
          </h4>
          <h5 className='fw-bold price'>
            {product.price}
          </h5>
          <p className="mb-0">
            {product.stock > 0
              ? `Only ${product.stock} left`
              : "Out of Stock"}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className='btn add-to-cart btn-primary btn-md rounded-pill fw-bold mt-3'
          >
            {product.stock <= 0 ? "Out of Stock" : "Add To Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
export default ProductCard
