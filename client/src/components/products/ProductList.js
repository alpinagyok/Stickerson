import React, { Component } from "react";
import ProductPreview from "./ProductPreview";

class ProductList extends Component {
  render() {
    const { products } = this.props;
    const productItems = products.map((product) => (
      <ProductPreview key={product._id} product={product} />
    ));

    let productsView;
    if (this.props.type === "all")
      productsView = (
        <div className="container">
          <div className="row">{productItems}</div>
        </div>
      );

    return <div>{productsView}</div>;
  }
}

export default ProductList;
