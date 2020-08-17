import React, { Component } from "react";
import { Link } from "react-router-dom";

class Table extends Component {
  render() {
    let processedData = [];
    for (let i in this.props.data) {
      const sale = this.props.data[i];
      const price =
        Math.round(
          ((sale.price * sale.quantity) / 100 + Number.EPSILON) * 100
        ) / 100;

      // Hardcoded 500 - 5$ comission
      const profit =
        Math.round(
          (((sale.price - 500) * sale.quantity) / 100 + Number.EPSILON) * 100
        ) / 100;

      processedData.push(
        <tr>
          <th scope="row">{Number(i) + 1}</th>
          <td>
            <Link to={`/products/${sale.product}`}>{sale.product}</Link>
          </td>
          <td>{sale.quantity}</td>
          <td>{price.toFixed(2)} $</td>
          <td>{profit.toFixed(2)} $</td>
          <td>{sale.date}</td>
        </tr>
      );
    }

    return (
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product ID</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col">Profit</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>{processedData}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
