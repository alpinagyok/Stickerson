import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeAvatar } from "../../actions/authActions";

import loading from "./loading.gif";

class UserSettings extends Component {
  state = {
    selectedFile: null,
    avatarSending: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user) {
      this.setState({ avatarSending: false });
    }
  }

  onChangeFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onSubmit = () => {
    this.setState({ avatarSending: true });
    const formData = new FormData();
    formData.append("image", this.state.selectedFile);
    this.props.changeAvatar(formData);
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <img
          className="rounded-circle"
          src={this.state.avatarSending ? loading : user.avatar.url}
          alt={user.name}
          style={{ width: "200px", marginRight: "5px" }}
          title="AAAAA"
        />

        <h1 className="center red-text">React Image Upload</h1>
        <div className="file-field input-field">
          <div className="btn">
            <span>Browse</span>
            <input type="file" name="image" onChange={this.onChangeFile} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <div className="center">
          <button onClick={this.onSubmit} className="btn center">
            Change Avatar
          </button>
        </div>
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
