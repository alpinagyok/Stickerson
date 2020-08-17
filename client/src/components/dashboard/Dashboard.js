import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAllSales } from "../../actions/saleActions";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getAllSales();
  }

  render() {
    return <div></div>;
  }
}

Dashboard.propTypes = {
  sales: PropTypes.object.isRequired,
  getAllSales: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sales: state.saleStore,
});

export default connect(mapStateToProps, { getAllSales })(Dashboard);
