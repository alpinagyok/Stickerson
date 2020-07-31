import React, { Component } from "react";
import CartItem from "./CartItem";

class CartItemList extends Component {
  render() {
    const { products } = this.props;

    const productItems = products.map((product) => (
      <CartItem key={product._id} product={product} />
    ));

    const cartView = <div className="container">{productItems}</div>;

    return <div>{cartView}</div>;
  }
}

export default CartItemList;
