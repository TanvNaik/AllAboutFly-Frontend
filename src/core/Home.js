import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { getAllProducts } from "./helper/coreapicalls";
import { getAllCategories } from "../admin/helper/adminapicall";
import { Link } from "react-router-dom";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  const changeSection = (name) => (event) => {
    event.preventDefault();

    // Array.from(document.getElementsByClassName("category")).map((el, i) =>
    //   el.classList.toggle("active")
    // );
    // event.target.classList.toggle("active");
    if(event.target.id === "all"){
      return setProducts(allProducts);
    }
    let prods = [];

    allProducts.map((prod) => {
      if (prod.category._id === event.target.id) {
        prods.push(prod);
      }
    });
    setProducts(prods);
  };

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        return setError(data.error);
      } else {
        setCategories(data);
      }
    });
    getAllProducts().then((data) => {
      if (data.error) {
        return setError(data.error);
      } else {
        setAllProducts(data);
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <Base>
      
      {/* <!-- Start header Area --> */}
      <section className="header-area ">
      <div className="container  d-flex w-100   justify-content-between align-items-center   text-light mt-5 pt-5" style={{height:"75vh"}}>
        <div
          className="my-auto max-w-3xl w-full blub relative ml-2 w-50 "
          style={{ marginLeft: "15%" }}
        >
          <div className="">
            <div className=" text-start">
              <h2 className="text-start font-semibold md:text-left text-white " >
              Elevate Your Perspective,  <br />
              Elevate Your World
              </h2>
              <p className="introduction__copy mt-2 mr-auto max-w-xs xl:max-w-md md:text-left ml-0 text-lead" style={{color:"#818FB4"}}>
              Discover Limitless Views with Every Glide.
              </p>
            </div>
            
          </div>
        </div>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide w-50 align-items-center  pt-5"
          data-bs-ride="carousel"
          style={{ maxWidth: "70%", widt: "40%", marginRight:"5%" }}
        >
          <div className="carousel-inner">
          <div className="carousel-inner text-center " style={{height:"70vh"}}>
              <div className="carousel-item active text-center align-items-center ">
                <img
                  className="d-block   "
                  src="../site-images/img1.jpg"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block "
                  src="../site-images/img2.jpg"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block "
                  src="../site-images/img3.jpg"
                  alt="Third slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block "
                  src="../site-images/img4.jpg"
                  alt="Third slide"
                />
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
        
      </section>
      {/* <!-- End header Area --> */}


 

      {/* <!-- start product Area --> */}
      <section className="mt-4 pt-4">
        {/* <!-- single product slide --> */}
        <div className="single-product-slider">
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <ul className="nav nav-tabs justify-content-center ">
                <li
                          onClick={changeSection()}
                          className="category nav-item m-2 "
                          role="presentation"
                          id="all"
                        >
                          <button
                            className=" nav-link text-light "
                            id="all"
                          >
                            All
                          </button>
                        </li>
                  {categories &&
                    categories.map((category, index) => {
                      return (
                        <li
                          onClick={changeSection()}
                          className="category nav-item m-2  "
                          key={index}
                          role="presentation"
                          id={category._id}
                        >
                          <button
                            className="nav-link text-light "
                            id={category._id}
                          >
                            {category.name}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="row">
              {products.length === 0 && (
                <span className="m-3 text-center">
                  <i>No products to show</i>
                </span>
              )}
              {/* <!-- single product --> */}
              {products.length !== 0 &&
                products.map((product, index) => {
                  return (
                    <div key={index} className="col-lg-3 col-md-6">
                      <Card product={product}></Card>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end product Area --> */}
    </Base>
  );
};
export default Home;
