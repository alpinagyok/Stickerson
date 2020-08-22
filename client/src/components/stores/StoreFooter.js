import React, { Component } from "react";
import isEmpty from "../../validation/is_empty";

class StoreFooter extends Component {
  render() {
    const { store } = this.props;
    const { user } = store;

    return (
      <div className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body my-3">
                <div className="text-center">
                  <h5 className="mb-1 lead text-center">{store.name} Store</h5>
                  <h6>
                    {isEmpty(store.location) ? null : `${store.location}`}
                  </h6>
                  <h6>
                    {isEmpty(store.website) ? null : (
                      <a
                        className="text-dark p-2"
                        // this works weirdly, not entirely sure
                        href={`http://${store.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-globe fa-2x"></i>
                      </a>
                    )}
                  </h6>
                  <h6>{isEmpty(store.bio) ? null : `${store.bio}`}</h6>
                  <h6>
                    <small>Opened on {String(store.date).split("T")[0]}</small>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreFooter;
