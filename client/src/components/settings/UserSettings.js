import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeAvatar } from "../../actions/authActions";
import classnames from "classnames";

import loading from "../common/loading.gif";

class UserSettings extends Component {
  state = {
    avatarSending: false,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
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
        {errors.image ? <span>{errors.image}</span> : null}
      </div>
    );
  }
}

UserSettings.propTypes = {
  changeAvatar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authStore,
  errors: state.errorsStore,
});

export default connect(mapStateToProps, { changeAvatar })(UserSettings);
