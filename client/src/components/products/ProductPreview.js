import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeChart } from "../../actions/saleActions";

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

  render() {
    const { product } = this.props;
    const images = (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
      >
        <div>
          <img
            src={
              product.images.length > 1
                ? product.images[1].url
                : product.images[0].url
            }
            alt={product.name}
          />
        </div>
        <div>
          <img src={product.images[0].url} alt={product.name} />
        </div>
      </ReactCardFlip>
    );
    const price =
      Math.round((product.price / 100 + Number.EPSILON) * 100) / 100;

    const saleInfo = this.props.saleInfo ? (
      <div>
        <h5>Profit: {this.props.saleInfo.profit} $</h5>
        <h5>Quantity: {this.props.saleInfo.quantity} $</h5>
      </div>
    ) : null;

    // TODO: refactor column params to List, so they can be passed as props
    return (
      <div
        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 p-2"
        onMouseLeave={this.handleFlip}
        onPointerEnter={this.handleFlip}
      >
        {/* TODO: remove link style */}
        <Link
          to={`/products/${this.props.product._id}`}
          className="text-decoration-none"
        >
          <div className="border border-info rounded">
            {images}
            <div className="container">
              <h5 className="text-truncate">{product.name}</h5>
              <h6 className="text-truncate">by {product.user.name}</h6>
              <h4>{price}$</h4>
              {saleInfo}
            </div>
          </div>
        </Link>
        {this.props.saleInfo ? (
          <button onClick={this.handleSalesDisplay.bind(this, product._id)}>
            Display
          </button>
        ) : null}
      </div>
    );
  }
}

ProductPreview.propTypes = {
  changeChart: PropTypes.func.isRequired,
};

export default connect(null, {
  changeChart,
})(withRouter(ProductPreview));
