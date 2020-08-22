import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeChart } from "../../actions/saleActions";
import { addToCart } from "../../actions/cartActions";

class ProductPreview extends Component {
  state = {
    isFlipped: false,
  };

  handleFlip = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  handleSalesDisplay = (id) => {
    this.props.changeChart(id);
  };

  handleCart = (id) => {
    const { _id, name, images, price } = this.props.product;

    const item = {
      id: _id,
      name,
      image: images[0].url,
      price,
    };
    this.props.addToCart(item);
  };

  render() {
    const { product } = this.props;
    const images = (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
      >
        <div>
          <img
            className="rounded"
            src={
              product.images.length > 1
                ? product.images[1].url
                : product.images[0].url
            }
            alt={product.name}
          />
        </div>
        <div>
          <img
            className="rounded"
            src={product.images[0].url}
            alt={product.name}
          />
        </div>
      </ReactCardFlip>
    );
    const price =
      Math.round((product.price / 100 + Number.EPSILON) * 100) / 100;

    const prod = this.props.saleInfo ? (
      <div>
        <Link
          to={`/products/${this.props.product._id}`}
          className="text-decoration-none link-no-style"
        >
          <div>
            {images}
            <div className="pt-2">
              <div>
                <h5 className="text-truncate">{product.name}</h5>
              </div>
            </div>
          </div>
        </Link>
        <div
          onClick={this.handleSalesDisplay.bind(this, product._id)}
          className="pt-3"
        >
          <div className="row">
            <h5 className="col-6 text-center text-truncate">
              <i className="fas fa-hand-holding-usd" />{" "}
              {this.props.saleInfo.profit}$
            </h5>
            <h5 className="col-6 text-center text-truncate">
              <i className="fas fa-gift" /> {this.props.saleInfo.quantity}
            </h5>
          </div>
          <h4 className="btn btn-outline-primary float-center col-12">
            Show Sales
          </h4>
        </div>
      </div>
    ) : (
      <div>
        <Link
          to={`/products/${this.props.product._id}`}
          className="text-decoration-none link-no-style"
        >
          <div>
            {images}
            <div className="pt-2">
              <div>
                <h5 className="mb-0 text-truncate">{product.name}</h5>
                <h6 className="text-truncate">By {product.user.name}</h6>
              </div>
            </div>
          </div>
        </Link>
        <div>
          <h4 className="d-inline">{price.toFixed(2)}$</h4>
          <button
            onClick={this.handleCart.bind(this, product)}
            className="float-right btn btn-outline-primary btn-sm"
          >
            +
          </button>
        </div>
      </div>
    );

    const cols = this.props.cols
      ? this.props.cols
      : "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6";

    // TODO: refactor column params to List, so they can be passed as props
    // className = "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 px-1 py-2";
    return (
      <div
        className={cols + " px-1 py-2"}
        onMouseLeave={this.handleFlip}
        onPointerEnter={this.handleFlip}
      >
        {prod}
      </div>
    );
  }
}

ProductPreview.propTypes = {
  changeChart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default connect(null, {
  changeChart,
  addToCart,
})(withRouter(ProductPreview));
