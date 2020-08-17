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
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="row">
                <button
                  onClick={this.handleDecrease.bind(this, product.id)}
                  className="col-4"
                >
                  -
                </button>
                <h4 className="col-4">{product.quantity}</h4>
                <button
                  onClick={this.handleIncrease.bind(this, product)}
                  className="col-4"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={this.handleRemove.bind(this, product.id)}
              className="btn btn-danger btn-sm col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12"
            >
              X
            </button>
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
