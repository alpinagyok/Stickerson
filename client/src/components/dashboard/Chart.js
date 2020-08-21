import React, { Component } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

class Chart extends Component {
  render() {
    const data = this.props.data
      ? Object.keys(this.props.data).map((date) => {
          return {
            name: date,
            Profit: this.props.data[date][0].toFixed(2),
            Sales: this.props.data[date][1],
          };
        })
      : null;

    return (
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 15,
            right: 10,
            left: -10,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Sales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Profit" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;
