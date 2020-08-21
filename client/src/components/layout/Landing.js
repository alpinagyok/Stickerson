import React, { Component } from "react";
import { Link } from "react-router-dom";
import Products from "../products/Products";
import Stores from "../stores/Stores";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing m-lg-5 m-md-3">
          {/* <img src="./img/showcase.jpg" alt=""></img> */}
          <div className="landing-centered">
            <h1 className="font-weight-bold text-light">
              Find you Sticker, Son
            </h1>
          </div>
        </div>
        <h3 className="container pl-2 mt-4">Shop Products</h3>
        <Products type="horizontal" />
        <hr />
        <h3 className="container pl-2 mt-4">Feautured Stores</h3>
        <Stores type="horizontal" />
        <hr />
        <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign Up
        </Link>
        <Link to="/login" className="btn btn-lg btn-light">
          Login
        </Link>
        <hr />
      </div>
    );
  }
}

export default Landing;
