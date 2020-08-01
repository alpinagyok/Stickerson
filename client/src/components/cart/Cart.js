import React, { Component } from "react";
import CartItemList from "./CartItemList";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createOrder } from "../../actions/orderActions";

import TextFieldGroup from "../common/TextFieldGroup";
import loading from "../common/loading-prod.gif";

class Cart extends Component {
  state = {
    country: "",
    city: "",
    street: "",
    phone: "",
    deliveryPrice: "4", // TODO: calculate

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

    const orderData = {
      products: this.props.cart,
      address,
      phone: this.state.phone,
      deliveryPrice: this.state.deliveryPrice,
    };

    this.props.createOrder(orderData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <CartItemList products={this.props.cart} />
        <div className="container">
          <form onSubmit={this.onSubmit}>
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
              <img src={loading} alt="loading..."></img>
            ) : (
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  createOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cartStore,
  errors: state.errorsStore,
});

export default connect(mapStateToProps, { createOrder })(Cart);
