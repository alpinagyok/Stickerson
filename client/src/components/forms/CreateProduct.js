import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { createProduct } from "../../actions/productActions";

import loading from "../common/loading-bar.gif";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CreateProduct extends Component {
  state = {
    image: null,
    name: "",
    description: "",
    price: "",
    errors: {},
    loading: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    // rissssky. hopefully nothing bad happens
    formData.append("price", Math.round(this.state.price * 100));

    this.props.createProduct(formData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeFile = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container mt-3">
        <Link className="link-no-style" to="/mystore">
          <i className="fas fa-lg fa-arrow-left" />
          <h4 className="d-inline"> Back to the store</h4>
        </Link>
        <h2 className="my-4 display-4 text-center">Create Product</h2>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label className="btn btn-primary btn-lg btn-block mb-1">
              Choose Image
              <input
                type="file"
                name="image"
                onChange={this.onChangeFile}
                hidden
              />
            </label>
            {errors.image && (
              <small className="form-text text-danger">{errors.image}</small>
            )}
          </div>
          <TextFieldGroup
            placeholder="* Name of the product"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            info="Choose a name that best represents your product"
          />
          {/* TODO: change field to be bigger */}
          <TextAreaFieldGroup
            placeholder="* Product description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            info="A unique description of your product"
          />
          <TextFieldGroup
            placeholder="* Price (e.g 6.99)"
            name="price"
            value={this.state.price}
            onChange={this.onChange}
            error={errors.price}
            info="Please enter your profit margin. Base pay of 5$ will be added to the total price"
          />
          {this.state.loading ? (
            <div className="btn btn-outline-primary btn-block mt-4">
              <img
                style={{ width: "66px" }}
                src={loading}
                alt="loading..."
              ></img>
            </div>
          ) : (
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-primary btn-block mt-4"
            />
          )}
        </form>
        {errors.nostore && <h3>{errors.nostore}</h3>}
      </div>
    );
  }
}

CreateProduct.propTypes = {
  errors: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorsStore,
});

export default connect(mapStateToProps, { createProduct })(
  withRouter(CreateProduct)
);
