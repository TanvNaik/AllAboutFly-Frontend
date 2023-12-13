import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
const AdminDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className='card'>
        <h4 className='card-header bg-light text-dark'> Admin Navigation </h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link to='/admin/create/category' className='nav-link text-dark'>
              Create Category
            </Link>
            <Link to='/admin/categories' className='nav-link text-dark'>
              Manage Categories
            </Link>
            <Link to='/admin/create/product' className='nav-link text-dark'>
              Create Products
            </Link>
            <Link to='/admin/products' className='nav-link text-dark'>
              Manage Products
            </Link>
            <Link to='/admin/orders' className='nav-link text-dark'>
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightSide = () => {
    return (
      <div className='card mb-4'>
        <h4 className='card-header'>Admin Information</h4>
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
            <span className='badge bg-danger'>Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      
    > 
      <div className='row mb-3 justify-content-center' style={{marginTop:"7%"}}>
        <div className='col-3'>{adminLeftSide()}</div>
        <div className='col-6'>{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
