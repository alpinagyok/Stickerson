import React, { Component } from "react";
import { Link } from "react-router-dom";

class OrderPreview extends Component {
  render() {
    const { order } = this.props;

    const itemTotal = Number(order.itemsPrice) / 100;
    const delivery = Number(order.deliveryPrice) / 100;

    const { address } = order;

    return (
      <div className="pl-2">
        <hr />
        <Link
          className="text-decoration-none link-no-style"
          to={`/orders/${order._id}`}
        >
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-2 p-0">
                  <h5 className="fas fa-gifts float-right mt-2"></h5>
                </div>

                <div className="col-10">
                  <h6 className="mb-0">Delivered</h6>
                  <h6 className="text-truncate">
                    <small>#{order._id}</small>
                  </h6>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="row">
                <div className="col-9">
                  <h6 className="mb-0">{String(order.date).split("T")[0]}</h6>
                  <h6>
                    <small>{itemTotal}$</small>
                  </h6>
                </div>

                <div className="col-3">
                  <h5 className="fas fa-arrow-right mt-3"></h5>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default OrderPreview;
