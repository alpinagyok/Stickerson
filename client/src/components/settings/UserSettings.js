import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  changeAvatar,
  changeUserInfo,
  deleteUser,
} from "../../actions/authActions";
import classnames from "classnames";

import loading from "../common/loading.gif";
import TextFieldGroup from "../common/TextFieldGroup";

class UserSettings extends Component {
  state = {
    avatarSending: false,
    name: this.props.auth.user.name,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.user.avatar !== nextProps.auth.user.avatar) {
      this.setState({ avatarSending: false });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeFile = (e) => {
    this.setState({ avatarSending: true });
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.props.changeAvatar(formData);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
    };
    this.props.changeUserInfo(userData);
  };

  onDeleteHandler = () => {
    const result = window.confirm(
      "Are you sure you want do delete your account?"
    );
    if (result) {
      this.props.deleteUser();
    }
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div className="container">
        <h1>User Settings</h1>
        <img
          className="rounded-circle"
          src={this.state.avatarSending ? loading : user.avatar.url}
          alt={user.name}
          style={{ width: "200px", marginRight: "5px" }}
          title="AAAAA"
        />
        <label className="btn btn-primary btn-lg">
          Change Avatar
          <input type="file" name="image" onChange={this.onChangeFile} hidden />
        </label>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            type="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
        <button
          onClick={this.onDeleteHandler}
          className="btn btn-md btn-danger"
        >
          Delete
        </button>
        {errors.image ? <span>{errors.image}</span> : null}
      </div>
    );
  }
}

UserSettings.propTypes = {
  changeAvatar: PropTypes.func.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authStore,
  errors: state.errorsStore,
});

export default connect(mapStateToProps, {
  changeAvatar,
  changeUserInfo,
  deleteUser,
})(UserSettings);
