import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getAllSales } from "../../actions/saleActions";
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

    // // If the store is not yet loaded and we create new product, the store won't be null, so validate like this
    // if (
    //   this.props.products.myProducts === null ||
    //   !this.props.products.myProductsLoaded
    // ) {
    //   this.props.getMyProducts();
    //   this.setState({ loadingProducts: true });
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.products.myProductsLoaded)
  //     this.setState({
  //       loadingProducts: false,
  //     });
  // }

  render() {
    const data = [
      {
        name: "Page A",
        uv: 4000,
        bv: 3000,
      },
      {
        name: "Page B",
        uv: 3000,
      },
      {
        name: "Page C",
        uv: 2000,
      },
    ];

    return (
      <div>
        <Chart data={data} />
        <Table data={this.props.sales.allSales} />
        <MyProducts />
      </div>
    );
  }
}

Dashboard.propTypes = {
  sales: PropTypes.object.isRequired,
  // products: PropTypes.object.isRequired,
  getAllSales: PropTypes.func.isRequired,
  // getMyProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sales: state.saleStore,
  // products: state.productStore,
});

export default connect(mapStateToProps, { getAllSales, getMyProducts })(
  Dashboard
);
