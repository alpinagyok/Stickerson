import React, { Component } from "react";
import Modal from "react-modal";
import TextFieldGroup from "../common/TextFieldGroup";

import classnames from "classnames";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createReview, deleteReview } from "../../actions/reviewActions";

import ReactStars from "react-stars";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

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
    this.props.deleteReview(id, this.props.closeModal);
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
        <Modal
          className="container centered-modal py-4 bg-white"
          isOpen={this.props.isOpen}
        >
          <div className="col-12">
            <button
              className="btn btn-outline-danger float-right mb-4"
              onClick={this.props.closeModal.bind(this)}
            >
              <h2 className="fas fa-times"></h2>
            </button>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Heading of the product"
                name="heading"
                value={this.state.heading}
                onChange={this.onChange}
                error={errors.heading}
                info="Choose a heading that best represents your review"
              />
              <TextAreaFieldGroup
                placeholder="* Review text"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
                info="Describe your experience with the product"
              />
              <ReactStars
                className={classnames("", {
                  "border rounded border-danger pl-2": errors.stars,
                })}
                count={5}
                onChange={this.ratingChanged}
                size={30}
                value={this.state.stars}
                half={false}
                color2={"#ffd700"}
              />
              {errors.stars && (
                <small className="form-text text-danger">{errors.stars}</small>
              )}
              <div className="container row p-0 m-0 mt-4">
                <div className="col-8 p-0 pr-2">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-outline-primary col-12"
                  />
                </div>
                <button
                  onClick={this.handleDelete.bind(this, this.props.product._id)}
                  className="btn btn-md btn-outline-danger col-4"
                >
                  Delete Review
                </button>
              </div>
            </form>
            {errors.notbought && (
              <span className="form-text text-danger text-center mt-2">
                {errors.notbought}
              </span>
            )}
          </div>
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
