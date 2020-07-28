import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is_empty";

import { getProduct, createPrint } from "../../actions/productActions";

class ProductFull extends Component {
  state = {
    loading: false,
  };

  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    const { product } = nextProps.products;
    if (product) {
      this.setState({ loading: false });
      if (product.images.length === 1) {
        console.log("Creating print");
        console.log(product.images[0].url);
        this.props.createPrint({ url: product.images[0].url }, product._id);
      }
    }
  }

  render() {
    const { product } = this.props.products;

    let productContent;
    if (this.state.loading) productContent = <h1>Loading</h1>;
    else if (isEmpty(product)) productContent = <h1>No product found</h1>;
    else {
      const secondImg =
        product.images.length == 2 ? (
          <img src={product.images[1].url} alt={product.name} />
        ) : null;

      productContent = (
        <div>
          <img src={product.images[0].url} alt={product.name} />
          {secondImg}
          <h1>{product.name}</h1>
          <h1>{product.description}</h1>
          <h1>{product.price}</h1>
        </div>
      );
    }
    return <div className="container">{productContent}</div>;
  }
}

ProductFull.propTypes = {
  getProduct: PropTypes.func.isRequired,
  createPrint: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productStore,
});

export default connect(mapStateToProps, { getProduct, createPrint })(
  ProductFull
);
