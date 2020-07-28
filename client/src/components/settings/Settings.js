import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserSettings from "./UserSettings";
import EditStore from "../forms/EditStore";

class Settings extends Component {
  render() {
    return (
      <div>
        <UserSettings />
        <EditStore />
      </div>
    );
  }
}

export default Settings;
