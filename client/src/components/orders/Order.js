import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Orders from "./Orders";
import OrderedProduct from "./OrderedProduct";
import { Link } from "react-router-dom";

class Order extends Component {
  render() {
    const { orders } = this.props.orders;
    let order;
    const orderId = this.props.match.params.id;

    for (let i in orders) {
      if (orders[i]._id === orderId) order = orders[i];
    }

    // Redux didn't load orders yet. Don't want to find individual ones by id
    if (!order) {
      this.props.history.push("/orders");
      return <Orders />;
    }

    const { products } = order;

    // product.product is the actual id of the product
    const productItems = products.map((product) => (
      <OrderedProduct key={product.product} product={product} />
    ));
    const itemTotal = Number(order.itemsPrice) / 100;
    const delivery = Number(order.deliveryPrice) / 100;

    const { address } = order;

    return (
      <div className="container">
        <Link to="/orders">
          <i className="fas fa-2x fa-arrow-left" />
        </Link>
        <h1>Order</h1>
        {productItems}
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
      </div>
    );
  }
}

Order.propTypes = {
  orders: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orderStore,
});

export default connect(mapStateToProps, {})(Order);
