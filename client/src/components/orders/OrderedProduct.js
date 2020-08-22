import React, { Component } from "react";
import { Link } from "react-router-dom";

class OrderedProduct extends Component {
  render() {
    const { product } = this.props;
    const price =
      Math.round(
        ((product.price * product.quantity) / 100 + Number.EPSILON) * 100
      ) / 100;

    const cols = "col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12";

    return (
      <div className="row no-gutter mb-4 justify-content-center">
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
          <div className="row no-gutter">
            <Link
              to={`/products/${this.props.product.product}`}
              className="text-decoration-none col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"
            >
              <img
                className="rounded border"
                src={product.image}
                alt={product.name}
                // className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"
              />
            </Link>
            <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6">
              <div className="row">
                <h5
                  className={
                    cols + " text-lg-center text-xl-center text-break p-0 pr-2"
                  }
                >
                  {product.name}
                </h5>
                <h4
                  className={
                    cols +
                    " text-lg-center text-xl-center p-0 pr-2 font-weight-bold mb-3"
                  }
                >
                  {price}$
                </h4>
                <h4 className={cols + "text-lg-center text-xl-center p-0 pr-2"}>
                  Quantity: {product.quantity}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderedProduct;
