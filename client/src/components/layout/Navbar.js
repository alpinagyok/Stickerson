import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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

    let avatar;
    if (user.avatar) {
      avatar = user.avatar.url;
    }

    const { cart } = this.props;
    const cart_nav = (
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          <i className="fa fa-shopping-cart" value={5} />
          {cart.count !== 0 ? (
            <span className="badge badge-warning">{cart.count}</span>
          ) : null}
        </Link>
      </li>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {cart_nav}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="rounded-circle"
              src={avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="AAAAA"
            />
            Profile
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="nav-item">
              <Link className="dropdown-item" to="/mystore">
                My Store
              </Link>
            </li>
            <li className="nav-item">
              <Link className="dropdown-item" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="/profile">
              Orders
            </Link>
            <HashLink
              smooth
              className="dropdown-item"
              to="/profile#user_settings"
            >
              Profile Settings
            </HashLink>
            <HashLink
              smooth
              className="dropdown-item"
              to="/profile#store_settings"
            >
              Store Settings
            </HashLink>
            <div class="dropdown-divider"></div>
            <Link to="/" onClick={this.onLogoutClick} className="dropdown-item">
              Logout
            </Link>
          </div>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        {cart_nav}
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
              <li className="nav-item">
                <Link className="nav-link" to="/stores">
                  {" "}
                  Stores
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
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authStore,
  cart: state.cartStore,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
