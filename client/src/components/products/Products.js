import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, getProductsByStore } from "../../actions/productActions";
import ProductPreview from "./ProductPreview";
import ProductList from "./ProductList";

import loading from "../common/loading-prod.gif";

class Products extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    this.setState({ loading: true });
    if (this.props.store) this.props.getProductsByStore(this.props.store);
    else this.props.getProducts();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  render() {
    const { products } = this.props.products;
    let productItems;

    if (products === null || this.state.loading) {
      productItems = <img src={loading} alt="Loading..." />;
    } else {
      if (products.length > 0) {
        productItems = (
          <ProductList products={products} type={this.props.type} />
        );
      } else {
        productItems = <h4>No products found...</h4>;
      }
    }

    return (
      <div className="products">
        <div>{productItems}</div>
      </div>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getProductsByStore: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productStore,
});

export default connect(mapStateToProps, { getProducts, getProductsByStore })(
  Products
);
