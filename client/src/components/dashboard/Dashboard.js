import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getAllSales,
  mapSalesToProducts,
  changeChart,
} from "../../actions/saleActions";
import { getMyProducts } from "../../actions/productActions";
import Chart from "./Chart";
import Table from "./Table";
import MyProducts from "../products/MyProducts";

class Dashboard extends Component {
  state = {
    loadingProducts: false,
    loadingSales: false,
  };

  componentWillMount() {
    if (this.props.sales.allSales === null) this.props.getAllSales();
  }

  componentWillReceiveProps(nextProps) {
    // Make sure that both sales and products are loaded for this
    if (
      nextProps.products.myProducts &&
      nextProps.sales.allSales &&
      this.props.sales.salesByProducts === null
    ) {
      // TODO: runs twice for some reason
      this.props.mapSalesToProducts(this.props.sales.allSales);
    }
  }

  showAllSales = () => {
    this.props.changeChart("all");
  };

  render() {
    const {
      chartId,
      allSalesMap,
      allSales,
      salesByProducts,
      salesByProductsMap,
    } = this.props.sales;

    const tableInfo = chartId === "all" ? allSales : salesByProducts[chartId];
    const chartInfo =
      chartId === "all" ? allSalesMap : salesByProductsMap[chartId];

    return (
      <div>
        <Chart data={chartInfo} />
        <button onClick={this.showAllSales}>All</button>
        <Table data={tableInfo} />
        <MyProducts saleInfo={this.props.sales.productsTotalSales} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  sales: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  getAllSales: PropTypes.func.isRequired,
  mapSalesToProducts: PropTypes.func.isRequired,
  changeChart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sales: state.saleStore,
  products: state.productStore,
});

export default connect(mapStateToProps, {
  getAllSales,
  mapSalesToProducts,
  getMyProducts,
  changeChart,
})(Dashboard);
