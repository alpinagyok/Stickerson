import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is_empty";

import {
  getProduct,
  createPrint,
  deleteProduct,
} from "../../actions/productActions";

import { addToCart } from "../../actions/cartActions";

import ReactCardFlip from "react-card-flip";
import loading_gif from "../common/loading-prod.gif";

import { Link } from "react-router-dom";
import EditProduct from "../forms/EditProduct";
import ReviewList from "../reviews/ReviewList";
import CreateReview from "../reviews/CreateReview";

class ProductFull extends Component {
  state = {
    loading: false,
    printTaskLoading: false,
    isFlipped: false,
    isModalOpen: false,
    isReviewModalOpen: false,
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
    const result = window.confirm(
      "Are you sure you want do delete this product?"
    );
    if (result) {
      this.props.deleteProduct(id, this.props.history);
    }
  };

  handleEditButton = (id) => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  handleReviewButton = (id) => {
    this.setState((prevState) => ({
      isReviewModalOpen: !prevState.isReviewModalOpen,
    }));
  };

  handleAddToCartButton = (product) => {
    const item = {
      id: product._id,
      name: product.name,
      image: product.images[0].url,
      price: product.price,
    };
    this.props.addToCart(item);
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
            <button
              onClick={this.handleEditButton.bind(this, product._id)}
              className="btn btn-md btn-primary mr-2"
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

      const reviewModal = this.props.auth.isAuthenticated ? (
        <div className="col-12 mb-4">
          <div className="row">
            <div className="col-12">
              <button
                onClick={this.handleReviewButton.bind(this, product._id)}
                className="col-12 btn btn-md btn-outline-primary"
              >
                Review
              </button>
            </div>
          </div>
          <CreateReview
            isOpen={this.state.isReviewModalOpen}
            closeModal={this.handleReviewButton}
            product={product}
          />
        </div>
      ) : null;

      productContent = (
        <div className="row">
          <div className="col-md-8 px-0 mb-3" onClick={this.handleFlip}>
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
            <h1 className="text-break mb-0 small-line">
              {product.name} Sticker
            </h1>
            <h3>
              <small>Made by </small>
              {product.user.name}
            </h3>

            <h1 className="font-weight-bold my-2">{price}$</h1>
            <h5 className="text-break mb-3 font-weight-light">
              {product.description}
            </h5>

            <button
              onClick={this.handleAddToCartButton.bind(this, product)}
              className="btn btn-md btn-danger"
            >
              <i className="fas fa-cart-plus" /> Add to Cart
            </button>
            <hr />
            <p className="mb-1">
              Added on {String(product.date).split("T")[0]}
            </p>
            <div>
              Visit{" "}
              <Link to={`/stores/${product.store.handle}`}>
                {product.store.name}
              </Link>{" "}
              for more
            </div>
            {ownerButtons ? <hr /> : null}
            {ownerButtons}
          </div>

          <ReviewList product={product} />
          {reviewModal}
        </div>
      );

      // productContent = reviewModal;
    }

    return <div className="container mt-lg-4 mt-md-3">{productContent}</div>;
  }
}

ProductFull.propTypes = {
  getProduct: PropTypes.func.isRequired,
  createPrint: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
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
  addToCart,
})(ProductFull);
