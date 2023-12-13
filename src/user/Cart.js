import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { cartUpdate, getUserCart } from "./helper/userapicalls";
import { Link,  useNavigate } from "react-router-dom";
import { loadCart, removeItemFromCart } from "../core/helper/cartHelper";

const Cart = () => {
  const { user } = isAuthenticated();
  const [products, setProducts] = useState([]);
const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  // Load Cart Products
  const preload = () => {
  const prods = loadCart()

  let sum = 0;
  if (prods.length > 0){
    prods.map((prod) => {
    sum += (prod.count * prod.price);
  }) 
}
  setPrice(sum)
    setProducts(prods);  

    
  };
  // Remove product from cart
  const removeProductFromCart = (productId) => {
    let cart = removeItemFromCart(productId)
    setProducts(cart)
  }
  // Proceed to Place Order

  useEffect(() => {
    preload();  

  }, []);
 ;
  
  const cartArea = () => {
    return (
      <section className="cart_area">
    
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
      
              {products && products.length == 0 && (
                <div className=" d-flex h-75 align-items-center " style={{minHeight: "50vh"}}>
<h4 className="text-center w-100 bg-warning text-danger p-2 rounded mt-3">
                  There are no products in your cart! Start Shopping
                </h4>
                </div>
                
              )}
              {products && products.length > 0 && (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="w-25">Product</th>
                        <th className="w-25">Price</th>
                        <th className="w-25 text-center">Quantity</th>
                        <th className="w-25 text-center">Remove</th>

                        <th className="w-25">Total</th>

                      </tr>
                    </thead>
                    <tbody>

                      {products && products.length > 0 &&
                        products.map((prod, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <div className="media">
                                  <div className="d-flex">
                                    <img src="img/cart.jpg" alt="" />
                                  </div>
                                  <div className="media-body">
                                    <p>{prod.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <h5>&#x20B9;{prod.price}</h5>
                              </td>
                              <td className=" d-flex justify-content-center ">
                                <div className="product_count w-25">
                                  <input
                                    type="number"
                                    name="qty"
                                    disabled
                                    value={prod.count}
                                    className=" form-control text-center "
                                  />
                                </div>
                              </td>
                              <td className="text-center">
                                  <button
                                    type="number"
                                    name="qty"
                                    className=" btn btn-sm btn-danger "
                                    onClick={() => removeProductFromCart(prod._id)}
                                  >Remove</button>
                              </td>
                              <td>
                                <h5>
                                  &#x20B9;{prod.price * prod.count}
                                </h5>
                              </td>
                            </tr>
                          );
                        })}
                      
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-right">
                          <h5>Subtotal</h5>
                        </td>
                        <td>
                          <h5>&#x20B9;{price}</h5>
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>

                  <div className="w-100 text-end">
                    <div className="checkout_btn_inner d-flex align-items-center">
                      <Link to="/">
                        {" "}
                        <a className="gray_btn btn btn-info m-2" href="#">
                          Continue Shopping
                        </a>{" "}
                      </Link>

                      <button className="primary-btn btn btn-success" onClick={() => {
                        localStorage.setItem("products", JSON.stringify({products}));
                        localStorage.setItem("price", price)
                        return navigate("/checkout");
                      }}>
Proceed to checkout
                      </button>
                      
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Base>
    <div className="mt-4">

    
    {products.length > 0 && cartArea() }
    {products.length == 0 && (
      <div className=" d-flex h-75 align-items-center justify-content-center " style={{minHeight: "50vh"}}>
      <h4 className="text-center  w-50 alert alert-warning  p-2 rounded mt-3">
                        There are no products in your cart! Start Shopping
                      </h4>
                      </div>
    )}
      </div>
    </Base>
  );
};
export default Cart;
