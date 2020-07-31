import React, { Component } from "react";
import CartItemList from "./CartItemList";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Cart extends Component {
  render() {
    return (
      <div>
        <CartItemList products={this.props.cart} />
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cartStore,
});

export default connect(mapStateToProps, {})(Cart);
