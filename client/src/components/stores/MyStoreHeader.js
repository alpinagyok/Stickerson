import React, { Component } from "react";
import isEmpty from "../../validation/is_empty";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import loading from "../common/background_sending.gif";

import { changeBackground } from "../../actions/storeActions";

class MyStoreHeader extends Component {
  state = {
    imageSending: false,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.myStore) {
      this.setState({ imageSending: false });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeFile = (e) => {
    this.setState({ imageSending: true });
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    this.props.changeBackground(formData);
  };
  render() {
    // const { store } = this.props;
    const store = this.props.store.myStore;
    const { user } = store;
    const { errors } = this.state;

    return (
      <div>
        <div className="store-background m-lg-5 m-md-3">
          <img
            // className="store-background"
            src={this.state.imageSending ? loading : store.backgroundImg.url}
            alt=""
          ></img>
          <div className="store-image-change">
            {/* TODO: button doesn't scale */}
            <label className="btn btn-primary d-flex justify-content-center d-md-table mx-auto">
              Change Background
              <input
                type="file"
                name="image"
                onChange={this.onChangeFile}
                hidden
              />
            </label>
            {/* TODO: make prettier */}
            {errors.image ? <h1>{errors.image}</h1> : null}
          </div>
          <div className="store-user-info">
            <img className="rounded-circle" src={user.avatar.url} alt="" />
            <h3>{user.name}</h3>
          </div>
        </div>
        {/* TODO: refactor */}
        <div style={{ height: "100px" }}></div>
      </div>
    );
  }
}

MyStoreHeader.propTypes = {
  changeBackground: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  store: state.storeStore,
  errors: state.errorsStore,
});

export default connect(mapStateToProps, { changeBackground })(MyStoreHeader);
