import React, { Component } from "react";
import isEmpty from "../../validation/is_empty";

class StoreHeader extends Component {
  render() {
    const { store } = this.props;
    const { user } = store;

    return (
      <div>
        <div className="store-background m-lg-5 m-md-3">
          <img
            // className="store-background"
            src={store.backgroundImg.url}
            alt=""
          ></img>
          <div className="store-user-info">
            <img
              className="rounded-circle border border-3"
              src={user.avatar.url}
              alt=""
              style={{ width: "100px" }}
            />
            <h3>{user.name}</h3>
          </div>
        </div>
        {/* TODO: refactor */}
        <div style={{ height: "100px" }}></div>
      </div>
    );
  }
}

export default StoreHeader;
