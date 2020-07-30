import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";

class ProductPreview extends Component {
  state = {
    isFlipped: false,
  };

  handleFlip = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
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
              <h5>{product.name}</h5>
              <h6>by {product.user.name}</h6>
              <h4>{price}$</h4>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(ProductPreview);
