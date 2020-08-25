import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getOrders } from "../../actions/orderActions";
import OrderPreview from "./OrderPreview";

import loading from "../common/loading-prod.gif";
import NotFound from "../not-found/NotFound";

class Orders extends Component {
  state = {
    loading: false,
    orderId: "",
  };

  componentWillMount() {
    // If the orders are not yet loaded and we create new order, the orders won't be null, so validate like this
    if (this.props.orders.orders === null || !this.props.orders.loaded) {
      this.props.getOrders();
      this.setState({ loading: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  render() {
    const { orders } = this.props.orders;

    let orderItems;

    if (orders === null || this.state.loading) {
      orderItems = <img src={loading} alt="Loading..." />;
    } else {
      if (orders.length > 0) {
        orderItems = orders.map((order) => (
          <OrderPreview key={order._id} order={order} />
        ));
        if (orders.length > 2) {
          const firstItems = orderItems.slice(0, 2);
          const lastItems = orderItems.slice(2);

          orderItems = (
            <div>
              {firstItems}
              <div class="collapse" id="collapseExample">
                {lastItems}
              </div>
              <hr />
              <div className="row justify-content-center">
                <div className="col-8">
                  <a
                    class="btn btn-outline-primary btn-block"
                    data-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Show More
                  </a>
                </div>
              </div>
            </div>
          );
        }
      } else {
        orderItems = <NotFound />;
      }
    }

    return <div className="mt-1">{orderItems}</div>;
  }
}

Orders.propTypes = {
  orders: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orderStore,
});

export default connect(mapStateToProps, { getOrders })(Orders);
