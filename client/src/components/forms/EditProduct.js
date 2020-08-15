import React, { Component } from "react";
import Modal from "react-modal";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { editProduct } from "../../actions/productActions";

import isEmpty from "../../validation/is_empty";

class EditProduct extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    errors: {},
  };

  componentWillMount() {
    Modal.setAppElement("body");
    this.setState({
      name: this.props.product.name,
      description: this.props.product.description,
      price: String(this.props.product.price),
    });
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

    const prodData = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
    };

    this.props.editProduct(
      this.props.product._id,
      prodData,
      this.props.closeModal
    );
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Modal isOpen={this.props.isOpen}>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Name of the product"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              info="Choose a name that best represents your product"
            />
            <TextFieldGroup
              placeholder="* Product description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="A unique description of your product"
            />
            <TextFieldGroup
              placeholder="* Price"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              error={errors.price}
              info="Damn that's expensive"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
          <button
            className="btn btn-danger"
            onClick={this.props.closeModal.bind(this)}
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

EditProduct.propTypes = {
  errors: PropTypes.object.isRequired,
  editProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorsStore,
  // product: state.productStore,
});

export default connect(mapStateToProps, {
  editProduct,
})(withRouter(EditProduct));
