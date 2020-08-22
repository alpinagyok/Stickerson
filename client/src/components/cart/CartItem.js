import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  addToCart,
  removeFromCart,
  decreaseQuantityInCart,
} from "../../actions/cartActions";

class CartItem extends Component {
  handleRemove = (id) => {
    this.props.removeFromCart(id);
  };

  handleDecrease = (id) => {
    this.props.decreaseQuantityInCart(id);
  };

  handleIncrease = (product) => {
    this.props.addToCart(product);
  };

  render() {
    const { product } = this.props;
    const price = (
      Math.round(
        ((product.price * product.quantity) / 100 + Number.EPSILON) * 100
      ) / 100
    ).toFixed(2);

    const cols = "col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12";

    return (
      <div className="row no-gutter mb-4">
        <Link
          to={`/products/${this.props.product.id}`}
          className="text-decoration-none col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"
        >
          <img
            className="rounded border"
            src={product.image}
            alt={product.name}
            // className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"
          />
        </Link>
        <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-6 mt-2">
          <div className="row">
            <div className="col-11">
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
                <div className={cols}>
                  <div className="row">
                    <h3
                      onClick={this.handleDecrease.bind(this, product.id)}
                      className="col-4 btn text-center font-weight-bold p-0 pt-1"
                    >
                      -
                    </h3>
                    <h4 className="col-4 text-center">{product.quantity}</h4>
                    <h3
                      onClick={this.handleIncrease.bind(this, product)}
                      className="col-4 btn text-center font-weight-bold p-0 pt-1"
                    >
                      +
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1">
              <div className="row">
                <div className={cols}>
                  <button
                    onClick={this.handleRemove.bind(this, product.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  decreaseQuantityInCart: PropTypes.func.isRequired,
};

export default connect(null, {
  addToCart,
  removeFromCart,
  decreaseQuantityInCart,
})(withRouter(CartItem));

// col - xl - 3 col - lg - 3 col - md - 4 col - sm - 6 col - 6 p - 2
