import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStores } from "../../actions/storeActions";
import StorePreview from "./StorePreview";
import StoreList from "./StoreList";

import loading from "../common/loading-prod.gif";

class Stores extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    this.setState({ loading: true });
    this.props.getStores();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  render() {
    const { stores } = this.props.stores;
    let storeItems;

    if (stores === null || this.state.loading) {
      storeItems = <img src={loading} alt="Loading..." />;
    } else {
      if (stores.length > 0) {
        storeItems = <StoreList stores={stores} type={this.props.type} />;
      } else {
        storeItems = <h4>No Stores found...</h4>;
      }
    }

    return (
      <div className="stores">
        <h3 className="container pl-2 mt-4">Explore Stores</h3>
        <div>{storeItems}</div>
      </div>
    );
  }
}

Stores.propTypes = {
  getStores: PropTypes.func.isRequired,
  stores: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stores: state.storeStore,
});

export default connect(mapStateToProps, { getStores })(Stores);
