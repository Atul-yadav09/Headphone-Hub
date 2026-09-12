import React from 'react'
import HeroSlider from "../../components/layout/hero/HeroSlider.jsx"
import { categories, features, bannerDes, bannerDes1 } from '../../constants/data.js';
import CategoryCard from '../../components/layout/card/categoryCard.jsx';
import Banner from '../../components/layout/banner/Banner.jsx';
import ProductCard from '../../components/layout/card/ProductCard.jsx';
import { useEffect, useState } from "react";
import Header from '../../components/navigation/Header.jsx';
import Footer from '../../components/navigation/Footer.jsx';
function Home() {


const [products, setProducts] = useState([]);

useEffect(() => {
    fetch("https://headphone-hub.onrender.com/api/products")
        .then((res) => res.json())
        .then((data) => {
            console.log("Products from API:", data.products);
            setProducts(data.products);
        })
        .catch((error) => {
            console.log("Error fetching products:", error);
        });
}, []);
console.log("HOME PRODUCTS:", products);
  return (
    <>
    <Header/>
    
      <HeroSlider />
      <section className='category-section section-spacing'>
        <div className='container'>
          <div className='row'>
            {/* loop through categories */}
            {
              categories.map((cat, index) => {
                return (
                  <div className={
                    index == 3 || index === 2 ?
                      "col-lg-6 col-md-12 mb-4"  // large cards
                      : "col-lg-3 col-md-6 mb-4" // small card 
                  } key={index}>
                    <CategoryCard cat={cat} index={index} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>


      <section className='feature-section section-spacing'>
        <div className="container">
          <div className="row">
            {
              features.map((val, index) => {
                return (
                  <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-3 mb-md-0'
                    key={index}>
                    <div className='feature-items d-flex align-items-center flex-column flex-sm-row'>
                      <div className='feature-icon me-sm-3 me-0 mb-2 mb-sm-0'>
                        <i className={val.icon}></i>
                      </div>
                      <div className='feature-text text-center text-sm-start'>
                        <h5 className='fw-bold mb-0'> {val.title}</h5>
                        <p className='mb-0 text-muted'>{val.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>

      <Banner bannerInfo={bannerDes} />

      <section id='products' className='product-section'>
        <div className='container'>
          <h2 className='section-title text-center fw-bold mb-5'>
            Best Seller Products
          </h2>
          <div className='row'>
            {
              products.map((product, index) => {
                return (
                  <div className='col-lg-3 col-md-6 col-12'
                  key={product._id}>

                    <ProductCard product={product}  index={index} />
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>

      <Banner bannerInfo={bannerDes1} />
   
    <Footer />

    </>
  )
}

export default Home;
