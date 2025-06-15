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

  // Prepare data for the BarChart in the format Recharts expects: [{ name: 'Category', value: amount }]
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
            {/* XAxis for values, hidden as per screenshot */}
            <XAxis type="number" axisLine={false} tickLine={false} hide />
            {/* YAxis for categories */}
            <YAxis
              type="category"
              width={100} // Adjust width as needed for category labels
              dataKey="name"
              axisLine={false}
              tickLine={false}
              // Format tick labels with a hyphen, similar to the original screenshot
              tickFormatter={(value) => `${value}-`}
            />
            <Bar dataKey="value" fill="#8884d8" barSize={25} /> {/* Default bar color */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrends;