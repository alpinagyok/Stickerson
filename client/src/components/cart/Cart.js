import React, { Component } from "react";
import CartItemList from "./CartItemList";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createOrder } from "../../actions/orderActions";

import TextFieldGroup from "../common/TextFieldGroup";

import { Link } from "react-router-dom";
import NotFound from "../not-found/NotFound";

import Loading from "../common/Loading";

class Cart extends Component {
  state = {
    country: "",
    city: "",
    street: "",
    phone: "",
    deliveryPrice: "400", // TODO: calculate

    loading: false,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const address = {
      country: this.state.country,
      city: this.state.city,
      street: this.state.street,
    };

    const { cart } = this.props;

    const orderData = {
      products: cart.items,
      address,
      phone: this.state.phone,
      deliveryPrice: "500",
      itemsPrice: cart.total,
    };

    this.props.createOrder(orderData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const itemTotal = Number(this.props.cart.total) / 100;
    const delivery = Number(this.state.deliveryPrice) / 100;

    const prices = (
      <div className="text-center">
        <h4 className="font-weight-light">Items: {itemTotal.toFixed(2)}$</h4>
        <h4 className="font-weight-light">Shipping: {delivery.toFixed(2)}$</h4>
        <h4>Total: {(itemTotal + delivery).toFixed(2)}$</h4>
      </div>
    );
    const noItems = <NotFound />;

    const orderForm = (
      <form onSubmit={this.onSubmit}>
        <h3 className="text-center font-weight-light mb-4">
          Please provide shipping details
        </h3>
        <TextFieldGroup
          placeholder="* Country"
          name="country"
          value={this.state.country}
          onChange={this.onChange}
          error={errors.country}
          info="Choose a country of residence"
        />
        <TextFieldGroup
          placeholder="* City"
          name="city"
          value={this.state.city}
          onChange={this.onChange}
          error={errors.city}
          info="Choose a city of residence"
        />
        <TextFieldGroup
          placeholder="* Street"
          name="street"
          value={this.state.street}
          onChange={this.onChange}
          error={errors.street}
          info="Choose a street of residence"
        />
        <TextFieldGroup
          placeholder="* Phone"
          name="phone"
          value={this.state.phone}
          onChange={this.onChange}
          error={errors.phone}
          info="Please enter phone number"
        />
        {this.state.loading ? (
          <Loading />
        ) : (
          <input
            type="submit"
            value="Order"
            className="btn btn-lg btn-outline-primary btn-block mt-4"
          />
        )}
      </form>
    );

    const login = (
      <div className="row">
        <div className="col-md-12 text-center">
          <Link to="/register" className="btn btn-md btn-primary mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-md btn-outline-primary">
            Login
          </Link>
        </div>
      </div>
    );

    const orderInfo = this.props.auth.isAuthenticated ? orderForm : login;

    return (
      <div>
        <h2 className="container pl-2 mt-3 mb-4">Shopping Cart</h2>
        <CartItemList products={this.props.cart.items} />
        {this.props.errors.productsnotfound && (
          <h5>{this.props.errors.productsnotfound}</h5>
        )}
        <div className="container">
          {this.props.cart.items.length < 1 ? (
            noItems
          ) : (
            <div>
              <hr />
              {prices}
              <hr className="mb-4" />
              <div className="pb-4">{orderInfo}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cartStore,
  errors: state.errorsStore,
  auth: state.authStore,
});

export default connect(mapStateToProps, { createOrder })(Cart);
