import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserSettings from "./UserSettings";
import EditStore from "./EditStore";

class Settings extends Component {
  render() {
    return (
      <div>
        <Link to="/settings">Settings</Link>
        <Link to="/mystore">Store</Link>

        <UserSettings />
        <EditStore />
      </div>
    );
  }
}

export default Settings;
