import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUser, getUserOrders } from "./helper/userapicalls";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {  user,  user: { name, email }, token} = isAuthenticated();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    contact_no: "",
  });
  const [error, setError] = useState("");
  const [orders, setUserOrders] = useState([]);
  useEffect(() => {
    getUser(user._id, token).then((data) => {
      if (data.error) {
        setError("Unable to retrieve account details. Please try later");
      } else {
        return setUserDetails(data.user);
      }
    });
    getUserOrders(user._id).then((data) => {
      if (data.error) {
        setError("Unable to retrieve orders. Please try later");
      } else {
        return setUserOrders(data.orders);
      }
    });
  }, []);
  const dashBoard = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="row blog_right_sidebar">
            <div className="col-4">
              <aside className="single_sidebar_widget author_widget justify-content-center">
                <img
                  className="author_img rounded-circle"
                  src="../images/undraw_pic_profile_re_7g2h.svg"
                  alt=""
                  width={"50%"}
                />

                <div className="br"></div>
              </aside>
            </div>
            <div className="col-8">
              <aside className="single_sidebar_widget author_widget text-start">
                <h4>{userDetails.name}</h4>
                <p>
                  <span
                    className="badge bg-success 
               mr-2 "
                  >
                    Email:
                  </span>{" "}
                  {userDetails.email}
                </p>
                <p>
                  <span
                    className="badge bg-success 
               mr-2 "
                  >
                    Contact No:
                  </span>
                  {userDetails.contact_no}
                </p>
              </aside>
            </div>

            <aside className="single_sidebar_widget ads_widget">
              <a href="#">
                <img className="img-fluid" src="img/blog/add.jpg" alt="" />
              </a>
              <div className="br"></div>
            </aside>
            <aside className="single_sidebar_widget post_category_widget">
              <h4 className="widget_title">Orders</h4>
              <ul className="list cat-list">
                <span
                  className="d-flex justify-content-between "
                  style={{ fontWeight: "800" }}
                >
                  <p>Products</p>
                  <p>Order Status</p>
                  <p>Order Total</p>
                </span>
              </ul>
              {orders.length == 0 && (
                <p className="text-center">You don't have any orders yet</p>
              )}

              <ul className="list cat-list">
                {orders.length > 0 &&
                  orders.map((order, key) => {
                    return (
                      <li key={key}>
                        <span className="d-flex justify-content-between">
                          <ul>
                            {order.productCart.products.length > 0 && order.productCart.products.map((prod, key) => {
                              return (
                                <li>
                                  {prod.productId.name} x {prod.count}
                                </li>
                              );
                            })}
                          </ul>

                          <p>{order.status}</p>
                          <p>{order.amount}</p>
                        </span>
                      </li>
                    );
                  })}
                <li style={{ borderBottom: "2px solid grey" }}>
                  <span href="#" className="d-flex justify-content-between">
                    <ul>
                      <li>prod1 x 1</li>
                      <li>prod2 x 2</li>
                    </ul>

                    <p>Confirmed</p>
                    <p>48000</p>
                  </span>
                </li>
                <li style={{ borderBottom: "2px solid grey" }}>
                  <span href="#" className="d-flex justify-content-between">
                    <ul>
                      <li>prod1 x 1</li>
                      <li>prod2 x 2</li>
                    </ul>

                    <p>Delivered</p>
                    <p>48000</p>
                  </span>
                </li>
              </ul>
              <div className="br"></div>
            </aside>
          </div>
        </div>
      </div>
    );
  };


  const leftSide = () => {
     return <div className='card w-100 h-100 text-start bg-light'>
        <h4 className='card-header ' style={{fontSize: "1.2rem"}}>  Dashboard </h4>
        <ul className='list-group'>
          <li className='list-group-item'>
          {/* <Link to={"../../update-profile"} className='nav-link ' style={{color: "#6C70FE"}}>
              Update Profile
            </Link> */}
            
            
            <Link to={"../../cart"} className='nav-link ' style={{color: "#6C70FE"}}>
              Cart
            </Link>
            <Link to={"../../user-orders/" + user._id} className='nav-link ' style={{color: "#6C70FE"}}>
              Orders
            </Link>
            <Link to={"../../contact-us"} className='nav-link ' style={{color: "#6C70FE"}}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
  }
  const rightSide = () => {
    return <div className='card mb-4 text-start w-100 h-100 bg-light text-dark' >
        <h4 className='card-header'>Profile</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <span
              className='badge bg-success 
               mr-2'
            >
              Name:
            </span>
            &nbsp;
            {name}
          </li>
          <li className='list-group-item'>
            <span
              className='badge bg-success 
               mr-2 '
            >
              Email:
            </span>
            &nbsp;
            {email}
          </li>
          
         
          <li className='list-group-item'>
            <span className='badge bg-warning text-dark'>User Area</span>
          </li>
        </ul>
      </div>
  }
  const userProfilePic = () => {
      return(
        <div className='card  w-100 h-100  justify-content-center align-items-center bg-dark' >
                
                <img width={"50%"} 
                src="../images/undraw_pic_profile_re_7g2h.svg"
                />
              
        </div>
      )
  }
  return (
    <Base title="User Dash Board">
      <div className='row justify-content-center ' style={{marginTop: "6%"}}>
        <div className='col-3  d-flex justify-content-center align-items-center'>{leftSide()}</div>
        <div className='col-5  '>{rightSide()}</div>
        {/* <div className="col-3 d-flex justify-content-center align-items-center">{userProfilePic()}</div> */}
      </div>
      {/* {dashBoard()} */}
    </Base>
  );
};

export default UserDashBoard;
