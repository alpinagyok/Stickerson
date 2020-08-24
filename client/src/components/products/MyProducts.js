import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyProducts } from "../../actions/productActions";
import ProductList from "./ProductList";

import loading from "../common/loading-prod.gif";

class MyProducts extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    // If the store is not yet loaded and we create new product, the store won't be null, so validate like this
    if (
      this.props.products.myProducts === null ||
      !this.props.products.myProductsLoaded
    ) {
      this.props.getMyProducts();
      this.setState({ loading: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  render() {
    const { myProducts } = this.props.products;
    let productItems;

    if (myProducts === null || this.state.loading) {
      productItems = <img src={loading} alt="loading..."></img>;
    } else {
      if (myProducts.length > 0) {
        productItems = (
          <ProductList
            products={myProducts}
            type={this.props.type}
            saleInfo={this.props.saleInfo}
          />
        );
      } else {
        productItems = <h4>No products found...</h4>;
      }
    }

    return <div className="products">{productItems}</div>;
  }
}

MyProducts.propTypes = {
  getMyProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productStore,
});

export default connect(mapStateToProps, { getMyProducts })(MyProducts);
