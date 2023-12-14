import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder, getProduct } from "../admin/helper/adminapicall";
import Base from "../core/Base";

export default function ViewOrder() {
  const [order, setOrder] = useState({
    _id: "",
    address: "",
    amount: 0,
    contact_no: "",
    createdAt: "",
    updatedAt: "",
    email: "",
    status: "Recieved",
    user: "",
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [productsCart, setproductsCart] = useState([])
  const params = useParams();

  const preload = (orderId) => {
    getOrder(orderId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError(false)
        setOrder(data.order);
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
      return (
        <div class="  alert alert-danger" role="alert">
          Unable to fetch Order . Please try after some time.
        </div>
      );
    }
  };
  return (
    <Base>
      <div
        className="d-flex justify-content-center user-order"
        style={{ marginTop: "7%" }}
      >
        {errorMessage()}
        <div className=" col-3 card mb-4  ">
          <ul className="list-group">
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Order Placed at:
              </span>
              &nbsp;
              {order.createdAt.split("T")[0]}
            </li>
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Address:
              </span>
              &nbsp;
              {order.address}
            </li>
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Email:
              </span>
              &nbsp;
              {order.email}
            </li>
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Contact No:
              </span>
              &nbsp;
              {order.contact_no}
            </li>
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Amount
              </span>
              &nbsp;
              {order.amount}/-
            </li>
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Status:
              </span>
              &nbsp;
              {order.status === "Delivered" && (
                <span className="text-success">Delivered</span>
              )}
              {order.status !== "Delivered" && (
                <span className="text-info">{order.status}</span>
              )}
            </li>
            <li className="list-group-item">
              <span
                className="badge bg-warning text-dark
                   mr-2 "
              >
                Status Updated At:
              </span>
              &nbsp;
              {order.updatedAt.split("T")[0]}
            </li>

            <li className="list-group-item">
              {/* <Link to={"/order/" + order._id}>
              <button  className="btn btn-success " style={{width: "100%", borderRadius:"5px"}}>
                 View Order Details
                </button>
                </Link> */}
            </li>
          </ul>
        </div>
        <div className="col-5 card mb-4 w-25">
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
      </div>
    </Base>
  );
}
