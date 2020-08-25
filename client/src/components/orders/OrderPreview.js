import React, { Component } from "react";
import { Link } from "react-router-dom";

class OrderPreview extends Component {
  render() {
    const { order } = this.props;

    const itemTotal = (Number(order.itemsPrice) / 100).toFixed(2);

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
                  <i className="fas fa-gifts float-right mt-2"></i>
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
                  <h6 className="text-truncate">
                    <small>{itemTotal}$</small>
                  </h6>
                </div>

                <div className="col-3">
                  <i className="fas fa-arrow-right mt-3"></i>
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
