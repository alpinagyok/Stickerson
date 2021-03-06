import React, { Component } from "react";
import Modal from "react-modal";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { editProduct } from "../../actions/productActions";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

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
      price: String((this.props.product.price / 100).toFixed(2)),
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
      price: String(Math.round(this.state.price * 100)),
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
        <Modal
          className="container centered-modal py-4 bg-white"
          isOpen={this.props.isOpen}
        >
          <div className="col-12">
            <button
              className="btn btn-outline-danger float-right mb-4"
              onClick={this.props.closeModal.bind(this)}
            >
              <i className="fas fa-times"></i>
            </button>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Name of the product"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
                info="Choose a name that best represents your product"
              />
              <TextAreaFieldGroup
                placeholder="* Product description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="A unique description of your product"
              />
              <TextFieldGroup
                placeholder="* Price (e.g. 6.99)"
                name="price"
                value={this.state.price}
                onChange={this.onChange}
                error={errors.price}
                info="Damn that's expensive"
              />
              <input
                type="submit"
                value="Save changes"
                className="btn btn-outline-primary btn-block mt-4"
              />
            </form>
          </div>
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
