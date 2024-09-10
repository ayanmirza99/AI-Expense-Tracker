import React from "react";
import { Triangle } from "react-loader-spinner";
import {
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const BarChart = ({ budgetList }) => {

  return (
    <div className="w-full flex flex-col md:p-4">
      <div className="p-2 md:p-0">
        <h1 className="text-2xl font-semibold">Activity</h1>
      </div>
      <ResponsiveContainer width={"100%"} height={350}>
        {budgetList.length > 0 ? (
          <RechartsBarChart data={budgetList} margin={{ top: 14 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "Amount in Rs.",
                position: "insideLeft",
                angle: -90,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey={"totalSpend"} stackId="a" fill="#45d248" />
            <Bar dataKey={"amount"} stackId="a" fill="#4845d2" />
          </RechartsBarChart>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
            <Triangle
              height="80"
              width="80"
              color="#4845d2"
              ariaLabel="triangle-loading"
            />
          </div>
        )}
        {budgetList.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
            No Activity as of now.
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
