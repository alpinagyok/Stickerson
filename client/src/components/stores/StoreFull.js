import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getMyStore } from "../../actions/storeActions";

import default_avatar from "../common/default_avatar.png";
import isEmpty from "../../validation/is_empty";

import Loading from "../common/Loading";

class StoreFull extends Component {
  state = {
    loading: false,
  };

  // Load store
  componentWillMount() {
    if (this.props.store.myStore === "empty") {
      this.props.getMyStore();
      this.setState({ loading: true });
    }
  }

  // stop loading when myStore is loaded
  componentWillReceiveProps(nextProps) {
    if (nextProps.store.myStore) {
      this.setState({ loading: false });
    }
  }

  render() {
    let foundStore;
    const { myStore } = this.props.store;

    if (this.state.loading) foundStore = <Loading size="20px" />;
    else if (myStore === null)
      foundStore = (
        <div>
          <h1>No store</h1>
        </div>
      );
    else {
      // In case updating user's name is added in the future, we use auth store here
      const { user } = this.props.auth;

      foundStore = (
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img
                    className="rounded-circle"
                    src={user.avatar.url}
                    alt=""
                  />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{user.name}</h1>
                <p className="lead text-center">{myStore.name}</p>
                <p>
                  {isEmpty(myStore.location) ? null : `${myStore.location}`}
                </p>
                <p>
                  {isEmpty(myStore.website) ? null : (
                    <a
                      className="text-white p-2"
                      // this works weirdly, not entirely sure
                      href={`http://${myStore.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                  )}
                </p>
                <p>{isEmpty(myStore.bio) ? null : `${myStore.bio}`}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Link to="/settings">Settings</Link>
        <Link to="/mystore">Store</Link>
        <h1>My Store</h1>
        {foundStore}
      </div>
    );
  }
}

StoreFull.propTypes = {
  getMyStore: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // errors: state.errorsStore,
  store: state.storeStore,
  auth: state.authStore,
});

export default connect(mapStateToProps, { getMyStore })(StoreFull);
