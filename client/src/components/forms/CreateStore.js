import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createStore } from "../../actions/storeActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CreateStore extends Component {
  state = {
    handle: "",
    website: "",
    location: "",
    name: "",
    bio: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const storeData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      name: this.state.name,
      bio: this.state.bio,
    };

    this.props.createStore(storeData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container mt-3 pb-4">
        <h2 className="my-4 display-4 text-center">Create Store</h2>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="* Name of the store"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
            info="Choose a name that best represents your store"
          />
          <TextFieldGroup
            placeholder="* Store Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            info="A unique handle for your store URL. Cannot be changed!!"
          />
          {/* TODO: change to bigger input */}
          <TextAreaFieldGroup
            placeholder="Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            info="Please write the story of how you started creating designs"
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
            info="Could be your own website or a social media link"
          />
          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            info="City or country"
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-outline-primary btn-block mt-4"
          />
        </form>
      </div>
    );
  }
}

CreateStore.propTypes = {
  errors: PropTypes.object.isRequired,
  createStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorsStore,
});

export default connect(mapStateToProps, { createStore })(
  withRouter(CreateStore)
);
