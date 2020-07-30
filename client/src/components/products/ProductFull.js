import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is_empty";

import {
  getProduct,
  createPrint,
  deleteProduct,
} from "../../actions/productActions";

import ReactCardFlip from "react-card-flip";
import loading_gif from "../common/loading-prod.gif";

import { Link } from "react-router-dom";
import EditProduct from "../forms/EditProduct";

class ProductFull extends Component {
  state = {
    loading: false,
    printTaskLoading: false,
    isFlipped: false,
    isModalOpen: false,
    errors: {},
  };

  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, printTaskLoading: false });

    const { product } = nextProps.products;
    if (!isEmpty(product) && product !== this.props.products.product) {
      if (product.images.length === 1) {
        this.setState({ printTaskLoading: true });
        this.props.createPrint({ url: product.images[0].url }, product._id);
      }
    }
    if (!isEmpty(nextProps.errors)) {
      this.setState({ errors: nextProps.errors, printTaskLoading: false });
    }
  }

  handleFlip = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  handleDelete = (id) => {
    // e.preventDefault();
    this.props.deleteProduct(id, this.props.history);
  };

  handleEditButton = (id) => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { product } = this.props.products;

    let productContent;
    if (this.state.loading)
      productContent = (
        <div>
          <div className="col-md-8" onClick={this.handleFlip}>
            <ReactCardFlip
              isFlipped={this.state.isFlipped}
              flipDirection="horizontal"
            >
              <div>
                <img src={loading_gif} alt="Loading Gif" />
              </div>

              <div>
                <img src={loading_gif} alt="Loading Gif" />
              </div>
            </ReactCardFlip>
          </div>
          <div className="col-md-4">
            {/* TODO: cool loading fields */}
            {/* <h1>Loading Product</h1> */}
          </div>
        </div>
      );
    else if (isEmpty(product)) productContent = <h1>No product found</h1>;
    // Loaded Product
    else {
      const ownerButtons =
        product.user._id === this.props.auth.user.id ? (
          <div className="col-12 text-right">
            <hr />
            <button
              onClick={this.handleEditButton.bind(this, product._id)}
              className="btn btn-md btn-primary"
            >
              Edit
            </button>
            <button
              onClick={this.handleDelete.bind(this, product._id)}
              className="btn btn-md btn-danger"
            >
              Delete
            </button>
            <EditProduct
              isOpen={this.state.isModalOpen}
              closeModal={this.handleEditButton}
              product={product}
            />
          </div>
        ) : null;

      let secondImg;
      if (product.images.length === 2)
        secondImg = <img src={product.images[1].url} alt={product.name} />;
      else if (this.state.printTaskLoading)
        secondImg = <img src={loading_gif} alt="Loading Gif" />;
      else secondImg = <img src={product.images[0].url} alt={product.name} />;

      const price =
        Math.round((product.price / 100 + Number.EPSILON) * 100) / 100;

      productContent = (
        <div className="row">
          <div className="col-md-8" onClick={this.handleFlip}>
            <ReactCardFlip
              isFlipped={this.state.isFlipped}
              flipDirection="horizontal"
            >
              <div>{secondImg}</div>
              <div>
                <img src={product.images[0].url} alt={product.name} />
              </div>
            </ReactCardFlip>
            {this.state.errors.error ? (
              <span>Cannot load print, please try again later</span>
            ) : null}
          </div>
          <div className="col-md-4">
            <h1>{product.name} Sticker</h1>
            <h3>Made by {product.user.name}</h3>
            <div>
              Visit{" "}
              <Link to={`/stores/${product.store.handle}`}>
                {product.store.name}
              </Link>{" "}
              for more
            </div>
            <h1>{price}$</h1>
            <h5>{product.description}</h5>
            <button className="btn btn-md btn-danger">Add to Cart</button>
          </div>
          {ownerButtons}
        </div>
      );
    }

    return <div className="container mt-2 mt-lg-4">{productContent}</div>;
  }
}

ProductFull.propTypes = {
  getProduct: PropTypes.func.isRequired,
  createPrint: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.productStore,
  errors: state.errorsStore,
  auth: state.authStore,
});

export default connect(mapStateToProps, {
  getProduct,
  createPrint,
  deleteProduct,
})(ProductFull);
