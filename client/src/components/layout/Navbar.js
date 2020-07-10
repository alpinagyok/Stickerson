import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    // TODO: Clear store
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <a href="/" onClick={this.onLogoutClick} className="nav-link">
        <img
          className="rounded-circle"
          src={user.avatar}
          alt={user.name}
          style={{ width: "25px", marginRight: "5px" }}
          title="AAAAA"
        />
        Logout
      </a>
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

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
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
