import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getMyStore, getStoreByHandle } from "../../actions/storeActions";

import Loading from "../common/loading-prod.gif";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";
import CreateStore from "../forms/CreateStore";
import MyStoreHeader from "./MyStoreHeader";
import Products from "../products/Products";
import MyProducts from "../products/MyProducts";

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

    if (this.state.loading)
      storeContent = <img src={Loading} alt="loading"></img>;
    else if (storeInfo === null) {
      if (this.props.match.params.handle) this.props.history.push("/not-found");
      else storeContent = <CreateStore />;
    } else {
      storeContent = (
        <div>
          {this.props.match.params.handle ? (
            <StoreHeader store={storeInfo} />
          ) : (
            <MyStoreHeader />
          )}
          <div className="container pl-2 my-2">
            <div className="row">
              <div className="col">
                <h2 className="text-truncate">{storeInfo.name}</h2>
              </div>
              {this.props.match.params.handle ? null : (
                <div className="col-auto">
                  <div className="float-right">
                    <HashLink
                      smooth
                      className="btn btn-md btn-outline-info mr-2"
                      to="/profile#store_settings"
                    >
                      Edit
                    </HashLink>
                    <Link
                      to="/create-product"
                      className="btn btn-md btn-outline-primary"
                    >
                      New Product
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {this.props.match.params.handle ? (
            <Products store={storeInfo._id} />
          ) : (
            <MyProducts />
          )}

          {/* <div className="container"> */}
          <StoreFooter store={storeInfo} />
          {/* </div> */}
        </div>
      );
    }

    return <div>{storeContent}</div>;
  }
}

StoreFull.propTypes = {
  getMyStore: PropTypes.func.isRequired,
  getStoreByHandle: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  store: state.storeStore,
});

export default connect(mapStateToProps, { getMyStore, getStoreByHandle })(
  StoreFull
);
