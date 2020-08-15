import React, { Component } from "react";
import Modal from "react-modal";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createReview, deleteReview } from "../../actions/reviewActions";

import ReactStars from "react-stars";

class CreateReview extends Component {
  state = {
    heading: "",
    text: "",
    stars: "0",
    errors: {},
  };

  componentWillMount() {
    Modal.setAppElement("body");
    const { reviews } = this.props.product;

    for (let i in reviews) {
      if (reviews[i].user._id === this.props.auth.user.id) {
        this.setState({
          heading: reviews[i].heading,
          text: reviews[i].text,
          stars: reviews[i].stars,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      heading: this.state.heading,
      text: this.state.text,
      stars: String(this.state.stars),
    };

    this.props.createReview(
      reviewData,
      this.props.product._id,
      this.props.closeModal
    );
  };

  handleDelete = (id) => {
    this.props.deleteReview(id);
    this.setState({ heading: "", text: "", stars: "" });
  };

  // handleStarChange = (i) => {
  //   console.log(i);
  //   this.setState({ stars: i });
  // };

  ratingChanged = (newRating) => {
    this.setState({ stars: newRating });
  };

  render() {
    const { errors } = this.state;

    // let stars = [];
    // let i = 0;
    // while (i < this.state.stars) {
    //   stars.push(
    //     <i className="fas fa-star" onClick={console.log(i)} key={i} />
    //   );
    //   i++;
    // }
    // while (i < 5) {
    //   stars.push(
    //     <i
    //       className="far fa-star"
    //       onClick={() => this.setState({ stars: i })}
    //       key={i}
    //     />
    //   );
    //   i++;
    // }

    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Heading of the product"
              name="heading"
              value={this.state.heading}
              onChange={this.onChange}
              error={errors.heading}
              info="Choose a heading that best represents your review"
            />
            <TextFieldGroup
              placeholder="* Review text"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text}
              info="A unique text for your review"
            />
            {errors.stars && <h6>{errors.stars}</h6>}
            <ReactStars
              count={5}
              onChange={this.ratingChanged}
              size={30}
              value={this.state.stars}
              half={false}
              color2={"#ffd700"}
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
          {errors.notbought && <h6>{errors.notbought}</h6>}
          <button
            className="btn btn-danger"
            onClick={this.props.closeModal.bind(this)}
          >
            Close
          </button>
          <button
            onClick={this.handleDelete.bind(this, this.props.product._id)}
            className="btn btn-md btn-danger"
          >
            Delete Review
          </button>
        </Modal>
      </div>
    );
  }
}

CreateReview.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorsStore,
  auth: state.authStore,
});

export default connect(mapStateToProps, {
  createReview,
  deleteReview,
})(withRouter(CreateReview));
