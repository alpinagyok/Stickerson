import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getMyStore, getStoreByHandle } from "../../actions/storeActions";
import isEmpty from "../../validation/is_empty";

import Loading from "../common/Loading";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import CreateStore from "../forms/CreateStore";
import MyStoreHeader from "./MyStoreHeader";

// Maybe divide into 2 components again? It will be easier to history.push()
class StoreFull extends Component {
  state = {
    loading: false,
  };

  // store and myStore are practically the same. I want to leave myStore in memory separately so it won't need reloading
  componentWillMount() {
    // If this is from /store/:handle, load store
    if (this.props.match.params.handle) {
      // Won't reload store if you still have old one in redux
      if (this.props.store.store.handle !== this.props.match.params.handle) {
        this.props.getStoreByHandle(this.props.match.params.handle);
        this.setState({ loading: true });
      }
      // Else work with myStore
    } else {
      if (this.props.store.myStore === "empty") {
        this.props.getMyStore();
        this.setState({ loading: true });
      }
    }
  }

  // stop loading when store is loaded
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  // if my: myStore; else: store
  render() {
    let storeContent;
    // Chekc if we're working with myStore or store
    let storeInfo;
    if (this.props.match.params.handle) storeInfo = this.props.store.store;
    else storeInfo = this.props.store.myStore;

    if (this.state.loading) storeContent = <Loading size="20px" />;
    else if (storeInfo === null) {
      if (this.props.match.params.handle)
        storeContent = (
          <div className="container">
            <h1>No store found</h1>
          </div>
        );
      else storeContent = <CreateStore />;
    } else {
      storeContent = (
        <div>
          {this.props.match.params.handle ? (
            <StoreHeader store={storeInfo} />
          ) : (
            <MyStoreHeader />
          )}
          <div className="container">
            <h1>{storeInfo.name}</h1>
            {/* redo to button or load component */}
            {this.props.match.params.handle ? null : (
              <Link to="/settings">Edit</Link>
            )}
            {/* TODO: Products (List) */}
            <StoreFooter store={storeInfo} />
          </div>
        </div>
      );
    }

    return <div>{storeContent}</div>;
  }
}

StoreFull.propTypes = {
  getMyStore: PropTypes.func.isRequired,
  getStoreByHandle: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // errors: state.errorsStore,
  store: state.storeStore,
});

export default connect(mapStateToProps, { getMyStore, getStoreByHandle })(
  StoreFull
);
