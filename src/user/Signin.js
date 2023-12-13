import React, { useState } from "react";
import Base from "../core/Base";
import { Link, useNavigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "abcd@gmail.com",
    password: "1234",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    if(email === "" || password === ""){
      return setValues({...values, error:"Please fill all the fields"})
    }

    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(() => {
        setValues({...values, error:"Invalid credentials"})
        console.log("Signin request failed")});
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return navigate('/admin/dashboard') 
      } else {
        return navigate('/user/dashboard') 
      }
    }
    if (isAuthenticated()) {
      return navigate('/') 
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className=' container alert alert-info'>
          <h2>Loading...</h2>
        </div>
      )
    );
  };
  const errorMessage = () => {
    if (error) {
      return (
      <div class="container alert alert-danger" role="alert">
{error}        </div>
    );
  }};
  const signInForm = () => {
    return (
      <div className='row align-items-center '  style={{minHeight: "70vh"}}>
        <div className='col-md-6 offset-sm-3 text-left text-light'>
        <h3 className="text-light text-center">Connect & Explore: Sign In for Your Drone Journey!<br/><br/>
</h3>
          <form>
            <div className='form-group'>
              <label className=''>Email:</label>
              <input
                className='form-control'
                value={email}
                onChange={handleChange("email")}
                type='email'
              />
            </div><br/>
            <div className='form-group'>
              <label className=''>Password:</label>
              <input
                className='form-control'
                value={password}
                onChange={handleChange("password")}
                type='password'
              />
            </div>
            <br/>
            <br />
            <button onClick={onSubmit} className='btn btn-success w-100'>
              Signin
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title='' description='Sign-in to an existing Account'>
      <div style={{marginTop:"7%"}}>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      </div>
      
      
    </Base>
  );
};

export default Signin;
