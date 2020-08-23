import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserSettings from "./UserSettings";
import EditStore from "../forms/EditStore";
import Orders from "../orders/Orders";

class Settings extends Component {
  render() {
    return (
      <div className="container px-2 mt-2">
        <h2>Orders</h2>
        <Orders />
        {/* <div className="container"> */}
        <hr />
        {/* </div> */}
        <UserSettings />
        {/* <div className="container"> */}
        <hr />
        {/* </div> */}
        <EditStore />
      </div>
    );
  }
}

export default Settings;
