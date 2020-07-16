import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import default_avatar from "../common/default_avatar.png";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    // TODO: Clear store
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // console.log(user);             // {}
    // console.log(user.avatar);      // undefined
    // console.log(user.avatar.url);  // error
    let avatar;
    if (user.avatar) {
      if (user.avatar.url === null) {
        avatar = default_avatar;
      } else {
        avatar = user.avatar.url;
      }
    }

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <a href="/" onClick={this.onLogoutClick} className="nav-link">
          <img
            className="rounded-circle"
            src={avatar}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px" }}
            title="AAAAA"
          />
          Logout
        </a>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            StickerSon
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  {" "}
                  Products
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authStore,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);