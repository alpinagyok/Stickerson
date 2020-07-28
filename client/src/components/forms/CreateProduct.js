import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createProduct } from "../../actions/productActions";

import loading from "../common/background_sending.gif";

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
    formData.append("price", this.state.price);

    console.log(formData);

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
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <label className="btn btn-primary btn-lg">
            Choose Image
            <input
              type="file"
              name="image"
              onChange={this.onChangeFile}
              hidden
            />
          </label>
          {errors.image ? <span>{errors.image}</span> : null}
          <TextFieldGroup
            placeholder="* Name of the product"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            info="Choose a name that best represents your product"
          />
          {/* TODO: change field to be bigger */}
          <TextFieldGroup
            placeholder="* Product description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            info="A unique description of your product"
          />
          {/* TODO: change to numbers only */}
          <TextFieldGroup
            placeholder="* Price"
            name="price"
            value={this.state.price}
            onChange={this.onChange}
            error={errors.price}
            info="Damn that's expensive"
          />
          {this.state.loading ? (
            <img src={loading} alt="loading..."></img>
          ) : (
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          )}
        </form>
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
