import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is_empty";

import { getProduct } from "../../actions/productActions";
import productReducer from "../../reducers/productReducer";

class ProductFull extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products.product) this.setState({ loading: false });
  }

  render() {
    const { product } = this.props.products;

    let productContent;
    if (this.state.loading) productContent = <h1>Loading</h1>;
    else if (isEmpty(product)) productContent = <h1>No product found</h1>;
    else
      productContent = (
        <div>
          <img src={product.images[0].url} alt={product.name} />
          <h1>{product.name}</h1>
          <h1>{product.description}</h1>
          <h1>{product.price}</h1>
        </div>
      );

    return <div className="container">{productContent}</div>;
  }
}

ProductFull.propTypes = {
  getProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productStore,
});

export default connect(mapStateToProps, { getProduct })(ProductFull);
