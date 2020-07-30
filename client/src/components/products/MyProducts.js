import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyProducts } from "../../actions/productActions";
import ProductPreview from "./ProductPreview";
import ProductList from "./ProductList";

class MyProducts extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    if (this.props.products.myProducts === null) {
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
      productItems = <h1>Loading Products</h1>;
    } else {
      if (myProducts.length > 0) {
        productItems = (
          <ProductList products={myProducts} type={this.props.type} />
        );
      } else {
        productItems = <h4>No products found...</h4>;
      }
    }

    return (
      <div className="products">
        <div className="container">
          <div className="row">{productItems}</div>
        </div>
      </div>
    );
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
