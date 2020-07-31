import React, { Component } from "react";
import isEmpty from "../../validation/is_empty";

class StoreFooter extends Component {
  render() {
    const { store } = this.props;
    const { user } = store;

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="text-center">
                <p className="lead text-center">{store.name}</p>
                <p>{isEmpty(store.location) ? null : `${store.location}`}</p>
                <p>
                  {isEmpty(store.website) ? null : (
                    <a
                      className="text-white p-2"
                      // this works weirdly, not entirely sure
                      href={`http://${store.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )}
                </p>
                <p>{isEmpty(store.bio) ? null : `${store.bio}`}</p>
                <p>Opened on {String(store.date).split("T")[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreFooter;
