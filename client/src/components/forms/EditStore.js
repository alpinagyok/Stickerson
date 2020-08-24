import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is_empty";

import loading from "../common/loading-bar-full.gif";

import { Link } from "react-router-dom";

import {
  createStore,
  getMyStore,
  getMyLoadedStore,
} from "../../actions/storeActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EditStore extends Component {
  state = {
    website: "",
    location: "",
    name: "",
    bio: "",
    errors: {},
    loading: true,
  };

  componentWillMount() {
    // If store is not in redux, load it
    if (this.props.store.myStore === "empty") this.props.getMyStore();
    // can use WillReceiveProps with this
    else this.props.getMyLoadedStore();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    this.setState({ loading: false });

    if (nextProps.store.myStore) {
      const { myStore } = nextProps.store;

      // If myStore field doesn't exist, make empty string
      myStore.website = !isEmpty(myStore.website) ? myStore.website : "";
      myStore.location = !isEmpty(myStore.location) ? myStore.location : "";
      myStore.bio = !isEmpty(myStore.bio) ? myStore.bio : "";

      // Set component fields state
      this.setState({
        name: myStore.name,
        handle: myStore.handle,
        website: myStore.website,
        location: myStore.location,
        bio: myStore.bio,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const storeData = {
      handle: this.props.store.myStore.handle,
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

    let editForm = (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="* Name of the store"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          error={errors.name}
          info="Choose a name that best represents your store"
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
          value="Save Changes"
          className="btn btn-outline-primary btn-block mt-4"
        />
      </form>
    );

    if (this.props.store.myStore === null)
      editForm = (
        <div>
          <h5>You don't have a store yet</h5>
          <Link
            to="/mystore"
            className="btn btn-lg btn-block btn-outline-primary"
          >
            Create Store
          </Link>
        </div>
      );

    return (
      <div className="pb-4">
        <h2 className="mb-4" id="store_settings">
          Edit Store
        </h2>
        {this.state.loading ? (
          <div>
            <img src={loading} alt="Loading..." />
          </div>
        ) : (
          editForm
        )}
      </div>
    );
  }
}

EditStore.propTypes = {
  errors: PropTypes.object.isRequired,
  createStore: PropTypes.func.isRequired,
  getMyStore: PropTypes.func.isRequired,
  getMyLoadedStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errorsStore,
  store: state.storeStore,
});

export default connect(mapStateToProps, {
  createStore,
  getMyStore,
  getMyLoadedStore,
})(withRouter(EditStore));
