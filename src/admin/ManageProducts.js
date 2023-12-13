import React, { useState, useEffect } from "react";
import Base from "../core/Base.js";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index.js";
import { deleteProduct, getAllProducts } from "./helper/adminapicall.js";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();
  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteaProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base >
      <div className="container" style={{marginTop:"7%"}}>
      <Link className='btn btn-success' to={`/admin/dashboard`}>
        <span className=''>Admin Home</span>
      </Link>

      <div className='row  rounded w-100  justify-content-center '>
        <div className='col-8'>
        
<hr/>
<table className="table table-secondary m-3  ">
                    <thead>
                      <tr>
                        <th scope="col">Product name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
          {products.map((product, key) => {
            return (
              <tr key={key}>
                            <td>{product.name} </td>
                            <td><Link
                            className='btn btn-success'
                            to={`/admin/product/update/${product._id}`}
                          >
                            <span className=''>Update</span>
                          </Link></td>
                            <td><button
                            onClick={() => {
                              deleteaProduct(product._id);
                            }}
                            className='btn btn-danger'
                          >
                            Delete
                          </button></td>
                          </tr>
            );
          })}
           </tbody>
                      </table>
        </div>
      </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
