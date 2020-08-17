import React, { Component } from "react";
import { Link } from "react-router-dom";

class OrderPreview extends Component {
  render() {
    const { order } = this.props;

    const itemTotal = Number(order.itemsPrice) / 100;
    const delivery = Number(order.deliveryPrice) / 100;

    const { address } = order;

    return (
      <div className="container border border-info rounded">
        <Link to={`/orders/${order._id}`}>
          <div className="text-center">
            <h3>Items: {itemTotal.toFixed(2)}$</h3>
            <h3>Shipping: {delivery.toFixed(2)}$</h3>
            <h3>Total: {(itemTotal + delivery).toFixed(2)}$</h3>
            <h3>Ordered on {String(order.date).split("T")[0]}</h3>
          </div>
          <div className="text-center">
            <h2>Address</h2>
            <h3>Country: {address.country}</h3>
            <h3>City: {address.city}</h3>
            <h3>Street: {address.street}</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default OrderPreview;
