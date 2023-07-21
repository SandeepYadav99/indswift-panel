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

function SlabGraph({ dataValues }) {
  return (
    <LineChart
      width={800}
      height={600}
      data={[...dataValues].slice(0, 13)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="level" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="linear"
        dataKey="percentage"
        stroke="#F4881B"
        activeDot={{ r: 8 }}
        name=""
        strokeWidth={2}
      />
    </LineChart>
  );
}

export default SlabGraph;
