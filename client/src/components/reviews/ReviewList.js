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
      <div className="container my-4">
        <h4 className="text-truncate">{reviewItems.length} Reviews</h4>
        <div className="row">{reviewItems}</div>
      </div>
    );
  }
}

export default ReviewList;
