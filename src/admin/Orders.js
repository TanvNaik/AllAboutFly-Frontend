import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders, updateOrderStatus } from "./helper/adminapicall";
import { Link } from "react-router-dom";

export default function Orders() {
  const { user, token } = isAuthenticated();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const preload = () => {
    getAllOrders().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data.orders);
      }
    });
  };

  const updateStatus = (orderId, status) => {
    updateOrderStatus(orderId, user._id, token, status).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        preload();
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  return (
    <Base>
 

      <section className="p-3" style={{marginTop:"7%"}}>
        <aside className="single_sidebar_widget post_category_widget">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Billing Name</th>
                <th scope="col">Order Status</th>
                <th scope="col">Amount</th>
                <th scope="col">Update Order</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((order, key) => {
                  return (
                    <tr key={key}>
                      <td>{order.user.name}</td>

                      <td>{order.status}</td>
                      <td>{order.amount}</td>
                      <td>
                        <Link
                          className="nav-link btn-success text-center w-50"
                          to={"/update-order/" + order._id}
                          params={{ orderId: order._id }}
                        >
                          Update
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              
                
            </tbody>
          </table>

          
          
        </aside>
      </section>
    </Base>
  );
}
