import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getOrder, getProduct, updateOrderStatus } from "./helper/adminapicall";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

export default function UpdateOrder() {
  const [order, setOrder] = useState({
    _id:"",
    address: "",
    amount: 0,
    contact_no: "",
    createdAt: "",
    email: "",
    status: "Recieved",
    user: "",
  });
  const [status, setStatus] = useState("");
  const [productsCart, setproductsCart] = useState([])
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false); 

  const params = useParams();
  const preload = (orderId) => {
    getOrder(orderId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrder(data.order);
        setStatus(data.order.status)
        setproductsCart(data.products);
        let prods = []
        data.products.map((prod, key) => {
            getProduct(prod._id).then(data => {
              prods.push(data)
            })
        })
        setTimeout(() => {
          setProducts([...products, ...prods]);

        },4000)
      }

    });
  };
  useEffect(() => {
    preload(params.orderId);
  }, []);

  const errorMessage = () => {
    if (error) {
      return       (<div className=" alert alert-danger" role="alert">
Unable to update status. Please try after some time.</div>)
      
     
    }
  };

  const successMessage = () => {
    if (success)  {
      return       (<div className=" alert alert-success" role="alert">
      Order Status Updated succesfully</div>)
                }
  }

  const {user,token} = isAuthenticated();
  const onSubmit = (e) => {
    e.preventDefault();

    updateOrderStatus(order._id,user._id, token, status)
    .then(data => {
      if(data.error){
        setError(true)
        return setStatus(false)
      }
      setError(false)
      return setSuccess(true);
    })
  };

  const updateOrderForm = () => {
    return (
      <form >
        <div className="mb-3 container w-50  text-light" style={{marginTop:"7%"}}>
          <p className="lead w-100 text-center mt-2">Update Order </p>
          {errorMessage()}
          {successMessage()}
          {/* User */}
          <div className="form-group">
            <label htmlFor="taskName" className="form-label text-light">
              Billing Name
            </label>
            <input
              type="text"
              value={order.user.name}
              required
              disabled
              className="form-control"
              id="taskName"
            />
          </div>

          {/* Address */}
          <div className="form-group mt-2">
            <label htmlFor="floatingTextarea" className="form-label text-light">
              Address
            </label>
            <textarea
              className="form-control"
              value={order.address}
              disabled
              name="description"
              id="floatingTextarea"
            ></textarea>
          </div>

          {/* Amount */}
          <div className="form-group mt-2">
            <label htmlFor="amount" className="form-label text-light">
              Amount
            </label>
            <input type="text"
              className="form-control"
              value={order.amount + " /-"}
              disabled
              name="amount"
            ></input>
          </div>

          {/* Contact Number */}
          <div className="form-group mt-2">
            <label htmlFor="cn" className="form-label text-light">
              Contact Number
            </label>
            <input type="text"
              className="form-control"
              value={order.contact_no}
              disabled
              name="amount"
            ></input>
          </div>
          {/* Email */}
          <div className="form-group mt-2">
            <label htmlFor="cn" className="form-label text-light">
              Email
            </label>
            <input type="email"
              className="form-control"
              value={order.email}
              disabled
              name="amount"
            ></input>
          </div>

          {/* Status */}
          <div className="form-group mt-2">
            <label htmlFor="cn" className="form-label text-light">
              Status
            </label>
            <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name="priority"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="Recieved" selected>
                  Recieved
                </option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
                <option value="Processing">Processing</option>
                <option value="Confirmed">Confirmed</option>
              </select>
                
          </div>
          <div className="form-group mt-2">
            <label htmlFor="cn" className="form-label text-light">
              Products
            </label>
            <ul className="list-group">

            {products.length > 0 && products.map((product, key) => (
                    <li className="list-group-item" key={key}>
                    <span
                      className="badge bg-warning text-dark
                         mr-2 "
                    >
                      Product: 
                    </span>
                    &nbsp;
                    {product.name}<br/>
                    <span
                      className="badge bg-warning text-dark
                         mr-2 "
                    >
                      Count: 
                    </span>
                    &nbsp;
                    
                    {productsCart[key].count}

                  </li>
                ))}
                </ul>
          </div>
          <div className="form-group mt-2 text-center">
          <button onClick={onSubmit} className="btn btn-success w-50">
          Update Order
        </button>
          </div>
          
        </div>

        
        
      </form>
    );
  };

  return (
    <Base>
     
      {updateOrderForm()}
    </Base>
  );
}
