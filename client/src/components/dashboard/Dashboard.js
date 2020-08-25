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
      <div className="container p-0">
        <h2 className="pl-2 mt-2 mb-2">Dashboard</h2>
        <div className="row no-gutters">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="row no-gutters">
              <div className="col-12 chart-container">
                <Chart data={chartInfo} />
              </div>
              <div className="col-12">
                <div className="container">
                  <h4 className="text-truncate">
                    Total Sales: {allSales ? allSales.length : 0}
                  </h4>
                  <button
                    className="btn btn-outline-primary col-12"
                    onClick={this.showAllSales}
                  >
                    Show All Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <h4 className="container pl-2 mt-4 text-truncate">Your Products</h4>
            <div className="container">
              <div className="row">
                <MyProducts saleInfo={this.props.sales.productsTotalSales} />
              </div>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <div className="container mt-4">
          {!allSales || allSales.length === 0 ? null : (
            <Table data={tableInfo} />
          )}
        </div>
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
