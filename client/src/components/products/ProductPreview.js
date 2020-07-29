import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductPreview extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.history.push(`/products/${this.props.product._id}`);
  };

  render() {
    const { product } = this.props;
    const image =
      product.images.length > 1 ? product.images[1].url : product.images[0].url;
    const price =
      Math.round((product.price / 100 + Number.EPSILON) * 100) / 100;

    return (
      <div
        onClick={this.handleClick}
        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6"
      >
        <img src={image} alt="Product Image"></img>
        <h6>Made by {product.user.name}</h6>
        <h6>{price}$</h6>
      </div>
    );
  }
}

export default withRouter(ProductPreview);
