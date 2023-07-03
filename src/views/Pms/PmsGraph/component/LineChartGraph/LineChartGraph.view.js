import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function LineChartGraph({dataValues}) {
  return (
    <LineChart
      width={800}
      height={600}
      data={dataValues}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="key"/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="linear"
        dataKey="normalized"
        stroke="#2005A2"
        activeDot={{ r: 8 }}
        name="Normalizes"
      />
      <Line type="linear" dataKey="received" stroke="#F4881B" name="As Recieved"/>
    </LineChart>
  );
}

export default LineChartGraph;
