import React, { Component } from "react";
import { Link } from "react-router-dom";

class OrderedProduct extends Component {
  render() {
    const { product } = this.props;
    const price =
      Math.round(
        ((product.price * product.quantity) / 100 + Number.EPSILON) * 100
      ) / 100;

    // TODO: refactor column params to List, so they can be passed as props
    return (
      <div className="row no-gutter border">
        <Link
          to={`/products/${this.props.product.id}`}
          className="text-decoration-none col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"
        >
          <img
            src={product.image}
            alt={product.name}
            // className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"
          />
        </Link>
        <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6">
          <div className="row">
            <h5 className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              {product.name}
            </h5>
            <h4 className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              {price}$
            </h4>
            <h4 className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              {product.quantity}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderedProduct;
