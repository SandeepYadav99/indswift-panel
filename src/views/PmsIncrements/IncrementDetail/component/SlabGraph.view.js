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
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="linear"
        dataKey="normalized"
        stroke="#2005A2"
        activeDot={{ r: 8 }}
        name="Normalizes"
        strokeWidth={2}
      />
    </LineChart>
  );
}

export default SlabGraph;
