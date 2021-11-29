import React from "react";
import { theme } from "@chakra-ui/theme";
import { Transaction } from "types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

type ChartProps = {
  monthlyTotal: any;
};

const TransactionsChartView = ({ monthlyTotal }: ChartProps) => {
  return (
    <BarChart
      width={1000}
      height={500}
      data={monthlyTotal}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="in" fill={theme.colors.green[500]} />
      <Bar dataKey="out" fill={theme.colors.red[500]} />
    </BarChart>
  );
};

export default TransactionsChartView;
