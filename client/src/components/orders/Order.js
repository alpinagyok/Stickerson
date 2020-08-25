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
      this.props.history.push("/profile");
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
      <div className="container mt-3">
        <Link className="link-no-style" to="/profile">
          <i className="fas fa-2x fa-arrow-left" />
        </Link>
        <div className="row justify-content-center mb-3">
          <h3 className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
            Order <small>#{order._id}</small>
          </h3>
        </div>
        {productItems}
        <hr />
        <div className="text-center">
          <h4 className="font-weight-light">Items: {itemTotal.toFixed(2)}$</h4>
          <h4 className="font-weight-light">
            Shipping: {delivery.toFixed(2)}$
          </h4>
          <h4>Total: {(itemTotal + delivery).toFixed(2)}$</h4>
        </div>
        <hr />
        <div className="text-center">
          <h4 className="font-weight-light">Country: {address.country}</h4>
          <h4 className="font-weight-light">City: {address.city}</h4>
          <h4 className="font-weight-light">Street: {address.street}</h4>
        </div>
        <hr />
        <div className="text-center pb-3">
          <h4 className="font-weight-light">
            Ordered on {String(order.date).split("T")[0]}
          </h4>
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
