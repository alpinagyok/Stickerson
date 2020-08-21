import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class StorePreview extends Component {
  render() {
    const { store } = this.props;
    const { user } = store;

    // TODO: refactor column params to List, so they can be passed as props
    return (
      <div
        className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12
         p-2"
      >
        <Link
          to={`/stores/${this.props.store.handle}`}
          className="text-decoration-none"
        >
          <div className="border border-info rounded">
            <div className="store-background">
              <img src={store.backgroundImg.url} alt="Background"></img>
              <div className="store-user-info-preview">
                <img
                  className="rounded-circle border border-2"
                  src={user.avatar.url}
                  alt=""
                  style={{ width: "70px" }}
                />
                <h4 className="text-truncate">{store.name}</h4>
                <h6 className="text-truncate">by {user.name}</h6>
                <div></div>
                <button className="btn btn-primary btn-md">View Store</button>
              </div>
            </div>
            <div style={{ height: "150px" }}></div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(StorePreview);
