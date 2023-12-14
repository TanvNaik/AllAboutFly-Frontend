import React from "react";
import Nav from "./nav";
import "../styles.css";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

const Base = ({ children }) => {
  return (
    <div>
      {/* <!-- Start Header Area --> */}
      <header className="header_area sticky-header">
        <div className="main_menu">
          <Nav />
        </div>
      </header>
      {/* <!-- End Header Area --> */}

      <div className="bg-dark" style={{minHeight:"100vh"}}>{children}</div>
      {/* <!-- start footer Area --> */}
      <footer className="footer-area section_gap pb-3">
        <hr className="footer-hr" />

        <div className="container">
          <div className="row">
            <div className="col-lg-4  col-md-7 col-sm-7">
              <div className="single-footer-widget">
                <h6>About Us</h6>
                <p>
                  Every dream is based on creativity. Every concept and
                  innovative development that alters the course of history
                  begins with the creative vision of gifted creators. At AAF, we
                  provide these creators with the resources they require to
                  bring into reality their ideas.
                </p>
              </div>
            </div>

            <div className="col-lg-5  col-md-8 col-sm-3">
              <div className="single-footer-widget mail-chimp text-center">
                <h6 className="mb-20">Terms and Condition</h6>
                <ul className="instafeed d-flex flex-wrap justify-content-center">
                  <li>
                    <Link className="nav-link" to="/terms-conditions">
                      Policies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6>Follow Us</h6>
                <p>Let us be social</p>
                <div className="footer-social d-flex align-items-center">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                 
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap ">
            <p className="footer-text m-0 p-3">
              Copyright &copy; 2023 &nbsp;
              <i className="fa fa-heart-o" aria-hidden="true">
                {" "}
                &nbsp; All About Fly
              </i>{" "}
              &nbsp;| All rights reserved
            </p>
          </div>
        </div>
      </footer>
      {/* <!-- End footer Area --> */}
    </div>
  );
};

export default Base;
