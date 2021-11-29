import React from "react";
import { Box } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";
import { Transaction } from "types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

type ChartProps = {
  monthlyTotal: any;
};

const TransactionsChartView = ({ monthlyTotal }: ChartProps) => {
  return (
    <Box width={1000} maxW="100%" overflow="auto">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={monthlyTotal}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" tickMargin={10} style={{ fill: "white" }} />
          <YAxis type="number" tickMargin={10} style={{ fill: "white" }} />
          <Tooltip
            contentStyle={{ background: "black", fontWeight: "bold" }}
            formatter={(value: any) =>
              value.toString().replace("-", "") + " ETH"
            }
          />
          <Legend wrapperStyle={{ paddingTop: 20 }} />
          <ReferenceLine y={0} stroke="#777" />
          <Bar radius={6} dataKey="in" fill={theme.colors.green[500]} />
          <Bar radius={6} dataKey="out" fill={theme.colors.red[500]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionsChartView;
