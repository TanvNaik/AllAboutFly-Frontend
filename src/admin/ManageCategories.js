import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
      } else {
        setCategories(data);
      }
    });
  };

  const deleteaCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base >
    <div className="container" style={{marginTop:"7%"}}>
    <Link className='btn btn-success' to={`/admin/dashboard`}>
        <span className=''>Admin Home</span>
      </Link>

      <div className='row  rounded w-100  justify-content-center'>
        <div className='col-8  '>
          
          <table className="table table-secondary m-3  ">
                    <thead>
                      <tr>
                        <th scope="col">Category name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, key) => {
                        return (
                          <tr key={key}>
                            <td>{category.name} </td>
                            <td><Link
                    className='btn btn-success'
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className=''>Update</span>
                  </Link></td>
                            <td><button
                    onClick={() => {
                      deleteaCategory(category._id);
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
                <hr/>
              </div>
            
          
      </div>
    </div>
      
    </Base>
  );
};

export default ManageCategories;
