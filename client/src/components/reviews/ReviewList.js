import React, { Component } from "react";
import CreateReview from "./CreateReview";
import Review from "./Review";

class ReviewList extends Component {
  state = {
    isModalOpen: false,
  };

  handleReviewButton = (id) => {
    this.setState((prevState) => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { product } = this.props;

    const reviewItems = product.reviews.map((review) => (
      <Review key={review._id} review={review} />
    ));

    return (
      <div>
        <div className="container">
          <div className="row">{reviewItems}</div>
        </div>

        {/* <button
          onClick={this.handleReviewButton.bind(this, product._id)}
          className="btn btn-md btn-primary"
        >
          Review
        </button> */}
        {/* <CreateReview
          isOpen={this.state.isModalOpen}
          closeModal={this.handleReviewButton}
          product={product}
        /> */}
      </div>
    );
  }
}

export default ReviewList;
