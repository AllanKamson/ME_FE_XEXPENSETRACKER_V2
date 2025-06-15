import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const ExpenseTrends = ({ expenses }) => {
  // Aggregate expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.price;
    return acc;
  }, {});

  // Data for the BarChart
  const chartData = [
    { name: 'Food', value: categoryTotals['Food'] || 0 },
    { name: 'Entertainment', value: categoryTotals['Entertainment'] || 0 },
    { name: 'Travel', value: categoryTotals['Travel'] || 0 },
  ];

  // Sort data to display top expenses based on value
  chartData.sort((a, b) => b.value - a.value);

  return (
    <div className="expense-chart">
      <h2 className="expense-chart-title">Top Expenses</h2>
      <div className="bar-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} layout="vertical">
            {/* XAxis for values */}
            <XAxis type="number" axisLine={false} tickLine={false} hide />
            {/* YAxis for categories */}
            <YAxis
              type="category"
              width={100} 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}-`}
            />
            <Bar dataKey="value" fill="#8884d8" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrends;