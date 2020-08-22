import React, { Component } from "react";
import Products from "./Products";

class ProductsPage extends Component {
  render() {
    return (
      <div>
        <h2 className="container pl-2 mt-2">Explore Products</h2>
        <Products />
        <div className="pt-2"></div>
      </div>
    );
  }
}

export default ProductsPage;
